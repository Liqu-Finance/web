"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectWallet } from "@/components/ConnectWallet";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Pool", href: "/pool" },
    { label: "Agent", href: "/agent" },
    { label: "Faucet", href: "/faucet" },
  ];

  return (
    <nav className="flex items-center justify-between gap-2 bg-white border border-border-main rounded-full p-2 w-full shadow-sm">
      <div className="flex items-center gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/pool" && pathname.startsWith("/pool/"));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                isActive
                  ? "bg-brand text-white"
                  : "text-text-secondary hover:text-brand"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <ConnectWallet />
    </nav>
  );
}
