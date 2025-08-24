import * as React from "react";
import Button from "@/UI/material/Button";
import Dialog from "@/UI/material/Dialog";
import ListItemText from "@/UI/material/ListItemText";
import ListItemButton from "@/UI/material/ListItemButton";
import List from "@/UI/material/List";
import Divider from "@/UI/material/Divider";
import AppBar from "@/UI/material/AppBar";
import Toolbar from "@/UI/material/Toolbar";
import IconButton from "@/UI/material/IconButton";
import Typography from "@/UI/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>

            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>

            <Button autoFocus onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>

        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>

          <Divider />

          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
