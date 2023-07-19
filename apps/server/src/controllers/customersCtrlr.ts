import { Request, Response } from 'express';
import { CustomerManager } from 'customers';
// import { getOptions } from 'client';
import { CustomerDraft } from '@commercetools/platform-sdk';

const custManager = new CustomerManager();

// TODO:
export class CustomerController {
  // custrManager: CustomerManager;
  // color: string;

  constructor() {
    // this.color = 'ÓRANGE';
    // this.custrManager = new CustomerManager();
    // this.options = getOptions();
    // this.custrManager = new CustomerManager(this.#options);
  }

  async addCustomer(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body as CustomerDraft;
    // const options = getOptions(<null>(<unknown>req.headers));
    // const options = { projectKey: <string>process.env.CTP_PROJECT_KEY };
    try {
      const { customer } = (
        await new CustomerManager(/* options */).createCustomer({
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
    try {
      // const fun = this.color;
      // console.log({ fun }); // UNDEFINED !!!!???? //TODO: check

      const cstmrs = (await custManager.getCustomers()).body.results;

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

      /* const oprions = getOptions(<null>(<unknown>req.headers), {
        username,
        password,
      }); */

      const { customer } = (
        await custManager.customerSignIn(username, password)
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
      // const options = getOptions();
      const customer = (await custManager.getCustomerById(id)).body;

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
    const { id /* , username, password */ } = req.body;
    try {
      /* const options = getOptions(<null>(<unknown>req.headers), {
        username,
        password,
      }); */

      const emailToken = (await custManager.getCustomerEmailToken(id)).body
        .value;

      // Verify email of Customer
      const { isEmailVerified } = (
        await custManager.customerVerifyEmail(emailToken)
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
