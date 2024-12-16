"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  ClockIcon,
  GlobeAltIcon,
} from "@heroicons/react/20/solid";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="bg-zinc-50 w-64 h-screen p-5">
      <Link href="/" legacyBehavior>
        <a className="text-zinc-600 text-2xl mb-10 block hover:underline">
          JetBud
        </a>
      </Link>
      <nav className="space-y-4">
        <Link
          href="/"
          className={`block py-2 px-4 text-zinc-600 rounded-md ${
            isActive("/") ? "bg-zinc-200" : "hover:bg-zinc-100"
          }`}
        >
          <HomeIcon className="w-5 h-5 inline-block mr-2" />
          Home
        </Link>
        <Link
          href="/profile"
          className={`block py-2 px-4 text-zinc-600 rounded-md ${
            isActive("/profile") ? "bg-zinc-200" : "hover:bg-zinc-100"
          }`}
        >
          <UserIcon className="w-5 h-5 inline-block mr-2" />
          Profile
        </Link>
        <Link
          href="/history"
          className={`block py-2 px-4 text-zinc-600 rounded-md ${
            isActive("/history") ? "bg-zinc-200" : "hover:bg-zinc-100"
          }`}
        >
          <ClockIcon className="w-5 h-5 inline-block mr-2" />
          History
        </Link>
        <Link
          href="/browse"
          className={`block py-2 px-4 text-zinc-600 rounded-md ${
            isActive("/browse") ? "bg-zinc-200" : "hover:bg-zinc-100"
          }`}
        >
          <GlobeAltIcon className="w-5 h-5 inline-block mr-2" />
          Browse
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
