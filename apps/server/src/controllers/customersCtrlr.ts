import { Request, Response } from 'express';
import {
  /* createCustomer, getCustomers, getRandomNum */ CustomerManager,
} from 'customers';
import { getOptions } from 'client';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { strict } from 'assert';

/**
 * @description CustomerController
 *
 * @function createCustomer
 * @function getCustomer
 */

export class CustomerController {
  constructor() {}

  async addCustomer(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body as CustomerDraft;
    const options = getOptions(<null>(<unknown>req.headers));

    try {
      const customer = (
        await new CustomerManager(options).createCustomer({
          email,
          password,
          firstName,
          lastName,
        })
      ).body.customer;

      /*  if (data?.statusCode == 201) {
      return ResponseHandler.successResponse(
        res,
        data.statusCode,
        data.message,
        data.body
        );
      }
      return ResponseHandler.errorResponse(
        res,
        data.statusCode,
        data.message,
        data.body
        );
      } */

      return res.json({ customer });
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: 'server error' });
    }
  }

  async getAllCustomers(req: Request, res: Response) {
    const options = getOptions(<null>(<unknown>req.headers));

    try {
      const cstmrs = (await new CustomerManager(options).getCustomers()).body
        .results;

      res.json({ customers: cstmrs });
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: error });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const { username, password } = req.body as {
        username: string;
        password: string;
      };

      const oprions = getOptions(<null>(<unknown>req.headers), {
        username,
        password,
      });

      const customer = await new CustomerManager(oprions).customerSignIn(
        username,
        password
      );

      res.json(customer);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: 'server error' });
    }
  }
}
