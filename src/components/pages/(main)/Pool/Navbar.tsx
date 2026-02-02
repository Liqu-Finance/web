"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Pool", href: "/pool" },
    { label: "Agent", href: "/agent" },
  ];

  return (
    <nav className="flex items-center gap-4 bg-white border border-border-main rounded-full p-2 pl-4 w-fit shadow-sm">
      <Image
        src="/Images/Logo/liqu.png"
        alt="Liqu"
        width={32}
        height={32}
        className="object-contain rounded-full"
      />
      <div className="flex items-center gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
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
    </nav>
  );
}
