import { prisma } from "@/lib/prisma";
import Link from "next/link";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-slate-100 text-slate-700",
  CANCELLED: "bg-red-100 text-red-700",
  REFUNDED: "bg-orange-100 text-orange-700",
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  let orders: Array<{
    id: string;
    orderNumber: string;
    customerEmail: string;
    customerName: string | null;
    total: { toNumber: () => number };
    status: string;
    createdAt: Date;
    items: Array<{ id: string; productName: string; quantity: number }>;
  }> = [];

  try {
    const where = status ? { status: status as never } : {};
    orders = await prisma.order.findMany({
      where,
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  } catch {
    // Database not connected yet
  }

  const statuses = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Orders</h1>
          <p className="text-slate-500 mt-1">Manage customer orders</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/admin/orders"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !status
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              status === s
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {orders.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Order
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Customer
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Items
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Total
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{order.orderNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-900">{order.customerName || "—"}</p>
                    <p className="text-sm text-slate-500">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">
                      ${order.total.toNumber().toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        statusColors[order.status] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <span className="text-5xl mb-4 block">📦</span>
          <h2 className="text-xl font-medium text-slate-900 mb-2">No orders yet</h2>
          <p className="text-slate-500">
            Orders will appear here when customers make purchases.
          </p>
        </div>
      )}
    </div>
  );
}
