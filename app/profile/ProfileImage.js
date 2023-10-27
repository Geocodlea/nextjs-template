"use client";

import Image from "next/image";

import { Box } from "@mui/material";

import { useSession } from "next-auth/react";

export default function ProfileImage() {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        position: "relative",
        height: "250px",
        width: "250px",
        marginBottom: "3rem",
      }}
    >
      <Image
        alt="bg"
        src={
          session?.user.image
            ? session.user.image.startsWith("http")
              ? session.user.image
              : `/uploads/users/${session.user.image}`
            : "/img/avatar.png"
        }
        fill
        sizes="(max-width: 768px) 100vw"
        style={{
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    </Box>
  );
}
