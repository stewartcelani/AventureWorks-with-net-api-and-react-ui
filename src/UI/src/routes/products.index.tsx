import { z } from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import { appRoles } from '@config/authConfig.ts';
import { AuthenticationError } from '@errors/authenticationError.ts';
import RouteErrorComponent from '@components/ui/errors/RouteErrorComponent.tsx';
import TopLoadingBarComponent from '@components/ui/loading/TopLoadingBarComponent.tsx';
import { defaultGetProductsRequest, getProductsQueryOptions } from '@features/products/queries/getProducts.ts';

const productsSearchSchema = z.object({
  page: z.number().catch(defaultGetProductsRequest.page),
  pageSize: z.number().max(100).catch(defaultGetProductsRequest.pageSize)
});

export type ProductsSearchParams = z.infer<typeof productsSearchSchema>;

export const Route = createFileRoute('/products/')({ 
  beforeLoad: ({ context: { authContext } }) => {
    if (!authContext.hasRole(appRoles.productsRead)) {
      throw new AuthenticationError('Unauthorized to view products');
    }
  },
  validateSearch: productsSearchSchema,
  loaderDeps: ({ search: { page, pageSize } }) => ({ page, pageSize }),
  loader: ({ context: { queryClient }, deps: { page, pageSize } }) =>
    queryClient.ensureQueryData(getProductsQueryOptions({ page, pageSize })),
  onError: ({ error }) => {
    console.error(error);
  },
  errorComponent: RouteErrorComponent,
  pendingComponent: TopLoadingBarComponent
});
