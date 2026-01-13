import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  let products: Array<{
    id: string;
    name: string;
    tagline: string;
    price: { toNumber: () => number };
    image: string;
    icon: string;
    isActive: boolean;
    sortOrder: number;
  }> = [];

  try {
    products = await prisma.product.findMany({
      orderBy: { sortOrder: "asc" },
    });
  } catch {
    // Database not connected yet
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Products</h1>
          <p className="text-slate-500 mt-1">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Product
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Price
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">
                  Order
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="flex items-center justify-center h-full text-xl">
                            {product.icon}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{product.name}</p>
                        <p className="text-sm text-slate-500">{product.tagline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-900">${product.price.toNumber().toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {product.isActive ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{product.sortOrder}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-sm text-slate-600 hover:text-slate-900"
                    >
                      Edit →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <span className="text-5xl mb-4 block">🍹</span>
          <h2 className="text-xl font-medium text-slate-900 mb-2">No products yet</h2>
          <p className="text-slate-500 mb-6">
            Get started by creating your first product or run the database seed.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/admin/products/new"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Add Product
            </Link>
            <code className="px-4 py-2 bg-slate-100 rounded-lg text-sm text-slate-600">
              npx prisma db seed
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
