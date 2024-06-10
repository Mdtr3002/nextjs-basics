import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Provider from "./providers";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "../../config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs basics",
  description: "A simple Next.js project with TypeScript and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="w-full bg-black flex px-5 space-x-5 py-3 text-white">
          <Link href={"/"}>Home</Link>
          <div className="group relative">
            <button>Blog</button>
            <div
              id="dropdown"
              className="z-10 hidden absolute group-hover:block bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <Link
                    href="/blog/blog1"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Blog1
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/blog2"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Blog2
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/blog3"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Blog3
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Link href={"/about"}>About</Link>
          <Link href={"/contact"}>Contact</Link>
        </nav>
        <div>
          <Provider initialState={initialState}>{children}</Provider>
        </div>
      </body>
    </html>
  );
}
