import { calculateMinute } from "./calculateRandomTime";

describe('calculateMinute', () => {
  test('should return a string of length 2', () => {
    const result = calculateMinute();
    expect(result).toHaveLength(2);
  });

  test('should return a multiple of 5', () => {
    const result = parseInt(calculateMinute(), 10);
    expect(result % 5).toBe(0);
  });

  test('should return different values on subsequent calls', () => {
    const results = new Set();
    for (let i = 0; i < 10; i++) {
      results.add(calculateMinute());
    }
    expect(results.size).toBeGreaterThan(1); // at least two different values 
  });
});
