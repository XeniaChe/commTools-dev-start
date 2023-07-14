"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoot = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
require('dotenv').config();
const sdk_client_v2_1 = require("@commercetools/sdk-client-v2");
const platform_sdk_1 = require("@commercetools/platform-sdk");
// const scopes_raw = <string>(<unknown>process.env.CTP_SCOPES);
const configs = {
    scopes_raw: process.env.CTP_SCOPES,
    projectKey: process.env.CTP_PROJECT_KEY,
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
    region: process.env.CTP_REGION,
};
// Configure authMiddlewareOptions
const authMiddlewareOptions = {
    host: `https://auth.${configs.region}.commercetools.com`,
    projectKey: configs.projectKey,
    credentials: {
        clientId: configs.clientId,
        clientSecret: configs.clientSecret,
    },
    scopes: configs.scopes_raw.split(' '),
    fetch: node_fetch_1.default,
};
// Configure httpMiddlewareOptions
const httpMiddlewareOptions = {
    host: `https://api.${configs.region}.commercetools.com`,
    fetch: node_fetch_1.default,
};
// Export the ClientBuilder
const ctpClient = new sdk_client_v2_1.ClientBuilder()
    // .withProjectKey(configs.projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
// Create apiRoot from the imported ClientBuilder and include your Project key
exports.apiRoot = (0, platform_sdk_1.createApiBuilderFromCtpClient)(ctpClient).withProjectKey({
    projectKey: configs.projectKey,
});
const getProject = () => {
    return exports.apiRoot.get().execute();
};
// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);
//# sourceMappingURL=buildClient.js.map