import { productColumns } from '@features/products/components/ProductColumns.tsx';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getProductsQueryOptions } from '@features/products/queries/getProducts.ts';
import { Route as ProductsRoute } from '@routes/products.index.tsx';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon, PlusCircledIcon
} from '@radix-ui/react-icons';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
  SortingState,
  getSortedRowModel
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table.tsx';
import { Input } from '@/components/ui/input';
import { Button } from '@components/ui/button.tsx';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { CheckIcon, RefreshCcw, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, CommandSeparator
} from '@components/ui/command.tsx';
import { cn } from '@utils';
import { Separator } from '@components/ui/separator.tsx';
import { Badge } from '@/components/ui/badge';

const categories = [
  {id: 1, name: 'Bikes'},
  {id: 2, name: 'Components'},
  {id: 3, name: 'Clothing'},
  {id: 4, name: 'Accessories'},
];

export default function ProductsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { page, pageSize, orderBy, orderByOperator, searchTerm } = ProductsRoute.useSearch();
  const { data: productsResponse, isFetching } = useSuspenseQuery(getProductsQueryOptions({
    page,
    pageSize,
    orderBy,
    orderByOperator,
    searchTerm
  }));

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: pageSize
  });
  const [sorting, setSorting] = useState<SortingState>([{
    id: orderBy,
    desc: orderByOperator === 'desc'
  }]);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(searchTerm || '');

  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prevSet) => {
      const newSet = new Set(prevSet);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };


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
    manualFiltering: true,
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting
    }

  });

  useEffect(() => {
    searchRef?.current?.focus();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      void navigate({
        search: { page: 1, pageSize: pageSize, searchTerm: searchValue, orderBy, orderByOperator }
      });
      table.setPageIndex(0);
    }, 300);

    const pageChanged = pagination.pageIndex + 1 !== page;
    const sortingChanged = sorting[0].id !== orderBy || sorting[0].desc !== (orderByOperator === 'desc');
    const searchChanged = searchValue !== searchTerm;

    if (pageChanged || sortingChanged) {
      void navigate({
        search: {
          page: pagination.pageIndex + 1,
          pageSize: pagination.pageSize,
          orderBy: sorting[0].id,
          orderByOperator: sorting[0].desc ? 'desc' : 'asc',
          searchTerm
        }
      });
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
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-[250px] sm:w-[350px]">
              <Input
                ref={searchRef}
                placeholder="Search products"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                className="w-[250px] sm:w-[350px]"
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-[40px] border-dashed">
                  <PlusCircledIcon className="mr-2 h-4 w-4" />
                  Category
                  {selectedCategories?.size > 0 && (
                    <>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <Badge
                        variant="secondary"
                        className="rounded-sm px-1 font-normal lg:hidden"
                      >
                        {selectedCategories.size}
                      </Badge>
                      <div className="hidden space-x-1 lg:flex">
                        {selectedCategories.size > 2 ? (
                          <Badge
                            variant="secondary"
                            className="rounded-sm px-1 font-normal"
                          >
                            {selectedCategories.size} selected
                          </Badge>
                        ) : (
                          categories
                            .filter((category) => selectedCategories.has(category.id))
                            .map((category) => (
                              <Badge
                                variant="secondary"
                                key={category.id}
                                className="rounded-sm px-1 font-normal"
                              >
                                {category.name}
                              </Badge>
                            ))
                        )}
                      </div>
                    </>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Category" />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => {
                        const isSelected = selectedCategories.has(category.id);
                        return (
                          <CommandItem
                            key={category.id}
                            onSelect={() => toggleCategory(category.id)}
                          >
                            <div
                              className={cn(
                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                isSelected
                                  ? 'bg-primary text-primary-foreground'
                                  : 'opacity-50 [&_svg]:invisible'
                              )}
                            >
                              <CheckIcon className={cn('h-4 w-4')} />
                            </div>
                            <span>{category.name}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                    {selectedCategories.size > 0 && (
                      <>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => setSelectedCategories(new Set<number>())}
                            className="justify-center text-center"
                          >
                            Clear filters
                          </CommandItem>
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="icon"
              disabled={isFetching}
              onClick={() => {
                void queryClient.refetchQueries({
                  queryKey: getProductsQueryOptions({ page, pageSize, orderBy, orderByOperator, searchTerm }).queryKey
                });
              }}
            >
              <RefreshCcw className="size-4" />
            </Button>
          </div>

        </div>
        <div className="rounded-md border">
          <Table
            onWheel={(event) => {
              if (event.deltaY > 0) {
                if (table.getCanNextPage()) {
                  table.nextPage();
                }
              } else if (event.deltaY < 0) {
                if (table.getCanPreviousPage()) {
                  table.previousPage();
                }
              }
            }}
          >
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="p-2">
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
                    {row.getVisibleCells().map((cell) => {
                        if (cell.column.columnDef.id === 'actions') {
                          return (
                            <TableCell key={cell.id} className="p-0 pl-3 w-[50px]">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={cell.id} className="p-3">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          );
                        }
                      }
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={productColumns.length} className="h-24 text-center text-muted-foreground">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-end justify-end pt-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing <strong>{(table.getState().pagination.pageIndex * table.getState().pagination.pageSize) + 1}-{(table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize}</strong> of <strong>{productsResponse?.totalCount}</strong> products
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
