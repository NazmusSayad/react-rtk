import { sliceKey } from './config'

export type SliceKey = typeof sliceKey

export type Modify<T, R> = Omit<T, keyof R> & R

export type EntriesToObject<T extends [string, any][]> = {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1]
}
