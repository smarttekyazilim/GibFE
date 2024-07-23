import IntlTranslate from "../IntlTranslate";

const withTitle =
  (Component, title, translate = true) =>
  ({ ...props }) => {
    if (title !== "") {
      var newtitle = title;
      if (translate) {
        newtitle = IntlTranslate(title);
      }
      document.title = `GIB - ${newtitle}`;
    } else {
      document.title = "GIB";
    }
    return <Component {...props} />;
  };
export default withTitle;
