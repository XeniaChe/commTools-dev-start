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
      const product = await this.prodManager.addProduct({
        productType,
        name,
        slug,
      });

      res.json({ product });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error creating category. Cause: ${msg}` });
    }
  }

  async queryProdProjection(req: Request, res: Response) {
    try {
      const products = (await this.prodManager.queryProductProjections()).body
        .results;

      console.log({ products });
      res.json({ products });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error creating category. Cause: ${msg}` });
    }
  }

  async queryProducts(req: Request, res: Response) {
    let query = <string>req.query.queryKey;

    try {
      query =
        '(masterData(current(slug(en="gabs-wallet-GMON17STUDIO-162-multi"))))';

      const products = (await this.prodManager.queryProducts(query)).body
        .results;

      res.json({ products });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error creating category. Cause: ${msg}` });
    }
  }
}
