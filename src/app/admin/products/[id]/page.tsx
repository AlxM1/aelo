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
      const dbProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!dbProduct) {
        notFound();
      }

      // Convert Decimal to number and cast types for the form
      product = {
        ...dbProduct,
        price: dbProduct.price.toNumber(),
        compareAtPrice: dbProduct.compareAtPrice?.toNumber() ?? null,
        flavorProfile: dbProduct.flavorProfile as Array<{ name: string; color: string }> | null,
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
