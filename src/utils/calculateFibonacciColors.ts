import { FibonacciTime } from "../types/fibonacciTime";
import { ColorAssignment } from "types/colorAssignment";


function hourFactors(d1: number): number[] {
  const numList = [5, 3, 2, 1, 1];
  let hrFactors: number[] = [];
  let remaining = d1; // Removed the '|| 12' to prevent it from defaulting to 12.
  numList.forEach(num => {
    if (remaining >= num) {
      remaining -= num;
      hrFactors.push(num);
    }
  });
  return hrFactors;
}

function minuteFactors(d2: number): number[] {
  const numList = [5, 3, 2, 1, 1];
  let minFactors: number[] = [];
  let remaining = Math.floor(d2 / 5);
  numList.forEach(num => {
    if (remaining >= num) {
      remaining -= num;
      minFactors.push(num);
    }
  });
  return minFactors;
}

function assignColors(hrFactors: number[], minFactors: number[]): ColorAssignment {
  let colorOf1 = 'white';
  let colorOf2 = 'white';
  let colorOf3 = 'white';
  let colorOf5 = 'white';

  // When hours are '0' (midnight or noon), all hour blocks should be 'white'
  if (hrFactors.length === 0) { 
    colorOf5 = minFactors.includes(5) ? 'green' : 'white';
    colorOf3 = minFactors.includes(3) ? 'green' : 'white';
    colorOf2 = minFactors.includes(2) ? 'green' : 'white';
    colorOf1 = minFactors.filter(x => x === 1).length > 0 ? 'green' : 'white';
  } else {
    // Regular color assignment
    colorOf5 = hrFactors.includes(5) ? (minFactors.includes(5) ? 'blue' : 'red') : (minFactors.includes(5) ? 'green' : 'white');
    colorOf3 = hrFactors.includes(3) ? (minFactors.includes(3) ? 'blue' : 'red') : (minFactors.includes(3) ? 'green' : 'white');
    colorOf2 = hrFactors.includes(2) ? (minFactors.includes(2) ? 'blue' : 'red') : (minFactors.includes(2) ? 'green' : 'white');
    colorOf1 = hrFactors.includes(1) ? (minFactors.includes(1) ? 'blue' : 'red') : (minFactors.includes(1) ? 'green' : 'white');
  }

  return { colorOf1, colorOf2, colorOf3, colorOf5 };
}

function formatOutput(time: string, hrFactors: number[], minFactors: number[]): FibonacciTime {
  const colorAssignment = assignColors(hrFactors, minFactors);

  const colors: FibonacciTime = {
    time: time,
    red: [],
    green: [],
    blue: [],
  };

  // Only add to red or blue if hour factors are present.
  if (hrFactors.length > 0) {
    if (colorAssignment.colorOf5 === 'red') colors.red.push(5);
    if (colorAssignment.colorOf3 === 'red') colors.red.push(3);
    if (colorAssignment.colorOf2 === 'red') colors.red.push(2);
    if (colorAssignment.colorOf1 === 'red') colors.red.push(1);

    if (colorAssignment.colorOf5 === 'blue') colors.blue.push(5);
    if (colorAssignment.colorOf3 === 'blue') colors.blue.push(3);
    if (colorAssignment.colorOf2 === 'blue') colors.blue.push(2);
    if (colorAssignment.colorOf1 === 'blue') colors.blue.push(1);
  }

  // Add to green based on minute factors.
  if (colorAssignment.colorOf5 === 'green') colors.green.push(5);
  if (colorAssignment.colorOf3 === 'green') colors.green.push(3);
  if (colorAssignment.colorOf2 === 'green') colors.green.push(2);
  minFactors.forEach(factor => {
    if (factor === 1 && colorAssignment.colorOf1 === 'green') colors.green.push(1);
  });

  return colors;
}

/**
 * Accepts a time string and returns an object of type FibonacciTime
 * 
 * - times after 12 o'clock are set to 0 o'clock (12 hours) 
 * - rounds the time to the nearest 5-minute mark" 
 * 
 * @param inputTime accepts a time as a tring e.g. "12:13"
 * @returns a Object as FibonacciTime Type
 */
export function calculateFibonacciTime(inputTime: string): FibonacciTime {
  let [hourStr, minuteStr] = inputTime.split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);

  // Rounding minutes to the nearest 5 for the Fibonacci clock representation
  minutes = Math.round(minutes / 5) * 5;

  hours = hours % 12; // Correctly handle '12' as '0'
  let hrFactors = hours > 0 ? hourFactors(hours) : []; // Get hour factors unless it's '12' then it's an empty array.
  let minFactors = minuteFactors(minutes); // Get minute factors normally.

  // Format the output, adjust time display if needed
  let displayTime = hours === 0 ? '00' : hourStr;
  displayTime += ':' + minutes.toString().padStart(2, '0'); // Ensuring minute string is two digits

  return formatOutput(displayTime, hrFactors, minFactors);
}
