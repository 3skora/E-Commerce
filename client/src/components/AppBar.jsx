import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");
// console.log("🚀 ~ file: AppBar.jsx:12 ~ token", token);

const LoginOrViewCartBtn = () => {
  if (token)
    return (
      <div onClick={() => (window.location.href = "/cart")}>
        <Button color="inherit">View My Cart</Button>
      </div>
    );
  else
    return (
      <div onClick={() => (window.location.href = "/login")}>
        <Button color="inherit">Login</Button>
      </div>
    );
};

export default function ButtonAppBar() {
  return (
    <div className="mb-4">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <div
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <Button color="inherit">LogOut</Button>
              </div>
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              E-Commerce System
            </Typography>
            {LoginOrViewCartBtn()}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
