
/**
 *
 * @summary 删除对象中的某一键指对
 * @export
 * @param obj 传入的对象
 * @param fields 需要删除的key
*/

export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  fields: K[],
): Omit<T, K> {
  const clone = { ...obj }

  if (Array.isArray(fields)) {
    fields.forEach(key => {
      delete clone[key]
    })
  }

  return clone
}
