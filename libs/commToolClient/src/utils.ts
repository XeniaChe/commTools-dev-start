import {
  createAuthForPasswordFlow,
  createAuthForAnonymousSessionFlow,
  Middleware,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

require('dotenv').config();

const configs = {
  scopes_raw: <string>(<unknown>process.env.CTP_SCOPES),
  projectKey: <string>process.env.CTP_PROJECT_KEY,
  clientId: <string>process.env.CTP_CLIENT_ID,
  clientSecret: <string>process.env.CTP_CLIENT_SECRET,
  region: <string>process.env.CTP_REGION,
};

export const getOptions = (
  headers = null,
  credentials?: {
    username: string;
    password: string;
  }
) => {
  console.log({ headers });
  const authMiddleware: Middleware = credentials
    ? createAuthForPasswordFlow({
        host: <string>process.env.CTP_AUTH_URL,
        projectKey: configs.projectKey,
        credentials: {
          clientId: configs.clientId,
          clientSecret: configs.clientSecret,
          user: {
            ...credentials,
          },
        },
        fetch,
        scopes: configs.scopes_raw.split(' '),
      })
    : createAuthForAnonymousSessionFlow({
        host: <string>process.env.CTP_AUTH_URL,
        projectKey: configs.projectKey,
        credentials: {
          clientId: configs.clientId,
          clientSecret: configs.clientSecret,
        },
        fetch,
        scopes: configs.scopes_raw.split(' '),
      });

  return {
    projectKey: configs.projectKey,
    authMiddleware,
    httpMiddlewareOptions: {
      host: <string>process.env.CTP_API_URL,
      fetch,
    },
  };
};
