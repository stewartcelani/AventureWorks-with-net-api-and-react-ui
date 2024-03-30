import { useQuery } from '@tanstack/react-query';
import { type PagedResponse, pagedResponseSchema } from '@/types/pagedResponse.ts';
import { type Product, productSchema } from '@features/products/types/product';
import { getAuthenticatedApiClient } from '@/lib/apiClient.ts';

const productsResponseSchema = pagedResponseSchema(productSchema);

export type ProductsResponse = PagedResponse<Product>;

export type GetProductsRequest = {
  page: number;
  pageSize: number;
  orderBy: 'productID' | 'name' | 'productNumber' | 'makeFlag' | 'finishedGoodsFlag' | 'model' | 'productCategory' | 'productSubcategory' | 'color' | 'safetyStockLevel' | 'reorderPoint' | 'inventory' | 'standardCost' | 'listPrice' | 'size' | 'sizeUnitMeasureCode' | 'weightUnitMeasureCode' | 'weight' | 'daysToManufacture';
  orderByOperator: 'asc' | 'desc';
  searchTerm: string;
};

export const defaultGetProductsRequest: GetProductsRequest = {
  page: 1,
  pageSize: 15,
  orderBy: 'name',
  orderByOperator: 'asc',
  searchTerm: ''
};

export async function getProducts({
  page,
  pageSize,
  orderBy,
  orderByOperator,
  searchTerm
}: GetProductsRequest = defaultGetProductsRequest): Promise<ProductsResponse> {
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get(`products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&orderByOperator=${orderByOperator}&searchTerm=${searchTerm}`);
  const data = await response.json();
  return productsResponseSchema.parse(data);
}

export const getProductsQueryOptions = ({ page, pageSize, orderBy, orderByOperator, searchTerm }: GetProductsRequest = defaultGetProductsRequest) => ({
  queryKey: ['products', page, pageSize, orderBy, orderByOperator, searchTerm],
  queryFn: () => getProducts({ page, pageSize, orderBy, orderByOperator, searchTerm })
});

export function useGetProductsQuery({ page, pageSize, orderBy, orderByOperator, searchTerm }: GetProductsRequest = defaultGetProductsRequest) {
  return useQuery(getProductsQueryOptions({ page, pageSize, orderBy, orderByOperator, searchTerm }));
}
