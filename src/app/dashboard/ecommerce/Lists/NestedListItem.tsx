import * as React from "react";
import List from "@/UI/material/List";
import ListItem from "@/UI/material/ListItem";
import Divider from "@/UI/material/Divider";
import ListItemText from "@/UI/material/ListItemText";
import ListItemAvatar from "@/UI/material/ListItemAvatar";
import Avatar from "@/UI/material/Avatar";
import Typography from "@/UI/material/Typography";
import ListItemIcon from "@/UI/material/ListItemIcon";
import { Envelope, KeyboardArrowDown, Mail } from "@/UI/icons/minimal";
import ListItemButton from "@/UI/material/ListItemButton";
import ListSubheader from "@/UI/material/ListSubheader";
import { Collapse } from "@mui/material";
import { StarOutlineRounded } from "@mui/icons-material";

export default function NestedListItem() {
  return (
    <>
      <List>
        <ListItemButton alignItems="flex-start">
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary="Send mail" />
        </ListItemButton>

        <ListItemButton alignItems="flex-start" selected>
          <ListItemIcon>
            <Envelope />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItemButton>

        <ListItemButton alignItems="flex-start">
          <ListItemIcon>
            <Envelope />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          <KeyboardArrowDown />
        </ListItemButton>

        <Collapse in>
          <ListSubheader>
            <ListItemButton alignItems="flex-start">
              <ListItemIcon>
                <StarOutlineRounded />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </ListSubheader>
        </Collapse>
      </List>
    </>
  );
}
