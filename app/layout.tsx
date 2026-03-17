import { Poppins } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "react-hot-toast";
import DrawerProvider from "@/components/hooks/DrawerProvider";
import DialogProvider from "@/components/hooks/DialogProvider";
import ReduxProvider from "@/lib/redux/reduxProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata = {
  title: {
    template: '%s | SPC - PIL',
    default: 'SPC - PIL',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        className={`${poppins.variable} antialiased custom-scrollbar`}
      >
         <ReduxProvider>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
       <DrawerProvider>
              <DialogProvider>
                {children}
              </DialogProvider>
            </DrawerProvider>
            </ReduxProvider>
      </body>
    </html>
  );
}
