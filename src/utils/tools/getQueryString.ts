/**
 * @author Conan06 <hongshiwen@xiaomi.com>
 * @description 获取查询字段
 * @param {string} searchKey 需要获取的查询 key
 * @param {string} searchString? 需要查询的字符串，若不填写，则取 location.search
 * @return {string} 查询结果
 */
export function getQueryString (searchKey: string, searchString?: string): string {
  const urlSearch: string = searchString || window.location.search || getQueryFromHash()

  // URI的格式是由RFC 3986规定: https://tools.ietf.org/html/rfc3986
  // * query以第一个?开始，至行尾或#结束。
  // * hash以#为开始，行尾为结束。
  // 如果是 hash router，如：http://example.com/#/some/path?search=a#hash
  // 则存在 location.search 为空的情况，需要从 location.hash 中取出
  function getQueryFromHash (): string {
    return (window.location.hash || '').replace(/.+\?/g, '?').replace(/#.+/g, '')
  }

  if (!urlSearch) {
    return ''
  }

  const queryString = urlSearch.slice(1) // 移除第一位的问号
  const queryArray = queryString.split('&')
  const queryMap = queryArray.map((item: string) => item.split('='))

  const [ result ] = queryMap.filter(([ key, _value ]: string[]) => key === searchKey).map(([ _key, value ]: string[]) => value)

  return (result || '').replace(/[ +]/g, '%20').replace(/(%[a-f0-9]{2})+/ig, match => decodeURIComponent(match))
}
