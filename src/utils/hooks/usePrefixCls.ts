
/**
 *
 * @summary 删除对象中的某一键指对
 * @export
 * @param obj 传入的对象
 * @param fields 需要删除的key
*/

export  function usePrefixCls(suffixCls?: string, customizePrefixCls?: string):string {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `mi-${suffixCls}` : 'mi';
}
