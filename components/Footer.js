import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(270deg, rgba(255, 76, 77, 0.35) 0%, rgba(255, 153, 51, 0.35) 12.5%, rgba(255, 191, 0, 0.35) 25%, rgba(38, 217, 127, 0.35) 37.5%, rgba(71, 235, 235, 0.35) 50%, rgba(0, 128, 255, 0.35) 62.5%, rgba(51, 51, 255, 0.35) 75%, rgba(128, 0, 255, 0.35) 87.5%, rgba(237, 94, 201, 0.35) 100%)",
        backgroundSize: "200% 100%",
        backgroundColor: "rgb(13, 13, 13)",
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
