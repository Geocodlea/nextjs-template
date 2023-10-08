import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(90deg, rgba(125,185,184,1) 0%, rgba(91,126,143,1) 50%, rgba(93,100,152,1) 100%)",
      }}
    >
      <Typography textAlign="center" color="white" p={2}>
        &copy; Created by George Anton
        <br />
        <NextLink href="/privacy">Privacy Policy</NextLink> |{" "}
        <NextLink href="/terms">Terms of Service</NextLink>
      </Typography>
    </Box>
  );
};

export default Footer;
