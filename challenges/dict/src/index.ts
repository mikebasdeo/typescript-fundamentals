//  build a dict that's generic over its value type

// test dictionary
const fileExtensions = {
  typescript: ['ts'],
  javascript: ['js'],
  jpeg: ['jpg', 'jpeg'],
  html: ['html', 'htm'],
}

export type Dict<T> = {
  [key: string]: T | undefined
}

// Array.prototype.map, but for Dict
export function mapDict<T, S>(
  dict: Dict<T>,
  myFunction: (arg: T, idx: number) => S
): Dict<S> {
  const out: Dict<S> = {}

  Object.keys(dict).forEach((key, idx) => {
    // get current item
    const currentItem = dict[key]
    if (typeof currentItem !== 'undefined') {
      out[key] = myFunction(currentItem, idx)
    }
  })

  return out
}

mapDict(
  {
    a: 'a',
    b: 'b', 
    c: 'c',
  },
  (str) => ({ val: str })
)

// Array.prototype.reduce, but for Dict
// export function reduceDict<T, S>(dict: Dict<T>): Dict<S> {}
