import { useIntl } from "react-intl";

const IntlTranslate = (name, values = {}) => {
  const intl = useIntl();
  return intl.formatMessage({ id: name }, values);
};

export default IntlTranslate;
