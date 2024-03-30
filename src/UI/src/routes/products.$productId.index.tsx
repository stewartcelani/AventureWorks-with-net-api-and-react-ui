import { createFileRoute } from '@tanstack/react-router';
import { appRoles } from '@config/authConfig.ts';
import { AuthenticationError } from '@errors/authenticationError.ts';
import { z } from 'zod';
import RouteErrorComponent from '@components/ui/errors/RouteErrorComponent.tsx';
import TopLoadingBarComponent from '@components/ui/loading/TopLoadingBarComponent.tsx';
import { getProductQueryOptions } from '@features/products/queries/getProduct.ts';


export const Route = createFileRoute('/products/$productId/')({
  beforeLoad: ({ context: { authContext } }) => {
    if (!authContext.hasRole(appRoles.employeesRead)) {
      throw new AuthenticationError('Unauthorized to view employees');
    }
  },
  parseParams: (params) => ({
    productId: z.number().int().parse(Number(params.productId))
  }),
  loader: ({ context: { queryClient }, params: { productId } }) => {
    queryClient.ensureQueryData(getProductQueryOptions(Number(productId)));
  },
  errorComponent: RouteErrorComponent,
  pendingComponent: TopLoadingBarComponent
});