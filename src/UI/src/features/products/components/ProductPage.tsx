import { Route as ProductRoute } from '@routes/products.$productId.index.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductQueryOptions } from '@features/products/queries/getProduct.ts';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@components/ui/breadcrumb.tsx';
import { Route as ProductsRoute } from '@routes/products.index.tsx';

export default function ProductPage() {
  const { productId: productIdString } = ProductRoute.useParams();
  const productId = Number(productIdString);
  const { data: product } = useSuspenseQuery(getProductQueryOptions(productId));

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={ProductsRoute.to}>Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {product.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-end space-y-0.5">
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">
            {product.name}
          </h2>
          <p className="flex-1 text-muted-foreground">{product.productNumber}</p>
        </div>
        <div></div>
      </div>
    </>
  )
}