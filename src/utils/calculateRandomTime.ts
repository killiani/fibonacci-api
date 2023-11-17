export function calculateMinute(): string {
    let min: number = Math.round(Math.random() * (55 - 0));
    if(min % 5 != 0) {
        min -= min % 5; // subtracts remainder
    }

    let minString: string = min.toString();

    if((minString === "0") || (minString === "5")) {
      minString = minString.padStart(2, '0');
    }
    return minString
}