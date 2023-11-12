import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { getRandomTime } from './routes/random.route';
import { getExampleTime } from './routes/example.route';
import { getCalculatedTime } from './routes/calculate.route';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// swagger api doc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fibonacci API',
      version: '1.0.0',
      description: 'API to interact with a Fibonacci Clock representation',
    },
  },
  apis: ['./src/docs/*.yaml'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.get('/example/:number', getExampleTime); //  gives the example times from the exampleTimes.json
app.get('/random', getRandomTime); // gives a random time from the randdomTimes.json

/**
 * calculates the given clock time and returns it as type FibonacciTime:
 * - req body: { "time": "12:21"}
 * - res body: {"time": "00:20", "red": [], "green": [3,1],"blue": []}
 */
app.post('/calculate', getCalculatedTime);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger running at http://localhost:${port}/api-docs`);
});