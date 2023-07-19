import express, { Response } from 'express';
const { auth } = require('express-openid-connect');

import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = {
  authRequired: false,
  idpLogout: true,
  auth0Logout: true,
  baseURL: 'http://localhost:3000', //TODO: switch once init connect done
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  secret: process.env.AUTH_SECRET,
  clientSecret: process.env.AUTH_ISSUER_CLIENT_SECRET,

  authorizationParams: {
    response_type: 'code', // This requires you to provide a client secret
    audience: process.env.AUTH_AUDIENCE,
    scope: `openid profile manage_project:${process.env.CTP_PROJECT_KEY}`,
  },
};

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

// Routes
app.use('/', routes);

app.use('*', async (_, res: Response) => {
  return res.status(404).json({
    status: 'error',
    data: {
      message: 'resource not found on this server',
    },
  });
});

export default app;
