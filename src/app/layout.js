import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({ weight: '400', subsets: ["latin"] });

export const metadata = {
  title: "Pokemon Battle RPG",
  description: "Role-Playing Game battle simulator game developed by Livio Reinoso, as part of INFO-6128 Mobile Web Development for Fanshawe College's MAP1 Program",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pressStart.className}>{children}</body>
    </html>
  );
}
