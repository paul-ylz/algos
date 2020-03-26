// A Dynamic Programming based solution for 0-1 knapsack problem
// adapted from https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/

// Returns the maximum value that can be put in a knapsack of capacity w
function knapSack(weightCap, weights, values) {
    // n is the number of items
    var n = values.length
    // we use n+1 and weightCap+1 so that there is room for the 0 case (base case)
    var table = Array.from(Array(n+1), () => new Array(weightCap+1));

    // Build table in bottom up manner
    // iterate up to <= n and <= weightCap so that we process the last element too.
    // this is because we've added a slot to the array to handle the base case of 0.
    for (var i = 0; i <= n; i++)
    {
        for (var w = 0; w <= weightCap; w++)
        {
            // base case
            // i is 0 => we have no items
            // w is 0 => we have no weight capacity
            if (i==0 || w==0) {
                table[i][w] = 0;
            } else if (weights[i-1] <= w) {
                var valueIfITakeIt = values[i-1] + table[i-1][w-weights[i-1]];
                var valueIfIDont= table[i-1][w];
                table[i][w] = Math.max(valueIfITakeIt, valueIfIDont) ;
            } else {
                table[i][w] = table[i-1][w];
            }
        }
    }

    return table[n][weightCap];
}

function main() {
    var values = [60, 100, 120];
    var weights = [10, 20, 30];
    var weightCap = 50;
    console.log("%d", knapSack(weightCap, weights, values));
}

main()
