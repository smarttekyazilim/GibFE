//normalde base64 convertler başında metadata içerir. Fakat ZBnin DYS sistemi metadatasız base64 istiyor.
//Fakat base64ü download etmemiz gerektiğinde bize mimetype gereklidir. normal bir base64 olsa bunu ayırt edebiliriz fakat
//metadatasız base64 kaydedip DYSden de böyle geldiği ve mime gelmediği için mimetypeı dbde documentId ile birlikte saklamamız gerekli.
//Metadata: base64 stringin başında dosya hakkında bilgiler içerir. asıl base64 datası başlayana kadar virgüle kadardır
//örnek metadata: 'data:image/png;base64,' virgülden sonrası base64 datasıdır. image/png ise mimeTypedır.
const ToBase64 = (file, base64StrType = "full") =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let mime = "";
      switch (base64StrType) {
        case "full":
          resolve(reader.result);
          break;
        case "mimeTypeSplitted":
          mime = reader.result.split(",")[0].match(/:(.*?);/)[1];
          resolve({
            str: reader.result.split(",")[1],
            mimeType: mime,
          });
          break;
        case "plusMimeType":
          mime = reader.result.split(",")[0].match(/:(.*?);/)[1];
          resolve({
            str: reader.result,
            mimeType: mime,
          });
          break;
        default:
          resolve(reader.result);
          break;
      }
    };
    reader.onerror = (error) => reject(error);
  });
export default ToBase64;

export const convertBase64ToFile = (base64String, fileName) => {
  let arr = base64String.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let uint8Array = new Uint8Array(n);
  while (n--) {
     uint8Array[n] = bstr.charCodeAt(n);
  }
  let file = new File([uint8Array], fileName, { type: mime });
  return file;
}