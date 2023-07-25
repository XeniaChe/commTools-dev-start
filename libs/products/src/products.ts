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

  async queryProductProjections() {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .productProjections()
      .get()
      .execute();
  }

  async queryProducts(query: string) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .products()
      .get({
        queryArgs: {
          where: query,
        },
      })
      .execute();
  }
}
