import { z } from 'zod';

export const productSchema = z.object({
  productID: z.number(),
  name: z.string(),
  productNumber: z.string(),
  makeFlag: z.boolean(),
  finishedGoodsFlag: z.boolean(),
  model: z.string(),
  productCategory: z.string(),
  productSubcategory: z.string(),
  color: z.string(),
  safetyStockLevel: z.number(),
  reorderPoint: z.number(),
  inventory: z.number(),
  standardCost: z.number(),
  listPrice: z.number(),
  size: z.string(),
  sizeUnitMeasureCode: z.string(),
  weightUnitMeasureCode: z.string(),
  weight: z.number(),
  daysToManufacture: z.number()
});

export type Product = z.infer<typeof productSchema>;
