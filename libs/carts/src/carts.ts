import { apiRoot, projectKey } from 'client';

import { ApiRoot, CartDraft } from '@commercetools/platform-sdk';

export class CartsManager {
  #apiRoot: ApiRoot;
  #ProjectKey: string;

  constructor() {
    this.#apiRoot = apiRoot;
    this.#ProjectKey = projectKey;
  }

  async addCart(cartData: CartDraft) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .carts()
      .post({ body: cartData })
      .execute();
  }
}
