import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export function getRandomTime(req: Request, res: Response): void {
  const filePath = path.join(__dirname, '..', 'static', 'randomTimes.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading the randomTimes.json data' });
      return;
    }

    try {
      const timesArray = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * timesArray.length);
      const randomTime = timesArray[randomIndex];
      res.json(randomTime);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).json({ error: 'Error parsing the JSON data' });
    }
  });
}
