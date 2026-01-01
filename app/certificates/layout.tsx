import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Certificate View - Biniyam Taye",
    description: "Verified Professional Certificate",
};

export default function CertificateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased bg-zinc-950 text-white selection:bg-yellow-500/30">
                {children}
            </body>
        </html>
    );
}
