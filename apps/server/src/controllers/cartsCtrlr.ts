import { Request, Response } from 'express';
import { CartsManager } from 'carts';
import { CartDraft } from '@commercetools/platform-sdk';

export class CartsController {
  cartManager: CartsManager;

  constructor() {
    this.cartManager = new CartsManager();
  }

  async addCart(req: Request, res: Response) {
    const { currency } = <CartDraft>req.body;

    try {
      const cart = (await this.cartManager.addCart({ currency })).body;

      res.json({ cart });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error adding cart. Cause: ${msg}` });
    }
  }
}
