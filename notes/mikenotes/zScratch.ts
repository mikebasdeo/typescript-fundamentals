const sum = (...vals: number[]) => vals.reduce((sum, x) => sum + x, 0)
console.log(sum(3, 4, 6)) // 13

const myList = [1, 2, 3]



// const answer = myList.reduce((sum, x) => sum + x, 10)
console.log(...myList)
