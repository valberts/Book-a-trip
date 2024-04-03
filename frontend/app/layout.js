import { Inter } from "next/font/google";
import Head from "next/head"; // Import the Head component
import "./globals.css";
import { AuthProvider } from "/auth/authContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Book a Trip",
    description:
        "A booking platform for hotels, flights and points of interest.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <AuthProvider>
                <body className={inter.className}>{children}</body>
            </AuthProvider>
        </html>
    );
}
