/**
 * 本地缓存的相关方法
 * miSessionStorage 使用sessionStorage缓存
 * miLocalStorage 使用localStorage缓存
 * 注意：因为在某种情况下可能出现“Failed to read the 'localStorage' property from 'Window': Access is denied for this document”
 * 所以我们需要添加localStorage和sessionStorage的判断
 */

// 判断是否支持localStorage功能
export function isLocalStorageSupport (): boolean {
  const temp = 'temp'
  try {
    localStorage.setItem(temp, temp)
    localStorage.removeItem(temp)
    return true
  } catch (err) {
    return false
  }
}

// 判断是否支持sessionStorage功能
export function isSessionStorageSupport (): boolean {
  const temp = 'temp'
  try {
    sessionStorage.setItem(temp, temp)
    sessionStorage.removeItem(temp)
    return true
  } catch (err) {
    return false
  }
}

/**
 * 注意：为了保障存入的数据不会覆盖已有的数据，请按照命名规范命名；命名规范：[moduleName]_[dataName]
 * @export 使用sessionStorage缓存本地数据
 * @param {boolean} isWrite 是否写入数据，true为写入数据，false为读取数据
 * @param {*} data 从接口请求来的数据
 * @param {string} key 存储在sessionStorage中数据采用的key
 * @param {string} [local] 可选参数，对应国家的代号；当采用此参数后，sessionStorage中存储的一级key为local，二级key为上一个参数key
 * @returns sessionStorage中相应的数据，如果sessionStorage中没有对应的数据，则返回null
 */
export function miSessionStorage (isWrite: boolean, key: string, data?: any, local?: string): any {
  if (!isSessionStorageSupport()) {
    return null
  }

  let sessionData = null

  if (local) {
    if (isWrite && data !== undefined) { // 存数据
      const tempData = JSON.parse(sessionStorage.getItem(local) || '{}')
      tempData[key] = data
      sessionStorage.setItem(local, JSON.stringify(tempData))

      sessionData = data
    } else if (sessionStorage.getItem(local)) { // 读数据
      const nationData = JSON.parse(sessionStorage.getItem(local) || '{}')
      sessionData = nationData[key] || null
    }
  } else {
    if (isWrite && data !== undefined) { // 存数据
      sessionStorage.setItem(key, JSON.stringify(data))
      sessionData = data
    } else if (sessionStorage.getItem(key)) { // 读数据
      sessionData = JSON.parse(sessionStorage.getItem(key) || '{}')
    }
  }

  return sessionData
}

/**
 * 注意：为了保障存入的数据不会覆盖已有的数据，请按照命名规范命名；命名规范：[moduleName]_[dataName]
 * @export 使用localStorage缓存本地数据
 * @param {boolean} isWrite 是否要写入数据
 * @param {*} data 从接口请求来的数据
 * @param {string} key 存储在localStorage中数据采用的key
 * @param {string} [local] 可选参数，对应国家的代号；当采用此参数后，localStorage中存储的一级key为local，二级key为上一个参数key
 * @returns localStorage中相应的数据，如果localStorage中没有对应的数据，则返回null
 */
export function miLocalStorage (isWrite: boolean, key: string, data?: any, local?: string): any {
  if (!isLocalStorageSupport()) {
    return null
  }

  let localData = null

  if (local) {
    if (isWrite && data !== undefined) { // 存数据
      const tempData = JSON.parse(localStorage.getItem(local) || '{}')
      tempData[key] = data
      localStorage.setItem(local, JSON.stringify(tempData))
      localData = data
    } else if (localStorage.getItem(local)) { // 读数据
      const nationData = JSON.parse(localStorage.getItem(local) || '{}')
      localData = nationData[key] || null
    }
  } else {
    if (isWrite && data !== undefined) { // 存数据
      localStorage.setItem(key, JSON.stringify(data))
      localData = data
    } else if (localStorage.getItem(key)) { // 读数据
      localData = JSON.parse(localStorage.getItem(key) || '{}')
    }
  }

  return localData
}

/**
 * 用于存储storage：根据用户设置支持的类型与传入的类别判断是否存储storage
 * 注意：下次更改直接获取local时，可把local改为可选参数
 * @param {string} type'0|1|2|3' cookie类别：Required：0，Function: 1，Advertising：2，Analytical：3
 * @param {string} key storge key
 * @param {*} data storge data
 * @param {string} [local] 对应国家的代号；当采用此参数后，localStorage中存储的一级key为local，二级key为上一个参数key
 */
export function setSessionStorage(type: string, key: string, data: any, local: string): void {
  if (!isSessionStorageSupport()) {
    return
  }

  if (local) {
    const tempData = JSON.parse(sessionStorage.getItem(local) || '{}') || {}
    tempData[key] = data
    sessionStorage.setItem(local, JSON.stringify(tempData))
  } else {
    sessionStorage.setItem(key, JSON.stringify(data))
  }
}

/**
 * 读取sessionStorage，当存sessionStorage时采用了local参数，读取时必须加上local参数
 * @param key storage key
 * @param [local] 对应国家的代号；当采用此参数后，sessionStorage中读取的一级key为local，二级key为上一个参数key
 * @returns sessionStorage中相应的数据，如果sessionStorage中没有对应的数据，则返回null
 */
export function getSessionStorage(key: string, local?: string): any {
  if (!isSessionStorageSupport()) {
    return
  }

  let sessionData = null

  if (!!local && !!sessionStorage.getItem(local)) {
    const nationData = JSON.parse(sessionStorage.getItem(local) || '{}')
    sessionData = nationData[key] || null
  } else {
    sessionData = JSON.parse(sessionStorage.getItem(key) || 'null')
  }

  return sessionData
}

/**
 * 删除sessionStorage，当存sessionStorage时采用了local参数，删除时必须加上local参数
 * @param key storage key
 * @param [local] 国家代码，存cookie时采用local，删除时必须传入local，才能正常删除
 */
export function removeSessionStorage(key: string, local?: string): void {
  if (!isSessionStorageSupport()) {
    return
  }

  if (!!local && !!sessionStorage.getItem(local)) {
    // 删除二级key
    const nationData = JSON.parse(sessionStorage.getItem(local) || '{}')
    delete nationData[key]
    // nationData为空对象时删除整个storage
    if (Object.keys(nationData).length) {
      sessionStorage.setItem(local, JSON.stringify(nationData))
    } else {
      sessionStorage.removeItem(local)
    }
  } else {
    sessionStorage.removeItem(key)
  }
}

/**
 * 用于存储storage：根据用户设置支持的类型与传入的类别判断是否存储storage
 * 注意：下次更改直接获取local时，可把local改为可选参数
 * @param {string} type'0|1|2|3' cookie类别：Required：0，Function: 1，Advertising：2，Analytical：3
 * @param {string} key storge key
 * @param {*} data storge data
 * @param {string} [local] 对应国家的代号；当采用此参数后，localStorage中存储的一级key为local，二级key为上一个参数key
 */
export function setLocalStorage(type: string, key: string, data: any, local: string): void {

  if ( !isLocalStorageSupport() ) {
    return
  }

  if (local) {
    const tempData = JSON.parse(localStorage.getItem(local) || '{}') || {}
    tempData[key] = data
    localStorage.setItem(local, JSON.stringify(tempData))
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

/**
 * 读取localStorage，当存localStorage时采用了local参数，读取时必须加上local参数
 * @param key storage key
 * @param [local] 对应国家的代号；当采用此参数后，localStorage中读取的一级key为local，二级key为上一个参数key
 * @returns localStorage中相应的数据，如果localStorage中没有对应的数据，则返回null
 */
export function getLocalStorage(key: string, local?: string): any {
  if (!isLocalStorageSupport()) {
    return
  }

  let localData = null

  if (!!local && !!localStorage.getItem(local)) {
    const nationData = JSON.parse(localStorage.getItem(local) || '{}')
    localData = nationData[key] || null
  } else {
    localData = JSON.parse(localStorage.getItem(key) || 'null')
  }
  return localData
}

/**
 * 删除localStorage，当存localStorage时采用了local参数，读取时必须加上local参数
 * @param key storage key
 * @param [local] 国家代码，存cookie时采用local，删除时必须传入local，才能正常删除
 */
export function removeLocalStorage(key: string, local?: string): void {
  if (!isLocalStorageSupport()) {
    return
  }

  if (!!local && !!localStorage.getItem(local)) {
    const nationData = JSON.parse(localStorage.getItem(local) || '{}')
    delete nationData[key]
    // nationData为空对象时删除整个storage
    if (Object.keys(nationData).length) {
      sessionStorage.setItem(local, JSON.stringify(nationData))
    } else {
      localStorage.removeItem(local)
    }
  } else {
    localStorage.removeItem(key)
  }
}
