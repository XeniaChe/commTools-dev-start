import { ClientBuild } from 'client';

import { ApiRoot, CustomerDraft } from '@commercetools/platform-sdk';
import {
  Credentials,
  Middleware,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

interface Options {
  projectKey: string;
  oauthUri?: string;
  baseUri?: string;
  credentials?: Credentials;
  authMiddleware: Middleware;
  httpMiddlewareOptions: HttpMiddlewareOptions;
}

export class CustomerManager {
  #apiRoot: ApiRoot;
  #ProjectKey: string;

  constructor(options: Options) {
    const rootClient = new ClientBuild(options);

    this.#apiRoot = rootClient.getApiRoot(rootClient.getClient(options));
    this.#ProjectKey = rootClient.getProjectKey();
  }

  getCustDraft(custData: CustomerDraft) {
    const { email, password, firstName, lastName } = custData;
    return {
      email,
      password,
      firstName,
      lastName,
    };
  }

  async createCustomer(custData: CustomerDraft) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .customers()
      .post({
        body: this.getCustDraft(custData),
      })
      .execute();
  }

  async getCustomers() {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .customers()
      .get()
      .execute();
  }

  async customerSignIn(email: string, password: string) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .login()
      .post({ body: { email, password } })
      .execute();
  }

  async getCustomerById(id: string) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .customers()
      .withId({ ID: id })
      .get()
      .execute();
  }

  async getCustomerEmailToken(id: string) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .customers()
      .emailToken()
      .post({ body: { id, ttlMinutes: 555 } })
      .execute();
  }

  async getCustomerByEmailToken(token: string) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .customers()
      .withEmailToken({ emailToken: token })
      .get()
      .execute();
  }

  async customerVerifyEmail(token: string) {
    return this.#apiRoot
      .withProjectKey({ projectKey: this.#ProjectKey })
      .customers()
      .emailConfirm()
      .post({ body: { tokenValue: token } })
      .execute();
  }
}
