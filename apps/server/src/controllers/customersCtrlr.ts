import { Request, Response } from 'express';
import { CustomerManager } from 'customers';
import { getOptions } from 'client';
import { CustomerDraft } from '@commercetools/platform-sdk';

/**
 * @description CustomerController
 *
 * @function createCustomer
 * @function getCustomer
 */

// TODO: error hadnling in Express+TS
export class CustomerController {
  constructor() {}

  async addCustomer(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body as CustomerDraft;
    const options = getOptions(<null>(<unknown>req.headers));

    try {
      const { customer } = (
        await new CustomerManager(options).createCustomer({
          email,
          password,
          firstName,
          lastName,
        })
      ).body;

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

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error creating customer. Cause: ${msg}` });
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

      const msg = error instanceof Error ? error?.message : 'Server error';

      res
        .status(500)
        .json({ error: `Error fetching customers. Cause: ${msg}` });
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

      const { customer } = (
        await new CustomerManager(oprions).customerSignIn(username, password)
      ).body;

      res.json({ customer });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({ error: `Error while signing in. Cause: ${msg}` });
    }
  }

  async getSingleCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const options = getOptions();
      const customer = (await new CustomerManager(options).getCustomerById(id))
        .body;

      res.json({ customer });
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error ? error?.message : 'Server error';

      res
        .status(500)
        .json({ error: `Error fetching single customer. Cause: ${msg}` });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    const { id, username, password } = req.body;
    try {
      const options = getOptions(<null>(<unknown>req.headers), {
        username,
        password,
      });

      const emailToken = (
        await new CustomerManager(options).getCustomerEmailToken(id)
      ).body.value;

      // Verify email of Customer
      const { isEmailVerified } = (
        await new CustomerManager(options).customerVerifyEmail(emailToken)
      ).body;

      res.json({ isEmailVerified });
    } catch (error) {
      console.error(error);

      const msg = error instanceof Error ? error?.message : 'Server error';

      res.status(500).json({
        error: `Error verifying ${id} customer's email. Cause: ${msg}`,
      });
    }
  }
}
