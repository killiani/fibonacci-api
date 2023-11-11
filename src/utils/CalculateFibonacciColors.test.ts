import { calculateFibonacciTime } from './calculateFibonacciColors'; 
import { FibonacciTime } from '../types/fibonacciTime'; 
import testTimes from '../static/randomTimes.json'; 

describe('calculateFibonacciTime() compare return with randomTimes.json ', () => {
  testTimes.forEach((testEntry: FibonacciTime) => {
    test(`should return correct Fibonacci time for ${testEntry.time}`, () => {

      const result = calculateFibonacciTime(testEntry.time);

      expect(result).toMatchObject(testEntry);
    });
  });
});
