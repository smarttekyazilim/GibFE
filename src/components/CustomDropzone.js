import React, { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FormattedMessage } from "react-intl";
import ByteConverter from "../helpers/ByteConverter";
//START - DROPZONE CSS
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  height: "101px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  justifyContent: "center",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
//END - DROPZONE CSS
function CustomDropzone({
  files = [],
  setFiles,
  accept,
  UploadFile,
  multiple = false,
  preview = true,
  fileName = false,
  dropzoneMessage = "dragNdrop",
  maxSize = null, //mb
  customStyle = null,
  maxHeight = null,
  maxWidth = null,
}) {
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept,
      multiple,
      onDrop: async (acceptedFiles) => {
        let allowUpload = true;
        if (maxSize) {
          let maxSizeInByte = Number(maxSize) * 1024 * 1024;
          let totalSize = 0;
          for (let i = 0; i < acceptedFiles.length; i++) {
            totalSize += acceptedFiles[i].size;
          }
          if (totalSize > maxSizeInByte) {
            alert(
              `${
                multiple ? "Dosyaların toplam" : "Dosyanın"
              } boyutu ${maxSize} MB'dan büyük olamaz`
            );
            return;
          }
        }
        
        if (maxHeight && maxWidth) {
          for (let i = 0; i < acceptedFiles.length; i++) {
              const file = acceptedFiles[i];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              try {
                await new Promise((resolve, reject) => {
                  reader.onload = function (event) {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = function () {
                      const width = img.width;
                      const height = img.height;
                      if (width > maxWidth || height > maxHeight) {
                          alert("Görsellerin Boyutlarını Kontrol Ediniz");
                          reject(new Error('Dosya Boyutları Uygun Değil'));
                      } else {
                          resolve();
                      }
                    };
                  };
                });
              } catch (error) {
                  allowUpload = false; // Set flag to prevent upload
                  break; // Exit loop if upload is not allowed
              }
          }
        }
        

        if (allowUpload) {
          UploadFile(multiple ? acceptedFiles : [acceptedFiles[0]]);
          preview
              ? setFiles(
                  acceptedFiles.map((file) =>
                      Object.assign(file, {
                          preview: URL.createObjectURL(file),
                      })
                  )
              )
              : setFiles(acceptedFiles);
        }
      },
      onDropRejected: (rej) => alert(rej[0].errors[0].message),
    });

  const style = useMemo(
    () => ({
      ...(customStyle || baseStyle),
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, customStyle]
  );

  useEffect(() => {
    return () => {
      preview && files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <FormattedMessage id={dropzoneMessage} />
      </div>
      {preview && (
        <aside style={thumbsContainer}>
          {files.map((file) => (
            <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                <img
                  alt={file.name}
                  src={file.preview}
                  style={img}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              </div>
            </div>
          ))}
        </aside>
      )}
      {fileName &&
        files.map((file) => (
          <p key={file.path}>
            {file.path} - {ByteConverter(file.size, 2)}
            {/* BYTE TO KB MB gibi bir gösterim yapabilirsin */}
          </p>
        ))}
    </>
  );
}

export default CustomDropzone;
