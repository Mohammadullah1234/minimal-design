import NavLink from "@/UI/material/NavLink";
import { Button, ListItemButton } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <ListItemButton component={NavLink} href="/dashboard">
        Dashboard
      </ListItemButton>

      <Button loading variant="outlined">
        Book
      </Button>
    </>
  );
};

export default HomePage;
