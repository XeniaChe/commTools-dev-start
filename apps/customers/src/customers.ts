import { apiRoot } from 'client';

const createCustomer = (
  custEmail: string,
  custPass: string,
  custFName: string,
  custLName: string
) /* : Promise<T>  */ => {
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

const getCustomer = (id: string) => {
  return apiRoot.customers().withId({ ID: id }).get().execute();
};

const getRandomNum = () => Math.ceil(Math.random() * 100);
const init = async () => {
  const currNum = getRandomNum();
  try {
    const newCustId = (
      await createCustomer(
        `test${currNum}@jjjj.mail`,
        'strongPass',
        `test${currNum}`,
        `test${currNum}`
      )
    ).body.customer.id;

    console.log(`Customer CREATED: ${newCustId}`);

    const newCust = await getCustomer(newCustId);
    console.log(`Customer: ${JSON.stringify(newCust, null, 2)}`);
  } catch (error) {
    console.error(error);

    console.log(`ERROR`);
  }
};

init();
