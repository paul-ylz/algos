# Dynamic Programming

- An **optimization** over **recursive problems** with **overlapping subproblems**

- Recursive function: a function that calls itself
- Fibonacci: 0 1 1 2 3 5 8 ...
  - Fibonacci is a growth sequence, and is defined by `fib(n) = fib(n-1) + fib(n-2)`

```js
const fib = n => {
  if (n === 0 || n === 1) {
    // base case
    return n
  }
  return fib(n - 1) + fib(n - 2) // recursive case
}
```

- Overlapping subproblems: repeating smaller problems

- Optimization
  - Top-down approach (memoization): compute values, save them, use them when needed
  ```js
  const memo = {}
  const fib = n => {
    if (n === 0 || n === 1) {
      // base case
      return n
    }
    if (memo[n]) {
      return memo[n]
    }
    memo[n] = fib(n - 1) + fib(n - 2) // recursive case
    return memo[n] // answer of fib(n)
  }
  ```
  - Bottom-up approach (tabulation): iteratively compute values before they are needed, save them, then use them later
  ```js
  const fib = n => {
    const table = [0, 1]
    for (let i = 2, i <= n; i++) {
      table[i] = table[i-1] + table[i-2]
    }
    return table[n] // answer of fib(n)
  }
  ```

## No optimization vs memoization vs tabulation

| No optimization                   | memoization             | tabulation              |
| --------------------------------- | ----------------------- | ----------------------- |
| solve same problem multiple times | solve same problem once | solve same problem once |
| recursive overhead                | recursive overhead      | no recursive overhead   |

## How to Solve DP Problems

1. Identify the recursive case (draw tree if it helps!!)
2. Identify the base case(s)
3. Write the recursive function
4. Identify the overlapping subproblems
5. Add memoization!
6. Flip the problem around (use increasing numbers), solve iteratively

## 0/1 Knapsack Problem

- knapsack = backpack

Given a knapsack with max weight `maxWeight`, and a list of items `[weight, value]`, what is the max value that the knapsack can contain?

- Greedy solutions will not work! (taking seemingly best choice at each stage)

1. Identify the recursive case: `maxValue = max(take item, don't take item)`
2. Identify the base case(s) = keep trying items till cannot fit in anymore, or there's no more items
3. Write the recursive function
4. Identify the overlapping subproblems
5. Add memoization!
6. Flip the problem around (use increasing numbers), solve iteratively

```js
// item = [weight, value]
const maxWeight = 50
const items = [
  [10, 60],
  [20, 100],
  [30, 120]
]
const knapsack = (maxWeight, items) => {
  return _knapsack(maxWeight, items, 0, 0, {})
}

const _knapsack = (maxWeight, items, idx, weight, memo) => {
  if (idx >= items.length) {
    return 0
  }
  const memoKey = [idx, weight]
  if (memo[memoKey]) {
    return memo[memoKey]
  }
  const curWeight = items[idx][0]
  const curValue = items[idx][1]
  const dontTakeItem = _knapsack(maxWeight, items, idx + 1, weight)
  if (curWeight + weight >= maxWeight) {
    return dontTakeItem
  }
  // recursive case
  const takeItem =
    _knapsack(maxWeight, items, idx + 1, weight + curWeight) + curValue
  memo[memoKey] = Math.max(takeItem, dontTakeItem) // max value
  return memo[memoKey] // answer of knapsack(idx, weight)
}
```

- Bottom-up solution
- `memoKey` = `idx` and `weight`
- What does `memo[idx, weight]` represent? max value of knapsack with items up till `idx`, and total weight = `weight`
- What does `table[i][j]` represent? max value of knapsack with items up till `i` and `currentKnapsackWeight` <= `j`
  - `j` = 0, 1, 2, .... `maxWeight`
  - `j` is the maxWeight at this instance

```js
const matrix = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

const knapsack = (maxWeight, items) => {
  const table = Array.from(Array(items.length + 1), () =>
    Array(maxWeight + 1).fill(0)
  ) // creates 2D array filled with 0s
  for (let i = 1; i <= items.length; i++) {
    const curWeight = items[i - 1][0]
    const curValue = items[i - 1][1]

    for (let j = 0; j < maxWeight; j++) {
      const dontTake = table[i - 1][j]
      if (curWeight >= j) {
        table[i][j] = dontTake
      } else {
        const take = table[i - 1][j - curWeight] + curValue
        table[i][j] = Math.max(dontTake, take)
      }
    }
  }
  return table[items.Length][maxWeight - 1]
}
```

## Extras

- Other questions: coin change / longest increasing subsequence
- Google is your best friend :D
