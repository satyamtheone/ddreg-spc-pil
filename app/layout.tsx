import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import DrawerProvider from "@/components/hooks/DrawerProvider";
import DialogProvider from "@/components/hooks/DialogProvider";
import ReduxProvider from "@/lib/redux/reduxProvider";
import { AuthProvider } from "@/lib/AuthProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    template: "%s | SPC - PIL",
    default: "SPC - PIL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en" data-theme="light">
      <body className={`${poppins.variable} antialiased custom-scrollbar`}>
        <ReduxProvider>
          <AuthProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <DrawerProvider>
              <DialogProvider>{children}</DialogProvider>
            </DrawerProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
