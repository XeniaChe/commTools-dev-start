import {
  ClientBuilder,
  Client,
  type Credentials,
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions, // Required for sending HTTP requests
  // createAuthForPasswordFlow,
  // createAuthForAnonymousSessionFlow,
  Middleware,
} from '@commercetools/sdk-client-v2';

import fetch from 'node-fetch';

require('dotenv').config();

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
  // #projectKey: string;
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

  constructor(/* { oauthUri, projectKey, baseUri, credentials }: Options */) {
    this.#configs = {
      scopes_raw: <string>(<unknown>process.env.CTP_SCOPES),
      projectKey: <string>process.env.CTP_PROJECT_KEY,
      clientId: <string>process.env.CTP_CLIENT_ID,
      clientSecret: <string>process.env.CTP_CLIENT_SECRET,
      region: <string>process.env.CTP_REGION,
    };

    /*     this.#oauthUri = oauthUri;
    this.#projectKey = projectKey;
    this.#baseUri = baseUri;
    this.#credentials = credentials; */

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

  // TODO: verify if built-in AuthMiddleware can be removed
  getClient(/* options: {
    authMiddleware: Middleware;
    httpMiddlewareOptions: HttpMiddlewareOptions;
  } */) {
    // const { authMiddleware, httpMiddlewareOptions } = options;

    return (
      new ClientBuilder()
        .withProjectKey(this.#configs.projectKey)
        // .withMiddleware(authMiddleware)
        .withClientCredentialsFlow(this.authMiddlewareOptions)
        .withHttpMiddleware(this.httpMiddlewareOptions)
        .build()
    );
  }

  getApiRoot(client: Client) {
    return createApiBuilderFromCtpClient(client);
  }

  getProjectKey() {
    return this.#configs.projectKey;
  }
}
