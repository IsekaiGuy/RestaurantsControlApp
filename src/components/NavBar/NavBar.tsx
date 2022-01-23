import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

interface Props {
  user: string,
  onRemoveUser: () => void
}

const NavBar: React.FC<Props> = (props) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            {props.user}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Link to="/add" style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "white", fontFamily: "Helvetica", fontWeight: 500, marginRight: 5 }}>Создать ресторан</Typography>
            </Link>
            <Typography onClick={props.onRemoveUser} sx={{ fontFamily: "Helvetica", fontWeight: 500, cursor: "pointer" }}>
              Выйти
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;