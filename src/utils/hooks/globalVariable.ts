import { useMatchMedia } from '@/src/utils/hooks';
import { createContext, useContext } from 'react'
import {
  IntlType,
  NationConfigProps,
  WebScmTypes,
  PageSeoData,
} from '@/src/types'

type GlobalVariableType = NationConfigProps & {
  local: WebScmTypes.LocalType
  intl: IntlType
  isServerSide: boolean
  seoData: PageSeoData
  [props: string]: unknown
}

const defaultValue: GlobalVariableType = {
  local       : 'global',
  config      : {} as WebScmTypes.SiteScmConfig,
  isServerSide: false,
  intl        : { get: () => '' },
  seoData     : {} as PageSeoData,
}

const GlobalVariableContext = createContext(defaultValue)
const GlobalVariable = GlobalVariableContext.Provider

/**
 * 获取当前站点 local
 * @example 'es', 'in', 'hk', ...
 * @returns 当前站点 `local`
 */
function useLocal (): WebScmTypes.LocalType {
  return useContext(GlobalVariableContext).local || 'global'
}

/**
 * 获取当前站点 SCM 配置
 * @returns 当前站点 SCM 配置
 */
function useScmConfig (): WebScmTypes.SiteScmConfig {
  return useContext(GlobalVariableContext).config
}

/**
 * 是否为服务端渲染
 * @returns boolean
 */
function useIsServerSide (): boolean {
  return useContext(GlobalVariableContext).isServerSide
}

/**
 * 获取当前翻译函数
 * @returns Intl 函数
 */
function useIntl (): IntlType {
  return (useContext(GlobalVariableContext).intl as IntlType)
}

/**
 * 获取当前页面的 SSR 页面数据
 * @returns 即 `window.__PRELOADED_STATE__.pagedata` 的页面数据
 */
function usePageData (): unknown {
  return useContext(GlobalVariableContext).data || {}
}

/**
 * 获取当前页面的 SSR 页面数据中的 `seo` 字段
 * @description 由于 MiSSR 在渲染数据时专门处理了 `seoData`，因此可以直接获取，二者结果一致，不需要从 `data` 中取值
 * @returns 即 `window.__PRELOADED_STATE__.pagedata.seo` 的页面数据
 */
function useSeoData (): PageSeoData {
  return useContext(GlobalVariableContext).seoData
}

/**
 * 获取自定义数据
 * @param key 自定义数据的 key 值
 * @returns 数据的结果
 * @example
 * ```
 * // 首先在项目入口的 Provider 添加自定义数据:
 * <GlobalVariable
 *   value={{
 *     abc: 123
 *   }}
 * />
 *
 * // 之后使用以下方式在项目中任意位置取值:
 * useGlobalData('abc') // 123
 * ```
 */

function useGlobalData (key: string): unknown {
  return useContext(GlobalVariableContext)[key]
}

/**
 * 获取站点路径
 * @param type 站点类型 www|buy buy：动态站 static: 静态站
 * @returns 根据站点类型、设备类型返回拼接后的站点全路径
 * @example
 * ```
 * // 动态站点
 * useSiteUrl({
 *  type: 'www',
 * })
 * => pc: haiwai.test.mi.com m: m-buy.test.mi.com
 *
 *
 * ```
 */
type SiteType = 'buy' | 'www'
function useSiteUrl(type: SiteType): string {
  const matchMedia = useMatchMedia()
  const scmConfig = useScmConfig()

  if (type === 'buy') {
    return matchMedia === 'mobile' ? scmConfig.buySite.m : scmConfig.buySite.pc
  } else if (type === 'www') {
    return matchMedia === 'mobile' ? scmConfig.wwwSite.m : scmConfig.wwwSite.pc
  } else {
    return ''
  }
}

export {
  GlobalVariable,
  GlobalVariableContext,
  useLocal,
  useScmConfig,
  useIsServerSide,
  useIntl,
  usePageData,
  useSeoData,
  useGlobalData,
  useSiteUrl,
}
