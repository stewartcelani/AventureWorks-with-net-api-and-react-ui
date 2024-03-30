import { createLazyFileRoute } from '@tanstack/react-router';
import ProductPage from '@features/products/components/ProductPage.tsx';

export const Route = createLazyFileRoute('/products/$productId/')({
  component: ProductPage
});