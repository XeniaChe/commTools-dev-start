import { Request, Response } from 'express';
import { createCustomer, getCustomers, getRandomNum } from 'customers';

/**
 * @description CustomerController
 *
 * @function createCustomer
 * @function getCustomer
 */

export class CustomerController {
  constructor() {}

  async addCustomer(req: Request, res: Response) {
    /* const options = getOptions(req.headers);
    const data = await new CustomerRepository(options).createCustomer(req.body);
    
    if (data?.statusCode == 201) {
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

    try {
      const currNum = getRandomNum();
      const customer = (
        await createCustomer(
          `test${currNum}@test.mail`,
          'strongPass',
          `test${currNum}`,
          `test${currNum}`
        )
      ).body.customer;

      return res.json({ customer });
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: 'error' });
    }
  }

  async getAllCustomers(req: Request, res: Response) {
    try {
      const cstmrs = (await getCustomers()).body.results;

      res.json({ customers: cstmrs });
    } catch (error) {
      console.error(error);

      res.status(500).json({ error: error });
    }
  }
}
