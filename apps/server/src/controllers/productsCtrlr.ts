import { Request, Response } from 'express';
import { ProductsManager } from 'products';
import { ProductDraft } from '@commercetools/platform-sdk';

export class ProductsController {
  prodManager: ProductsManager;

  constructor() {
    this.prodManager = new ProductsManager();
  }

  async createProduct(req: Request, res: Response) {
    const { productType, name, slug } = req.body as ProductDraft;

    try {
      const products = await this.prodManager.addProduct({
        productType,
        name,
        slug,
      });

      res.json({ products });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error creating category. Cause: ${msg}` });
    }
  }
}
