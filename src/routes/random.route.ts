import { Request, Response } from 'express';
import { calculateMinute } from '../utils/calculateRandomTime';
import { calculateFibonacciTime } from '../utils/calculateFibonacciColors';

export function getRandomTime(req: Request, res: Response): void {
  const hour: string = (Math.round(Math.random() * (12 - 0) + 0)).toString();
  const minute: string = calculateMinute();
  const time: string = hour + ":" + minute;
  const result = calculateFibonacciTime(time);
  res.json(result);
}