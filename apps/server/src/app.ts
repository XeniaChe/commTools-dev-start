import express, { Response } from 'express';

import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

app.use('*', async (_, res: Response) => {
  return res.status(404).json({
    status: 'error',
    data: {
      message: 'resource not found on this server',
    },
  });
});

export default app;
