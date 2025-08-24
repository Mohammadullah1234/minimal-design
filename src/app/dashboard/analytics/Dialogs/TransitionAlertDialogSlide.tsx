import * as React from "react";
import Button from "@/UI/material/Button";
import Dialog from "@/UI/material/Dialog";
import DialogActions from "@/UI/material/DialogActions";
import DialogContent from "@/UI/material/DialogContent";
import DialogContentText from "@/UI/material/DialogContentText";
import DialogTitle from "@/UI/material/DialogTitle";
import Slide, { SlideProps } from "@mui/material/Slide";

const Transition = (props: SlideProps) => {
  return <Slide direction="up" {...props} />;
};

export default function TransitionAlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primaryMain" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>

      <Dialog
        open={open}
        slots={{ transition: Transition }}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Use Google's location service?  (Transition Dialog)"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
