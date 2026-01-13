"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "🍹" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/users", label: "Users", icon: "👥" },
  { href: "/admin/site-settings", label: "Site Settings", icon: "⚙️" },
  { href: "/admin/faqs", label: "FAQs", icon: "❓" },
  { href: "/admin/media", label: "Media", icon: "🖼️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white hidden lg:block">
      <div className="p-6 border-b border-slate-700">
        <Link href="/admin" className="text-2xl font-light tracking-wider">
          a<span className="text-sm align-top">ē</span>lo
          <span className="text-sm font-normal text-slate-400 ml-2">Admin</span>
        </Link>
      </div>
      <nav className="px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <span>↗</span>
          <span>View Live Site</span>
        </Link>
      </div>
    </aside>
  );
}
