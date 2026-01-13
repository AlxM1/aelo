import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getDashboardStats() {
  try {
    const [totalProducts, activeProducts, totalOrders, pendingOrders, recentOrders, totalRevenue] =
      await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { isActive: true } }),
        prisma.order.count(),
        prisma.order.count({ where: { status: "PENDING" } }),
        prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { items: true },
        }),
        prisma.order.aggregate({
          where: { status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } },
          _sum: { total: true },
        }),
      ]);

    return {
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      recentOrders,
      totalRevenue: totalRevenue._sum.total?.toNumber() || 0,
    };
  } catch {
    return {
      totalProducts: 0,
      activeProducts: 0,
      totalOrders: 0,
      pendingOrders: 0,
      recentOrders: [],
      totalRevenue: 0,
    };
  }
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  href,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  href?: string;
}) {
  const Card = (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        {href && (
          <span className="text-slate-400 text-sm">View →</span>
        )}
      </div>
      <p className="text-3xl font-light text-slate-900 mb-1">{value}</p>
      <p className="text-sm font-medium text-slate-600">{title}</p>
      <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{Card}</Link>;
  }
  return Card;
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-light text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome to the aelo admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subtitle={`${stats.activeProducts} active`}
          icon="🍹"
          href="/admin/products"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          subtitle={`${stats.pendingOrders} pending`}
          icon="📦"
          href="/admin/orders"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          subtitle="All time (CAD)"
          icon="💰"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          subtitle="Needs attention"
          icon="⏳"
          href="/admin/orders"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-2xl">🍹</span>
              <div>
                <p className="font-medium text-slate-900">Products</p>
                <p className="text-sm text-slate-500">Manage catalog</p>
              </div>
            </Link>
            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-2xl">📦</span>
              <div>
                <p className="font-medium text-slate-900">Orders</p>
                <p className="text-sm text-slate-500">View orders</p>
              </div>
            </Link>
            <Link
              href="/admin/site-settings"
              className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-2xl">⚙️</span>
              <div>
                <p className="font-medium text-slate-900">Settings</p>
                <p className="text-sm text-slate-500">Site config</p>
              </div>
            </Link>
            <Link
              href="/admin/faqs"
              className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <span className="text-2xl">❓</span>
              <div>
                <p className="font-medium text-slate-900">FAQs</p>
                <p className="text-sm text-slate-500">Edit questions</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-slate-500 hover:text-slate-900">
              View all →
            </Link>
          </div>
          {stats.recentOrders.length > 0 ? (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-slate-900">{order.orderNumber}</p>
                    <p className="text-sm text-slate-500">{order.customerEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900">
                      ${order.total.toNumber().toFixed(2)}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p className="text-4xl mb-2">📦</p>
              <p>No orders yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Setup Guide */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white">
        <h2 className="text-lg font-medium mb-2">Getting Started</h2>
        <p className="text-slate-300 text-sm mb-4">
          Complete these steps to set up your admin panel:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">1️⃣</div>
            <p className="font-medium">Configure Database</p>
            <p className="text-sm text-slate-300">Add DATABASE_URL to .env</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">2️⃣</div>
            <p className="font-medium">Run Migrations</p>
            <p className="text-sm text-slate-300">npx prisma migrate dev</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl mb-2">3️⃣</div>
            <p className="font-medium">Seed Data</p>
            <p className="text-sm text-slate-300">npx prisma db seed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
