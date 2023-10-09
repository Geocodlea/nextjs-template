"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { useSelectedLayoutSegment } from "next/navigation";

function ParallaxBanner({ children }) {
  const [offset, setOffset] = useState(0);
  const segment = useSelectedLayoutSegment();

  const imageUrl = `/img/${segment}_bg.jpg`;

  // Function to check if the image file exists
  function imageExists(url, callback) {
    const img = new Image();
    img.onload = function () {
      callback(true);
    };
    img.onerror = function () {
      callback(false);
    };
    img.src = url;
  }

  useEffect(() => {
    function handleScroll() {
      setOffset(window.scrollY);
    }

    window.addEventListener("scroll", handleScroll);

    // Check if the image exists and set it as the background image
    imageExists(imageUrl, function (exists) {
      const banner = document.getElementById("banner");
      banner.style.backgroundImage = exists
        ? `url(${imageUrl})`
        : "url(img/bg.jpg)";
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [segment]);

  return (
    <>
      <Box
        id="banner"
        sx={{
          height: "90vh",
          backgroundImage: `url("/img/bg.jpg")`,
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
