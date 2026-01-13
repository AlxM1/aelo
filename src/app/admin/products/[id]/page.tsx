import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  let product = null;

  if (!isNew) {
    try {
      product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        notFound();
      }

      // Convert Decimal to number for the form
      product = {
        ...product,
        price: product.price.toNumber(),
        compareAtPrice: product.compareAtPrice?.toNumber() ?? null,
      };
    } catch {
      notFound();
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-light text-slate-900">
          {isNew ? "New Product" : `Edit: ${product?.name}`}
        </h1>
        <p className="text-slate-500 mt-1">
          {isNew ? "Create a new product for your catalog" : "Update product details"}
        </p>
      </div>

      <ProductForm product={product} />
    </div>
  );
}
