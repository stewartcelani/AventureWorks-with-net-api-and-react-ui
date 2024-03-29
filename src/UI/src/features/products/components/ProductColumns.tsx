import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, EllipsisVertical, PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import type { Product } from '@features/products/types/product.ts';

export const productColumns: ColumnDef<Product>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          className="pl-2 pr-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: 'productID',
    cell: ({ row }) => {
      const { productID } = row.original;
      return <div className="pl-2">{productID}</div>;
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="pl-2 pr-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: 'name',
    cell: ({ row }) => {
      const { name } = row.original;
      return <div className="pl-2">{name}</div>;
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button
          className="pl-2 pr-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: 'productNumber',
    cell: ({ row }) => {
      const { productNumber } = row.original;
      return <div className="pl-2">{productNumber}</div>;
    }
  },
  {

    accessorKey: 'standardCost',
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="pl-2 pr-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Cost Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const { standardCost } = row.original;
      return <div className="pr-2 text-right">{standardCost.toLocaleString('en-AU', {
        style: 'currency',
        currency: 'AUD',
        currencySign: 'accounting'
      })}</div>;
    }
  },
  {
    accessorKey: 'listPrice',
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="pl-2 pr-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Retail Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const { listPrice } = row.original;
      return <div className="pr-2 text-right">{listPrice.toLocaleString('en-AU', {
        style: 'currency',
        currency: 'AUD',
        currencySign: 'accounting'
      })}</div>;
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { productID } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-md h-10 cursor-pointer"
              onClick={() => console.log(`navigate to product ${productID} here`)}>
              <PackageSearch className="mr-2 size-4" />
              View product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];