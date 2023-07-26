import { Request, Response } from 'express';
import { OrdersManager } from 'orders';
import { OrderFromCartDraft } from '@commercetools/platform-sdk';

export class OrdersController {
  ordersManager: OrdersManager;

  constructor() {
    this.ordersManager = new OrdersManager();
  }

  async createOrder(req: Request, res: Response) {
    const { cart, version } = <OrderFromCartDraft>req.body;

    try {
      const order = (await this.ordersManager.createOrder({ cart, version }))
        .body;

      res.json({ order });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error creating order. Cause: ${msg}` });
    }
  }
}
