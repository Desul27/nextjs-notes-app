import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="en" suppressHydrationWarning>
  <head>
  </head>
      <body>
        <div style={{ padding: 20 }}>
          <ThemeToggle />
        </div>
        <Navbar />
         <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}