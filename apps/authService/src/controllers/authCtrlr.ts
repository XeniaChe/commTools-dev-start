import { Request, Response } from 'express';

interface OIDC {
  accessToken: string;
  isAuthenticated: () => {};
  isExpired: () => {};
}
export class AuthController {
  constructor() {}

  async getAccessToken(req: Request, res: Response) {
    try {
      // const oidc = 'oidc' in req ? <OIDC>req.oidc : {};
      // let accessToken = 'oidc' in req ? oidc.accessToken : null;

      let accessToken = null;
      // isExpired = null;
      if ('oidc' in req) {
        const oidc = <OIDC>(<unknown>req.oidc);

        accessToken = oidc.accessToken;
        // isExpired = oidc.isExpired;
      } else {
        throw new Error('Something wrong with OIDC');
      }
      console.log({ accessToken });
      res.json(accessToken);
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res
        .status(500)
        .json({ error: `Error getting Access_Token. Cause: ${msg}` });
    }
  }

  async getProfile(req: Request, res: Response) {
    let accessToken = null,
      user = {};
    try {
      if ('oidc' in req) {
        const oidc = <OIDC>(<unknown>req.oidc);

        user = res.locals.user;
        console.log({ user });

        const loggeidIn = oidc.isAuthenticated() ? 'Logged in' : 'Logged out';
        console.log({ loggeidIn });

        accessToken = oidc.accessToken;
      } else {
        throw new Error('Something wrong with OIDC');
      }

      res.send({ user, accessToken });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res
        .status(500)
        .json({ error: `Error fetchig Auth Profile. Cause: ${msg}` });
    }
  }
}
