import { apiRoot } from 'client';

export const createCustomer = (
  custEmail: string,
  custPass: string,
  custFName: string,
  custLName: string
) => {
  return apiRoot
    .customers()
    .post({
      body: {
        email: custEmail,
        password: custPass,
        firstName: custFName,
        lastName: custLName,
      },
    })
    .execute();
};

export const getCustomer = (id: string) => {
  return apiRoot.customers().withId({ ID: id }).get().execute();
};

export const getRandomNum = () => Math.ceil(Math.random() * 1000);

export const getCustomers = () => {
  return apiRoot.customers().get().execute();
};
