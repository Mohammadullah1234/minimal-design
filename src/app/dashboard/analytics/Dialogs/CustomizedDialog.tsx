import * as React from "react";
import Button from "@/UI/material/Button";
import { styled } from "@/UI/styles/MuiStyles";
import Dialog from "@/UI/material/Dialog";
import DialogTitle from "@/UI/material/DialogTitle";
import DialogContent from "@/UI/material/DialogContent";
import DialogActions from "@/UI/material/DialogActions";
import Typography from "@/UI/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  // "& .MuiDialogContent-root": {
  //   padding: theme.spacing(2),
  // },
  // "& .MuiDialogActions-root": {
  //   padding: theme.spacing(1),
  // },
}));

export default function CustomizedDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="warning" onClick={handleClickOpen}>
        Scroll dialog
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="paper"
      >
        <DialogTitle id="customized-dialog-title">Modal title</DialogTitle>

        <DialogContent>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim porro
            facere natus iste animi, debitis ut tempora reprehenderit, obcaecati
            sed veniam quaerat modi! Delectus explicabo, cupiditate aut illum
            eveniet natus quidem libero quae? Vel, laboriosam! Atque non in modi
            provident odit distinctio sequi molestias quo expedita aperiam omnis
            sed facilis, sit nemo esse labore dignissimos eos harum nesciunt nam
            veritatis recusandae nobis ab! Ex officia ipsam cumque pariatur
            veniam voluptatum ratione esse sed, beatae, velit corrupti in!
            Numquam ratione beatae molestiae nihil fugiat error dicta voluptas
            reprehenderit. Dolorum et eum quis laboriosam exercitationem dolores
            laborum vel iusto at ipsum sapiente temporibus reprehenderit, libero
            autem sit eaque mollitia, maiores error quaerat totam ab porro nam!
            Doloremque, minus cumque nulla quos quis debitis obcaecati a natus
            eligendi corporis molestias totam, in voluptates dolor facere
            dolorem modi odio iure veniam temporibus pariatur ipsa iste nostrum?
            Minima ipsam fugit voluptatem tenetur necessitatibus iste fugiat
            nemo aliquam deserunt iure. Harum eius hic numquam molestiae
            nesciunt et, obcaecati eaque veniam placeat debitis nam laboriosam
            reprehenderit non, vitae mollitia. Voluptatibus exercitationem eos
            labore quas esse molestias blanditiis nihil aut quos fuga quia earum
            repellendus cupiditate, vel sequi, deserunt numquam sed. Suscipit
            cupiditate labore eligendi vel nostrum laborum in doloremque fugiat
            quae neque deserunt asperiores nulla sed, necessitatibus, architecto
            eum quis dolores adipisci cum iste dolorum! Illo temporibus,
            blanditiis vero consectetur illum expedita ut nulla ab?
            Necessitatibus impedit vitae ducimus a sunt, illo quam assumenda
            dignissimos eum fugit numquam, error accusamus placeat magni atque
            nobis veritatis in voluptas possimus alias ad distinctio asperiores
            ex architecto? Aliquid obcaecati iusto facere alias voluptas quae
            enim inventore molestias illum sunt quia earum ea eveniet ducimus,
            voluptatum aut, veritatis odio maxime sapiente necessitatibus,
            voluptatem consequatur a consequuntur optio. Quae quaerat
            voluptatibus odit sit, sequi optio veritatis eveniet eos molestiae
            modi sunt voluptate minima dolorum dignissimos dolore. Odit neque
            sequi laborum corrupti facere libero mollitia nostrum nesciunt
            assumenda doloremque nisi debitis, voluptatem sint officiis
            voluptatum explicabo eligendi adipisci est repellat rem? Accusamus
            optio nostrum quia non maiores! Dolorem culpa quibusdam repudiandae,
            delectus eaque, ex ab illum accusamus a voluptatem rem quidem
            expedita temporibus vel laborum vitae. Amet unde ratione, nisi iste
            asperiores cum aspernatur voluptas dolorum rerum laudantium
            voluptates autem non nam numquam a necessitatibus quas alias nobis
            pariatur dolores cumque? Debitis, asperiores. A eveniet porro cum,
            quibusdam dicta distinctio quo sint hic natus aut? Iure molestiae
            corporis, ipsa consequuntur eius minima nulla impedit maiores
            debitis tempora repudiandae quis veniam, quaerat eos dignissimos
            voluptatum unde qui laboriosam facere earum laudantium placeat
            corrupti. Voluptatibus animi tempore, corporis id mollitia tempora,
            asperiores nisi fuga, illum est minima. Cum molestias pariatur porro
            ratione nostrum, quia veritatis sunt corrupti quis, incidunt
            officiis cupiditate explicabo possimus at tempore vel. Et nam
            blanditiis officia! Laudantium blanditiis adipisci in magni, beatae
            voluptatem quae eaque earum aspernatur soluta natus temporibus quia
            quaerat reiciendis necessitatibus culpa veniam? Corporis hic placeat
            tenetur, eaque sit debitis asperiores cumque reiciendis maxime
            dignissimos enim sint praesentium eius non adipisci unde illo,
            fugiat sunt nesciunt autem eum.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
