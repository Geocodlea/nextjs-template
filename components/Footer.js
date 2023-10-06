import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{ background: "linear-gradient(to right bottom, #cfa8a8, #755e6f)" }}
    >
      <Typography textAlign="center" color="white" p={1}>
        &copy; Created by George Anton
        <br />
        <NextLink href="/privacy">Privacy Policy</NextLink> |{" "}
        <NextLink href="/terms">Terms of Service</NextLink>
      </Typography>
    </Box>
  );
};

export default Footer;
