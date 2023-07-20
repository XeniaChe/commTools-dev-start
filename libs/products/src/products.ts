import { ClientBuild } from 'client';

import { ApiRoot, ProductDraft } from '@commercetools/platform-sdk';

export class ProductsManager {
  #apiRoot: ApiRoot;
  #ProjectKey: string;

  constructor() {
    const rootClient = new ClientBuild();

    this.#apiRoot = rootClient.getApiRoot(rootClient.getClient());
    this.#ProjectKey = rootClient.getProjectKey();
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
}
