import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import LaunchIcon from "@mui/icons-material/Launch";
const draggingStyles = {
  backgroundColor: "#f2f2f2",
  border: "1px solid #000",
};
function DraggableListItem({ item, index, size, active, link }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            backgroundColor: active ? "#aae9fa" : "#f2f2f2",
            mt: 1,
            ...(snapshot.isDragging && draggingStyles),
          }}
          component={Paper}
        >
          <ListItemAvatar>
            <Avatar sx={{ width: 24, height: 24 }} alt={item.name}>
              {index + 1}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={item.name} />
          {link && (
            <Button
              color="info"
              variant="outlined"
              size="small"
              startIcon={<LaunchIcon />}
              component={NavLink}
              to={`/campaigns/${item.id}`}
              sx={{ mr: 2 }}
            >
              <FormattedMessage id="detail" />
            </Button>
          )}
          <DragIndicatorIcon />
        </ListItem>
      )}
    </Draggable>
  );
}

export default DraggableListItem;
