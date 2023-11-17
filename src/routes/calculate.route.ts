import { Request, Response } from 'express';
import { calculateFibonacciTime } from '../utils/calculateFibonacciColors';

export function getCalculatedTime(req: Request, res: Response): void {
  // make sure that the body is present
  if (!req.body) {
    res.status(400).send('Request body is missing');
    return
  }
  
  const { time } = req.body;

  // check whether the time is in the correct format
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!time || !timeRegex.test(time)) {
    res.status(400).json({ error: 'Invalid time format. Please use HH:MM format.' });
    return
  }

  const result = calculateFibonacciTime(time);
  res.json(result);
}