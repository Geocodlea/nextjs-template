"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavItem = ({ name, link }) => {
  return (
    <Link href={link}>
      <ListItem sx={{ paddingY: 0 }}>
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
    if (!session)
      return <NavItem key={item} name={item} link="/api/auth/signin" />;

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
          {session.user.role === "admin" && (
            <MenuItem>
              <Link href="/admin">Admin</Link>
            </MenuItem>
          )}
          <MenuItem>
            <Link href="/profile">Profile</Link>
          </MenuItem>
          <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
        </Menu>
      </ListItem>
    );
  } else return <NavItem key={item} name={item} link={item} />;
};

export default NavItems;
