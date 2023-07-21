import { apiRoot, projectKey } from 'client';

import { ApiRoot, CategoryDraft } from '@commercetools/platform-sdk';

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

  constructor() {
    this.#apiRoot = apiRoot;
    this.#ProjectKey = projectKey;
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
