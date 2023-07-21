import {
  ClientBuilder,
  Client,
  type Credentials,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

import fetch from 'node-fetch';

require('dotenv').config();

import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

class ClientBuild {
  #oauthUri?: string;
  #baseUri?: string;
  #credentials?: Credentials;
  httpMiddlewareOptions: HttpMiddlewareOptions;
  authMiddlewareOptions: AuthMiddlewareOptions;
  #configs: {
    scopes_raw: string;
    projectKey: string;
    clientId: string;
    clientSecret: string;
    region: string;
  };

  constructor() {
    this.#configs = {
      scopes_raw: <string>(<unknown>process.env.CTP_SCOPES),
      projectKey: <string>process.env.CTP_PROJECT_KEY,
      clientId: <string>process.env.CTP_CLIENT_ID,
      clientSecret: <string>process.env.CTP_CLIENT_SECRET,
      region: <string>process.env.CTP_REGION,
    };

    this.httpMiddlewareOptions = {
      host: <string>process.env.CTP_API_URL,
      fetch,
    };

    this.authMiddlewareOptions = {
      host: <string>process.env.CTP_AUTH_URL,
      projectKey: this.#configs.projectKey,
      credentials: {
        clientId: this.#configs.clientId,
        clientSecret: this.#configs.clientSecret,
      },
      fetch,
      scopes: this.#configs.scopes_raw.split(' '),
    };
  }

  getClient() {
    return new ClientBuilder()
      .withProjectKey(this.#configs.projectKey)
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withLoggerMiddleware()
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .build();
  }

  getApiRoot(client: Client) {
    return createApiBuilderFromCtpClient(client);
  }

  getProjectKey() {
    return this.#configs.projectKey;
  }
}

const rootClient = new ClientBuild();
export const apiRoot: ApiRoot = rootClient.getApiRoot(rootClient.getClient());
export const projectKey: string = rootClient.getProjectKey();
