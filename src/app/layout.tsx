import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import React from "react";
import { Flex, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Providers from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Test App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Flex gap="middle" wrap>
            <Layout style={{ minHeight: "100vh" }}>
              <Header
                style={{
                  position: "fixed",
                  zIndex: 1,
                  width: "100%",
                  display: "flex",
                  gap: "16px",
                }}
              >
                <Link
                  href={{
                    pathname: "/",
                  }}
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Test App
                </Link>
                <Link
                  href={{
                    pathname: "/catalog",
                    query: { page: "1", limit: "10" },
                  }}
                >
                  Каталог товаров
                </Link>
                <Link
                  href={{
                    pathname: "/edit",
                  }}
                >
                  Редактор товаров
                </Link>
              </Header>
              <Content
                style={{
                  marginTop: 64,
                  padding: "24px 50px",
                  background: "#fff",
                }}
              >
                {children}
              </Content>
            </Layout>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
