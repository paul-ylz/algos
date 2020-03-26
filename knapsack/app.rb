def max_value(items, capacity)
  return 0 if items.empty?
  if capacity < items[0][0]
    return max_value(items[1..-1], capacity)
  end
  take = items[0][1] + max_value(items[1..-1], capacity - items[0][0])
  no_take = max_value(items[1..-1], capacity)
  [take, no_take].max
end

def knapsack(capacity, weights, values)
  items = weights.zip(values)
  max_value(items, capacity)
end

weights = [10, 20, 30]
values = [60, 100, 120]
w = 50

v = knapsack(w, weights, values)
puts v

