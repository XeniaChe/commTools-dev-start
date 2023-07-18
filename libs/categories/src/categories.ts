import { ClientBuild } from 'client';

import {
  ApiRoot,
  CategoryDraft,
  CategoryUpdateAction,
} from '@commercetools/platform-sdk';
import {
  Credentials,
  Middleware,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

interface Options {
  projectKey: string;
  credentials?: Credentials;
  authMiddleware: Middleware;
  httpMiddlewareOptions: HttpMiddlewareOptions;
}
/* 
type catUpdtAction =
  | 'setAssetSources'
  | 'addAsset'
  | 'changeAssetName'
  | 'changeAssetOrder'
  | 'changeName'
  | 'changeOrderHint'
  | 'changeParent'
  | 'changeSlug'
  | 'setAssetCustomField'
  | 'setAssetCustomType'
  | 'setAssetDescription'
  | 'setAssetKey'
  | 'setAssetTags'
  | 'setCustomField'
  | 'setCustomType'
  | 'setDescription'
  | 'setExternalId'
  | 'setKey'
  | 'setMetaDescription'
  | 'setMetaKeywords'
  | 'setMetaTitle'; */

export class CategoryManager {
  #apiRoot: ApiRoot;
  #ProjectKey: string;

  constructor(options: Options) {
    const rootClient = new ClientBuild(options);

    this.#apiRoot = rootClient.getApiRoot(rootClient.getClient(options));
    this.#ProjectKey = rootClient.getProjectKey();
  }

  async createCategory(catName: string, description: string) {
    const body: CategoryDraft = {
      name: { en: catName },
      slug: { en: description },
    };

    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .categories()
      .post({ body })
      .execute();
  }

  /*   async editCategory(
    id: string,
    data: string,
    newVer: number,
    action: catUpdtAction
  ) {
    const payload: CategoryUpdateAction[] = [{ action, slug: { en: data } }];

    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .categories()
      .withId({ ID: id })
      .post({
        body: {
          version: newVer,
          actions: payload,
        },
      })
      .execute();
  } */
  async getCatById(id: string) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .categories()
      .withId({ ID: id })
      .get()
      .execute();
  }

  async editCategoryDescription(id: string, data: string, newVer: number) {
    const LocalizedData = { en: data };
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .categories()
      .withId({ ID: id })
      .post({
        body: {
          version: newVer,
          actions: [{ action: 'changeSlug', slug: LocalizedData }],
        },
      })
      .execute();
  }
}
