import { Request, Response } from 'express';
import { CustomerManager } from 'customers';
import { CustomerDraft } from '@commercetools/platform-sdk';
// import axios from 'axios';
require('dotenv').config();

export class CustomerController {
  custManager: CustomerManager;

  constructor() {
    this.custManager = new CustomerManager();
    // this.options = getOptions();
    // this.custrManager = new CustomerManager(this.#options);
  }

  async addCustomer(req: Request, res: Response) {
    // TODO: Add obtaining Acess_Token

    const { email, password, firstName, lastName } = req.body as CustomerDraft;

    /*     const url = `http://localhost:${process.env.AUTHSERV_PORT}/auth/get-token`;
    const { access_token } = <AxiosResponse>(await axios.post(url)).data;
 */
    try {
      const { customer } = (
        await this.custManager.createCustomer({
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
      const cstmrs = (await this.custManager.getCustomers()).body.results;

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
    /* // TODO: Add obtaining Acess_Token
    const url = `http://localhost:${process.env.AUTHSERV_PORT}/auth/profile`; */

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
        await this.custManager.customerSignIn(username, password)
      ).body;

      if (!customer) throw new Error('Wrong credentials');

      // const test = <AxiosResponse>(await axios.get(url)).data;
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
      const customer = (await this.custManager.getCustomerById(id)).body;

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

      const emailToken = (await this.custManager.getCustomerEmailToken(id)).body
        .value;

      const { isEmailVerified } = (
        await this.custManager.customerVerifyEmail(emailToken)
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
