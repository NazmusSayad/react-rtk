import { ObjectPath, ObjectPathValue } from './types'

export function getValueUsingPath<
  T extends Record<string, any>,
  P extends ObjectPath<T>
>(obj: T, key: P): ObjectPathValue<T, P> {
  const keys = key.split('.') as (keyof T)[]
  let result: any = obj

  for (const k of keys) {
    result = result[k]
  }

  return result as ObjectPathValue<T, P>
}
