import { useQuery } from '@tanstack/react-query';
import { type PagedResponse, pagedResponseSchema } from '@/types/pagedResponse.ts';
import { type Product, productSchema } from '@features/products/types/product';
import { getAuthenticatedApiClient } from '@/lib/apiClient.ts';

const productsResponseSchema = pagedResponseSchema(productSchema);

export type ProductsResponse = PagedResponse<Product>;

export type GetProductsRequest = {
  page: number;
  pageSize: number;
};

export const defaultGetProductsRequest: GetProductsRequest = {
  page: 1,
  pageSize: 10
};

export async function getProducts({
  page,
  pageSize
}: GetProductsRequest = defaultGetProductsRequest): Promise<ProductsResponse> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get(`products?page=${page}&pageSize=${pageSize}`);
  const data = await response.json();
  return productsResponseSchema.parse(data);
}

export const getProductsQueryOptions = ({ page, pageSize }: GetProductsRequest = defaultGetProductsRequest) => ({
  queryKey: ['getProducts', page, pageSize],
  queryFn: () => getProducts({ page, pageSize })
});

export function useGetProductsQuery({ page, pageSize }: GetProductsRequest = defaultGetProductsRequest) {
  return useQuery(getProductsQueryOptions({ page, pageSize }));
}
