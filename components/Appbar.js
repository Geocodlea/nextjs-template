"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;
const navItems = ["home", "about", "contact", "login"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    event.stopPropagation(); // solutin to padding-right to the body
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (event) => {
    event.stopPropagation(); // solutin to padding-right to the body
    setAnchorEl(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/">MUI</Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <NavItems
            key={item}
            item={item}
            openMenu={openMenu}
            handleOpenMenu={handleOpenMenu}
            handleCloseMenu={handleCloseMenu}
            anchorEl={anchorEl}
          />
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{
          backgroundImage:
            "linear-gradient(270deg, rgba(255, 76, 77, 0.35) 0%, rgba(255, 153, 51, 0.35) 12.5%, rgba(255, 191, 0, 0.35) 25%, rgba(38, 217, 127, 0.35) 37.5%, rgba(71, 235, 235, 0.35) 50%, rgba(0, 128, 255, 0.35) 62.5%, rgba(51, 51, 255, 0.35) 75%, rgba(128, 0, 255, 0.35) 87.5%, rgba(237, 94, 201, 0.35) 100%)",
          backgroundSize: "200% 100%",
          padding: "8px 16px",
          backgroundColor: "rgb(13, 13, 13)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link href="/">MUI</Link>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <NavItems
                key={item}
                item={item}
                openMenu={openMenu}
                handleOpenMenu={handleOpenMenu}
                handleCloseMenu={handleCloseMenu}
                anchorEl={anchorEl}
              />
            ))}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: "auto", display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "grey.200",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;

const NavItem = ({ name, link }) => {
  return (
    <Link href={link}>
      <ListItem>
        <ListItemButton
          sx={{
            textAlign: "center",
          }}
        >
          <ListItemText
            primary={name.charAt(0).toUpperCase() + name.slice(1)}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

const NavItems = ({
  item,
  openMenu,
  handleOpenMenu,
  handleCloseMenu,
  anchorEl,
}) => {
  const { data: session } = useSession();

  if (item === "home") return <NavItem key={item} name={item} link="/" />;
  else if (item === "login") {
    if (session) {
      return (
        <ListItem key={item} disablePadding>
          <ListItemButton
            onClick={handleOpenMenu}
            sx={{
              justifyContent: "center",
            }}
          >
            <Avatar alt="avatar" src={session.user.image} />
          </ListItemButton>
          <Menu
            disableScrollLock={true}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom", // Align menu's top to the bottom of the button
              horizontal: "center", // Center horizontally with the button
            }}
            transformOrigin={{
              vertical: "top", // Align menu's top with its own top
              horizontal: "center", // Center horizontally with its own center
            }}
          >
            <MenuItem>
              <Link href="/profile">Profile</Link>
            </MenuItem>
            <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
          </Menu>
        </ListItem>
      );
    } else {
      return <NavItem key={item} name={item} link="/api/auth/signin" />;
    }
  } else return <NavItem key={item} name={item} link={item} />;
};
