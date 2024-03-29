import { productColumns} from '@features/products/components/ProductColumns.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductsQueryOptions } from '@features/products/queries/getProducts.ts';
import { Route as ProductsRoute } from '@routes/products.index.tsx';
import {
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
  SortingState,
  getSortedRowModel
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table.tsx';
import { Input } from "@/components/ui/input"
import { Button } from '@components/ui/button.tsx';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { X } from 'lucide-react';

export default function ProductsPage() {
  const navigate = useNavigate();
  const { page, pageSize, orderBy, orderByOperator, searchTerm} = ProductsRoute.useSearch();
  const { data: productsResponse } = useSuspenseQuery(getProductsQueryOptions({ page, pageSize, orderBy, orderByOperator, searchTerm}));

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: pageSize,
  })
  const [sorting, setSorting] = useState<SortingState>([{
    id: orderBy,
    desc: orderByOperator === 'desc'
  }])
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(searchTerm || '');



  const table = useReactTable({
    data: productsResponse?.items || [],
    columns: productColumns,
    rowCount: productsResponse.totalCount || -1,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: false,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
    },

  });

  useEffect(() => {
    searchRef?.current?.focus();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      void navigate({
        search: { page: 1, pageSize: pageSize, searchTerm: searchValue, orderBy, orderByOperator }
      });
    }, 300);

    const pageChanged = pagination.pageIndex + 1 !== page;
    const sortingChanged = sorting[0].id !== orderBy || sorting[0].desc !== (orderByOperator === 'desc');
    const searchChanged = searchValue !== searchTerm;

    if (pageChanged || sortingChanged) {
      void navigate({
        search: { page: pagination.pageIndex + 1, pageSize: pagination.pageSize, orderBy: sorting[0].id, orderByOperator: sorting[0].desc ? 'desc' : 'asc', searchTerm },
      })
    } else if (searchChanged) {
      debouncedSearch();
    }

    return () => {
      debouncedSearch.cancel();
    };


  }, [pagination, sorting, searchValue, navigate]);





  return (
    <>
      <div className="flex items-center justify-end space-y-0.5">
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="flex-1 text-muted-foreground">View and manage products.</p>
        </div>
        <div></div>
      </div>
      <div>
        <div className="flex items-center pb-4">
          <div className="flex-1">
            <div className="relative max-w-sm">
              <Input
                ref={searchRef}
                placeholder="Search products"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                className="max-w-sm"
              />
              {searchValue.length > 0 && (
                <X
                  className="absolute size-5 cursor-pointer text-muted-foreground"
                  style={{ top: '10px', right: '10px' }}
                  onClick={() => {
                    setSearchValue('');
                    void navigate({
                      search: { page: 1, pageSize: pageSize, searchTerm: '' }
                    });
                    searchRef?.current?.focus();
                  }}
                />
              )}
            </div>
          </div>

        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={productColumns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
