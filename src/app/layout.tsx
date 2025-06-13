import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Container from "@/components/container";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Evento - Find events around you",
    description: "Browse more than 10,000 events worldwide",
    keywords: ['NextJs', 'ReactJs', 'Full Stack Web Application'],
    icons: {
        icon: '/logo.png'
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white overflow-y-scroll`}
        >
        <Container>
            <Header/>
            {children}
            <Footer/>
        </Container>
        </body>
        </html>
    );
}
