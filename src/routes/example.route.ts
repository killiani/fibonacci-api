import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { FibonacciTime } from '../types/fibonacciTime';

export function getExampleTime(req: Request, res: Response): void {
        const number = parseInt(req.params.number);
        const filePath = path.join(__dirname, '..', 'static', 'exampleTimes.json');
      
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
      
}
