import { Request, Response } from 'express';
import { CartsManager } from 'carts';
import {
  CartDraft,
  CartAddLineItemAction,
  addLineItem,
} from '@commercetools/platform-sdk';

enum ActionTypes {
  addLineItems = 'addLineItem',
}

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

  async getAllCarts(req: Request, res: Response) {
    try {
      const carts = (await this.cartManager.getAllCarts()).body.results;
      res.json({ carts });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error fetching carts. Cause: ${msg}` });
    }
  }

  async genericCartUpdate(req: Request, res: Response) {
    const { id } = req.params;
    let actionPayload = <addLineItem>req.body.actionPayload;

    try {
      const { version } = (await this.cartManager.getCartById(id)).body;

      if (actionPayload.action === ActionTypes.addLineItems) {
        actionPayload = {
          ...actionPayload,
          variantId: req.body.actionPayload.variantId as number,
          productId: req.body.actionPayload.productId as string,
          quantity: req.body.actionPayload.quantity as number,
        } as CartAddLineItemAction;
      }

      const cart = (
        await this.cartManager.updateCart(id, version, actionPayload)
      ).body;

      res.json({ cart });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error updating cart. Cause: ${msg}` });
    }
  }

  async getCartById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const cart = await this.cartManager.getCartById(<string>id);

      res.json({ cart });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error fetching cart. Cause: ${msg}` });
    }
  }
}
