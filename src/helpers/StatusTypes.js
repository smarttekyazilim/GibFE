import { FormattedMessage } from "react-intl";
import CheckIcon from "@mui/icons-material/Check";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import BlockIcon from "@mui/icons-material/Block";

export const StatusTypes = {
  accepted: {
    label: <FormattedMessage id="status.accepted" />,
    color: "success",
    icon: <CheckIcon />,
  },
  pending: {
    label: <FormattedMessage id="status.pending" />,
    color: "warning",
    icon: <HourglassBottomIcon />,
  },
  rejected: {
    label: <FormattedMessage id="status.denied" />,
    color: "error",
    icon: <BlockIcon />,
  },
};
