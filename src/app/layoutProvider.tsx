"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDisconnect } from "wagmi";

const protectedRoutes = [
  "/",
  "/blog/blog1",
  "/blog/blog2",
  "/blog/blog3",
  "/about",
  "/contact",
];

export const LayoutProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isAuthen, setIsAuthen] = useState(false);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isConnected") || false;
    const token = localStorage.getItem("token");
    setLoading(true);
    setIsAuthen(isAuthenticated === "true" || false);
    console.log("isAuthenticated", isAuthenticated);
    if ((!isAuthenticated || !token) && protectedRoutes.includes(pathname)) {
      disconnect();
      localStorage.removeItem("isConnected");
      localStorage.removeItem("token");
      router.push("/login");
    } else if (isAuthenticated && token && pathname === "/login") {
      router.push("/");
    }
    setLoading(false);
  }, [pathname, router, disconnect]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAuthen && (
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
      )}
      {children}
    </>
  );
};
