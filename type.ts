type OriginalType = [['key', 'value'], ['key2', 'value2'], ['key3', 'value2']]

type Entries = [string, any][]
type ConvertedType<T extends Entries> = {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1]
}

type RemoveReadonlyCore<T> = {
  -readonly [K in keyof T]: T[K]
}
type RemoveReadonly<T> = {
  -readonly [K in keyof T]: RemoveReadonlyCore<T[K]>
}

// Usage example:
const data = {} as ConvertedType<OriginalType>

function objectFromEntries<E extends Entries>(a: E) {
  return Object.fromEntries(a) as ConvertedType<E>
}

const entries = [
  ['name', 'hello'],
  ['name1', 'hello'],
] as const
type Input = RemoveReadonly<typeof entries>
objectFromEntries<Input>(entries)
