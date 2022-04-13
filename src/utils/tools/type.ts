// 去除type中的某一个字段定义
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 *
 * @summary 生成一个带string枚举类型的数组
 * type Animal = 'cat' | 'dog' | 'rabbit' | 'snake'
 * const animals: Animal[] = ['cat', 'dog', 'rabbit', 'snake']
 * 避免上面这种重复写法
*/
// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
export const tuple = <T extends string[]>(...args: T):string[] => args

/**
 *
 * @summary 生成一个带number枚举类型的数组
 * type Animal = 'cat' | 'dog' | 'rabbit' | 'snake'
 * const animals: Animal[] = ['cat', 'dog', 'rabbit', 'snake']
 * 避免上面这种重复写法
*/
export const tupleNum = <T extends number[]>(...args: T):number[] => args

/**
 * https://stackoverflow.com/a/59187769
 * Extract the type of an element of an array/tuple without performing indexing
 */
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer E)[] ? E : never

/**
 * https://github.com/Microsoft/TypeScript/issues/29729
 * 'black' | 'red' | string 类型不被string 覆盖，可进行枚举提示
 */
export type LiteralUnion<T extends U, U> = T | (U & {IGNORE?: never})
