import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ mx: 25 }}>
          <Typography variant="h4" flexGrow={1}>
            CMF
          </Typography>
          <Button
            variant="text"
            color="inherit"
            onClick={handleOpen}
            endIcon={<ArrowDropDownIcon />}
          >
            Más
          </Button>
        </Toolbar>
      </AppBar>
      <Menu id="" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          {" "}
          <Typography variant="h6" color="initial">
            {" "}
            Anteriores Semestres{" "}
          </Typography>{" "}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Typography variant="h6" color="initial">
            {" "}
            Desarrolladores{" "}
          </Typography>{" "}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {" "}
          <Typography variant="h6" color="initial">
            {" "}
            Cerrar Sesion{" "}
          </Typography>{" "}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
