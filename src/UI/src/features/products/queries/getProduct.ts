import { type Product, productSchema } from '@features/products/types/product.ts';
import { getAuthenticatedApiClient } from '@lib/apiClient.ts';
import { useQuery } from '@tanstack/react-query';

export async function getProduct(productId: number): Promise<Product> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get(`products/${productId}`);
  const data = await response.json();
  return productSchema.parse(data);
}

export const getProductQueryOptions = (productId: number) => ({
  queryKey: ['product', productId],
  queryFn: () => getProduct(productId)
});

export function useGetProductQuery(productId: number) {
  return useQuery(getProductQueryOptions(productId));
}
