import "./globals.css";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

import React from "react";

import AuthProvider from "@/context/AuthProvider";

import AppBar from "@/components/Appbar";
import ParallaxBanner from "@/components/ParallaxBanner";
import Footer from "@/components/Footer";

import { Paper, Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJS Template",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppBar />
          <ParallaxBanner>
            <Box className={styles.main}>
              <Paper elevation={24} className={styles.content}>
                {children}
              </Paper>
            </Box>
          </ParallaxBanner>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
