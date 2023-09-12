export type Modify<T, R> = Omit<T, keyof R> & R

export type EntriesToObject<T extends [string, any][]> = {
  [K in T[number][0]]: Extract<T[number], [K, any]>[1]
}

export type CustomReducers<State = any> = {
  [i: string]: (state: State, payload?: any) => any
}
