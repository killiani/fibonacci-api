import express, { Request, Response } from 'express';
import { FibonacciTime } from './types/fibonacciTime';
import { calculateFibonacciTime } from './utils/calculateFibonacciColors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


//  gives the example times from the exercise
app.get('/example/:number', (req: Request, res: Response) => {
  const number = parseInt(req.params.number);

  const filePath = path.join(__dirname, 'static', 'exampleTimes.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error on read the exampleTimes.json data' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      // checks if the choosen number is included as example
      if (number >= 0 && number < jsonData.length) {
        const responseData: FibonacciTime = jsonData[number];

        // send the example time as response
        res.json(responseData);
      } else {
        res.status(400).json({ error: `there are only the valid examples 0 to ${jsonData.length-1}` });
      }
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: 'error on parse the example .json data' });
    }
  });
});


// gives a random time from the randdomTimes.json
app.get('/random', (req: Request, res: Response) => {
  const filePath = path.join(__dirname, 'static', 'randomTimes.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading the randomTimes.json data' });
      return;
    }

    try {
      const timesArray = JSON.parse(data);

      // select a random time from the array
      const randomIndex = Math.floor(Math.random() * timesArray.length);
      const randomTime = timesArray[randomIndex];

      // send the random time as a response
      res.json(randomTime);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: 'Error parsing the JSON data' });
    }
  });
});


/**
 * calculates the given clock time and returns it as type FibonacciTime:
 * - req body: { "time": "12:21"}
 * - res body: {"time": "00:20", "red": [], "green": [3,1],"blue": []}
 */
app.post('/calculate', (req: Request, res: Response) => {

  // make sure that the body is present
  if (!req.body) {
    return res.status(400).send('Request body is missing');
  }
  
  const { time } = req.body;

  // check whether the time is in the correct format
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!time || !timeRegex.test(time)) {
    return res.status(400).json({ error: 'Invalid time format. Please use HH:MM format.' });
  }

  // calculate
  const result = calculateFibonacciTime(time);
  console.log(result);
  res.json(result);
  
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});