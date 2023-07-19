import {
  ClientBuilder,
  Client,
  type Credentials,
  // type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
  // createAuthForPasswordFlow,
  // createAuthForAnonymousSessionFlow,
  Middleware,
} from '@commercetools/sdk-client-v2';

import {
  // ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

interface Options {
  projectKey: string;
  oauthUri?: string;
  baseUri?: string;
  credentials?: Credentials;
}

export class ClientBuild {
  #projectKey: string;
  #oauthUri?: string;
  #baseUri?: string;
  #credentials?: Credentials;

  constructor({ oauthUri, projectKey, baseUri, credentials }: Options) {
    this.#oauthUri = oauthUri;
    this.#projectKey = projectKey;
    this.#baseUri = baseUri;
    this.#credentials = credentials;
  }

  // TODO: verify if built-in AuthMiddleware can be removed
  getClient(options: {
    authMiddleware: Middleware;
    httpMiddlewareOptions: HttpMiddlewareOptions;
  }) {
    const { authMiddleware, httpMiddlewareOptions } = options;

    return (
      new ClientBuilder()
        .withProjectKey(this.#projectKey)
        .withMiddleware(authMiddleware)
        // .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .build()
    );
  }

  getApiRoot(client: Client) {
    return createApiBuilderFromCtpClient(client);
  }

  getProjectKey() {
    return this.#projectKey;
  }
}
