type Pair<T> = { first: T; second: T; third?: T };

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function createPairsFrom<T>(items: T[]): Pair<T>[] {
  if (items.length < 2) {
    return [];
  }
  const results: Pair<T>[] = [];
  for (let i = 0; i <= items.length - 2; i += 2) {
    const pair: Pair<T> = { first: items[i], second: items[i + 1] };
    results.push(pair);
  }
  if (items.length % 2 === 1) {
    results[results.length - 1].third = items[items.length - 1];
  }
  return results;
}

export { createPairsFrom, shuffle };
export type { Pair };
