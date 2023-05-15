export type Modify<T, R> = Omit<T, keyof R> & R

export type UnionToIntersection<U> = (
  U extends any ? (arg: U) => any : never
) extends (arg: infer I) => any
  ? I
  : never
