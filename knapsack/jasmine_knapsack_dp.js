const knapsack = (maxWeight, items) => {
    const table = Array.from(Array(items.length+1), _ => Array(maxWeight+1).fill(0))
    for (let i = 1; i <= items.length; i++) {
        const curWeight = items[i-1][0]
        const curValue = items[i-1][1]
        for (let j = 1; j <= maxWeight; j++) {
            if (curWeight <= j) { // can be put in bag
                const noTake = table[i-1][j]
                const take = table[i-1][j-curWeight] + curValue
                table[i][j] = Math.max(noTake, take)
            } else { // cannot be put in bag
                table[i][j] = table[i-1][j]
            }
        }
    }
    return table[items.length][maxWeight]
}

const items = [[10, 60], [20, 100], [30, 120]] 
console.log("%d", knapsack(50, items ))

