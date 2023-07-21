import { apiRoot, projectKey } from 'client';

import { ApiRoot, ProductDraft } from '@commercetools/platform-sdk';

export class ProductsManager {
  #apiRoot: ApiRoot;
  #ProjectKey: string;

  constructor() {
    this.#apiRoot = apiRoot;
    this.#ProjectKey = projectKey;
  }

  async addProduct(prodData: ProductDraft) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .products()
      .post({
        body: {
          productType: prodData.productType,
          name: prodData.name,
          slug: prodData.slug,
        },
      })
      .execute();
  }

  async queryProducts() {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .products()
      .get({ queryArgs: { sort: '' } })
      .execute();
  }

  async queryProductProjections() {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .productProjections()
      .get()
      .execute();
  }
}
