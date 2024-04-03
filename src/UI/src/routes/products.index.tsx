import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { appRoles } from '@config/authConfig.ts';
import { AuthenticationError } from '@errors/authenticationError.ts';
import { defaultGetProductsRequest, getProductsQueryOptions } from '@features/products/queries/getProducts.ts';
import RouteErrorComponent from '@components/ui/errors/RouteErrorComponent.tsx';
import TopLoadingBarComponent from '@components/ui/loading/TopLoadingBarComponent.tsx';

const productsSearchSchema = z.object({
  page: z.number().catch(defaultGetProductsRequest.page),
  pageSize: z.number().max(100).catch(defaultGetProductsRequest.pageSize),
  orderBy: z.enum(['productID', 'name', 'productNumber', 'makeFlag', 'finishedGoodsFlag', 'model', 'productCategory', 'productSubcategory', 'color', 'safetyStockLevel', 'reorderPoint', 'inventory', 'standardCost', 'listPrice', 'size', 'sizeUnitMeasureCode', 'weightUnitMeasureCode', 'weight', 'daysToManufacture']).catch(defaultGetProductsRequest.orderBy),
  orderByOperator: z.enum(['asc', 'desc']).catch(defaultGetProductsRequest.orderByOperator),
  searchTerm: z.string().catch(defaultGetProductsRequest.searchTerm),
  categories: z.array(z.number()).catch(defaultGetProductsRequest.categories),
});

export type ProductsSearchParams = z.infer<typeof productsSearchSchema>;

export const Route = createFileRoute('/products/')({
  beforeLoad: ({ context: { authContext } }) => {
    if (!authContext.hasRole(appRoles.productsRead)) {
      throw new AuthenticationError('Unauthorized to view products');
    }
  },
  validateSearch: productsSearchSchema,
  loaderDeps: ({ search: { page, pageSize, orderBy, orderByOperator, searchTerm, categories } }) => ({ page, pageSize, orderBy, orderByOperator, searchTerm, categories }),
  loader: ({ context: { queryClient }, deps: { page, pageSize, orderBy, orderByOperator, searchTerm, categories } }) => queryClient.ensureQueryData(getProductsQueryOptions({ page, pageSize, orderBy, orderByOperator, searchTerm, categories })),
  onError: ({ error }) => {
    console.error(error);
  },
  errorComponent: RouteErrorComponent,
  /*pendingComponent: TopLoadingBarComponent*/
});
