import { createLazyFileRoute } from '@tanstack/react-router';
import ProductsPage from '@/features/products/components/ProductsPage.tsx';

export const Route = createLazyFileRoute('/products/')({
  component: ProductsPage
});
