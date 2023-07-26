import { apiRoot, projectKey } from 'client';

import { ApiRoot, OrderFromCartDraft } from '@commercetools/platform-sdk';

export class OrdersManager {
  #apiRoot: ApiRoot;
  #ProjectKey: string;

  constructor() {
    this.#apiRoot = apiRoot;
    this.#ProjectKey = projectKey;
  }

  async createOrder(orderData: OrderFromCartDraft) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .orders()
      .post({ body: orderData })
      .execute();
  }
}
