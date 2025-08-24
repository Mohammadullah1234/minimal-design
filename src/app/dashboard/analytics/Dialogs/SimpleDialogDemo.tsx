"use client";

import * as React from "react";
import Button from "@/UI/material/Button";
import Avatar from "@/UI/material/Avatar";
import List from "@/UI/material/List";
import ListItem from "@/UI/material/ListItem";
import ListItemAvatar from "@/UI/material/ListItemAvatar";
import ListItemButton from "@/UI/material/ListItemButton";
import ListItemText from "@/UI/material/ListItemText";
import DialogTitle from "@/UI/material/DialogTitle";
import Dialog from "@/UI/material/Dialog";
import Typography from "@/UI/material/Typography";
import { Persons, Person } from "@/UI/icons/minimal";
import { Add, AddRounded } from "@mui/icons-material";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disablePadding key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar color="default">
                <AddRounded />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

const SimpleDialogDemo = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>

      <br />
      <Button onClick={handleClickOpen}>Open simple dialog</Button>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default SimpleDialogDemo;
