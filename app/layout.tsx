import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";
import Script from "next/script";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="en" suppressHydrationWarning>
  <head>
    <Script
  id="theme-init"
  strategy="beforeInteractive"
>
  {`
    (function() {
      try {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
          document.documentElement.classList.add("dark");
        }
      } catch(e) {}
    })();
  `}
</Script>
  </head>
      <body>
        <div style={{ padding: 20 }}>
          <ThemeToggle />
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}