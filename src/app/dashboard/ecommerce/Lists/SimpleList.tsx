import * as React from "react";
import List from "@/UI/material/List";
import ListItem from "@/UI/material/ListItem";
import Divider from "@/UI/material/Divider";
import ListItemText from "@/UI/material/ListItemText";
import ListItemAvatar from "@/UI/material/ListItemAvatar";
import Avatar from "@/UI/material/Avatar";
import Typography from "@/UI/material/Typography";
import ListItemIcon from "@/UI/material/ListItemIcon";
import { Envelope, Mail } from "@/UI/icons/minimal";
import ListItemButton from "@/UI/material/ListItemButton";

export default function SimpleList() {
  return (
    <>
      <List>
        <ListItemButton alignItems="flex-start">
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>

        <ListItemButton alignItems="flex-start">
          <ListItemIcon>
            <Envelope />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton alignItems="flex-start">
          <ListItemText primary="Trash" />
        </ListItemButton>

        <ListItemButton alignItems="flex-start">
          <ListItemText primary="Spam" />
        </ListItemButton>
      </List>
    </>
  );
}
