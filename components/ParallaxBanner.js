"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { useSelectedLayoutSegment } from "next/navigation";

function ParallaxBanner({ children }) {
  const [offset, setOffset] = useState(0);
  const segment = useSelectedLayoutSegment();

  useEffect(() => {
    function handleScroll() {
      setOffset(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "90vh",
          backgroundImage: `url("/img/${
            segment && segment !== "__DEFAULT__" ? segment : ""
          }bg.jpg")`,
          transform: `translateY(${offset * 0.5}px)`,
          position: "absolute",
          width: "100%",
          zIndex: -1,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      {children}
    </>
  );
}

export default ParallaxBanner;
