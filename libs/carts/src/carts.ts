import { apiRoot, projectKey } from 'client';

import {
  ApiRoot,
  CartDraft,
  addLineItem,
  CartAddLineItemAction,
} from '@commercetools/platform-sdk';

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

  async getAllCarts() {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .carts()
      .get()
      .execute();
  }

  async addLineItems(
    id: string,
    variantId: number,
    productId: string,
    quantity: number,
    version: number
  ) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [{ action: 'addLineItem', variantId, quantity, productId }],
        },
      })
      .execute();
  }

  async updateCart(id: string, version: number, actionPayload: addLineItem) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .carts()
      .withId({ ID: id })
      .post({ body: { version, actions: [actionPayload] } })
      .execute();
  }

  async getCartById(id: string) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .carts()
      .withId({ ID: id })
      .get()
      .execute();
  }
}
