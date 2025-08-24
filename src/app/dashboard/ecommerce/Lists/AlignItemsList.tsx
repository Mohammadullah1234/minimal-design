import * as React from "react";
import List from "@/UI/material/List";
import ListItem from "@/UI/material/ListItem";
import Divider from "@/UI/material/Divider";
import ListItemText from "@/UI/material/ListItemText";
import ListItemAvatar from "@/UI/material/ListItemAvatar";
import Avatar from "@/UI/material/Avatar";
import Typography from "@/UI/material/Typography";
import { useMinimalTheme } from "@/UI/styles/hooks";

export default function AlignItemsList() {
  const images = useMinimalTheme().images;

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={images.avatars["avatar-1"]} />
        </ListItemAvatar>

        <ListItemText primary="Photos" secondary={"Jan 9, 2014"} />
      </ListItem>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={images.avatars["avatar-2"]} />
        </ListItemAvatar>

        <ListItemText primary="Work" secondary={"Jan 7, 2014"} />
      </ListItem>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={images.avatars["avatar-3"]} />
        </ListItemAvatar>

        <ListItemText primary="Vacation" secondary={"July 20, 2014"} />
      </ListItem>
    </List>
  );
}
