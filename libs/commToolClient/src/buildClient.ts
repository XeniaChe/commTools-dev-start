// import fetch from 'node-fetch';
// require('dotenv').config();

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

// const scopes_raw = <string>(<unknown>process.env.CTP_SCOPES);
/*
const configs = {
  scopes_raw: <string>(<unknown>process.env.CTP_SCOPES),
  projectKey: <string>process.env.CTP_PROJECT_KEY,
  clientId: <string>process.env.CTP_CLIENT_ID,
  clientSecret: <string>process.env.CTP_CLIENT_SECRET,
  region: <string>process.env.CTP_REGION,
};

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${configs.region}.commercetools.com`,
  projectKey: configs.projectKey,
  credentials: {
    clientId: configs.clientId,
    clientSecret: configs.clientSecret,
  },
  scopes: configs.scopes_raw.split(' '),
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${configs.region}.commercetools.com`,
  fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  // .withProjectKey(configs.projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  .build();


  
  // Create apiRoot from the imported ClientBuilder and include your Project key
  export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: configs.projectKey,
  });
const getProject = () => {
  return apiRoot.get().execute();
};

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);
 */

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

  getClient(options: {
    authMiddleware: Middleware;
    httpMiddlewareOptions: HttpMiddlewareOptions;
  }) {
    const { authMiddleware, httpMiddlewareOptions } = options;

    return new ClientBuilder()
      .withProjectKey(this.#projectKey)
      .withMiddleware(authMiddleware)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
  }

  getApiRoot(client: Client) {
    return createApiBuilderFromCtpClient(client);
  }

  getProjectKey() {
    return this.#projectKey;
  }
}
