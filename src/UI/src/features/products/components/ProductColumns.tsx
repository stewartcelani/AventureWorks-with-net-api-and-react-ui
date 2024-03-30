import { ColumnDef } from '@tanstack/react-table';
import { PackageSearch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Route as ProductRoute } from '@routes/products.$productId.index.tsx';
import type { Product } from '@features/products/types/product.ts';
import { Link } from '@tanstack/react-router';

export const productColumns: ColumnDef<Product>[] = [
  {
    header: ({ column }) => {
      return (
        <Button
          className="pl-2 pr-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          {column.getIsSorted() === 'asc' && <ArrowUpIcon className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === 'desc' && <ArrowDownIcon className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    accessorKey: 'name',
    cell: ({ row }) => {
      const { name, productID } = row.original;
      return <div className="pl-2 font-medium">
        <Link className="hover:underline" to={ProductRoute.to} params={{ productId: `${productID}`}}>
          {name}
        </Link>
      </div>;
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
          {column.getIsSorted() === 'asc' && <ArrowUpIcon className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === 'desc' && <ArrowDownIcon className="ml-2 h-4 w-4" />}
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
    header: ({ column }) => {
      return (
        <Button
          className="pl-2 pr-2"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          {column.getIsSorted() === 'asc' && <ArrowUpIcon className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === 'desc' && <ArrowDownIcon className="ml-2 h-4 w-4" />}
        </Button>
      );
    },
    accessorKey: 'productCategory',
    cell: ({ row }) => {
      const { productCategory } = row.original;
      return <div className="pl-2">{productCategory}</div>;
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
            {column.getIsSorted() === 'asc' && <ArrowUpIcon className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDownIcon className="ml-2 h-4 w-4" />}
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
            {column.getIsSorted() === 'asc' && <ArrowUpIcon className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === 'desc' && <ArrowDownIcon className="ml-2 h-4 w-4" />}
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
              <DotsHorizontalIcon className="h-4 w-4" />
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