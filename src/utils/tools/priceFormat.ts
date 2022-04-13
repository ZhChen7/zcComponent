/**
 * @author Conan06
 * @description 金额格式化
 * @summary https://wiki.n.miui.com/pages/viewpage.action?pageId=162411674
 * @param {string} inputPrice 需要格式化的金额
 * @param {string} siteConfig 地区配置
 * @param {object} customOptions? 用户的配置参数，与 toLocaleString() 保持一致
 * {
 *    style: 'currency'表示携带金额符号返回 || 'decimal'表示只返回数字部分
 *    currency: 金额符号的三位字母缩写，如 INR、USD、BGP、CNY 等
 *    minimumFractionDigits: 保留的小数位数
 * }
 * @returns {string} formattedPrice
 */
import { WebScmTypes } from '@/src/types'

// 将格式化的字符串金额转换为数字
export function getPriceNum (inputPrice: string | number, siteConfig: WebScmTypes.SiteScmConfig): number {
  const currencyFunction = siteConfig.currencyFunction // 金额格式化方法

  // 传入的金额可能自身带有各式，需要去除格式，转为正常数字
  const isFormatted = Number.isNaN(Number(inputPrice)) || ( // 若不是个数字，则已经做过格式化，返回 true
    String(inputPrice) !== Number(inputPrice).toFixed(2) && // 印尼与西欧可能自带格式为 123.456，虽然不是 NaN，但也要与 toFixed(2) 比较，确认是否做了格式化
    String(inputPrice) + '0' !== Number(inputPrice).toFixed(2) // 如果输入值为 529.9，将其补上 0 后与 toFixed(2) 比较，确认是否做了格式化
  )

  const price = isFormatted
    ? ~[ 'dotThousCommaDec', 'spaceThousCommaDec' ].indexOf(currencyFunction)
        ? String(inputPrice + '').replace(/[ .]/g, '').replace(/,/g, '.') // 特定国家移除点分隔符，并将逗号换成小数点
        : String(inputPrice + '').replace(/,/g, '') // 其余国家移除逗号分隔符
    : String(inputPrice || 0)

  return Number(price)
}

// 数字格式化函数（必定不带金额符号）
// 用于一些非金额的数字格式化，例如：50,000 积分，10,000,000 人口
export function numberFormat (inputNumber: string, siteConfig: WebScmTypes.SiteScmConfig, _customOptions?: Record<string, any>): string {
  return priceFormat(inputNumber, siteConfig, {
    style                : 'decimal', // 不携带金额符号
    minimumFractionDigits: 0, // 默认不留存小数，若存在小数，会保留两位（可改成任意位数）
  })
}

// 金额格式化函数（是否带金额符号取决于 customOptions 配置）
export function priceFormat (inputPrice: string, siteConfig: WebScmTypes.SiteScmConfig, customOptions?: Record<string, any>): string {
  // 读取设置参数
  const currencyCode = siteConfig.currencyCode
  const currencySymbol = siteConfig.currencySymbol
  const currencyFunction = siteConfig.currencyFunction // 金额格式化方法
  const currencyExpect = siteConfig.currencyExpect === 'integer' ? 'integer' : 'decimal' // 数值期望(整数or小数)
  const currencyFormat = siteConfig.currencyPosition === 'post' ? 'post' : 'pre' // 货币符号相对于金额的位置
  const currencyBlind = siteConfig.currencyBlindPrice || '???' // 盲售时展示内容
  const currencyError = '---' // 金额 NaN 等异常时做展示

  // 传入的金额可能自身带有各式，需要去除格式，转为正常数字
  const price: number = getPriceNum(inputPrice, siteConfig)

  // 以下地区移除小数部分，金额尽力只保留取整(如果自身有小数则显示)
  const isRemoveDecimal: boolean = currencyExpect === 'integer' // 期望金额是一个整数

  const options = Object.assign(
    {
      style                : 'currency', // 'currency'表示携带金额符号返回, 'decimal'表示只返回数字部分
      currency             : currencyCode,
      minimumFractionDigits: isRemoveDecimal ? 0 : 2, // 小数位数
    },
    customOptions,
  )

  /**
   * 使 UC Browser、Opera Mini 等支持国际化API
   * 结合项目改写，并修正部分小数位数问题 - by Conan06
   * 参考源: https://github.com/Girish-K/polyfill-Number.toLocaleString-with-Locales
   */

  // 以下是转换函数
  const roundOff = function (priceNum: string, precision: number) {
    if (precision !== 0) {
      // 小数位不为零，返回格式化后的数据
      return (+priceNum).toFixed(precision)
    } else {
      // 若小数位定义为0，判断是否为纯整数，若不是则要保留小数金额
      const nZero = +((+priceNum).toFixed(0))
      const nTwo = +((+priceNum).toFixed(2))
      return (+priceNum).toFixed(nZero === nTwo ? 0 : 2)
    }
  }
  const replaceSeparators = function (sNum: string, separators: any) {
    sNum = '' + roundOff(sNum, separators.precision) // 拆分数字
    const sNumParts = sNum.split('.')
    if (separators && separators.thousands) {
      sNumParts[0] = sNumParts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separators.thousands)
    } else if (separators && separators.hundreds) {
      sNumParts[0] = sNumParts[0].replace(/(\d)(?=(\d\d)+(?!\d))/g, '$1' + separators.hundreds)
    }
    sNum = sNumParts.join(separators.decimal)
    return sNum
  }
  const getLast3Digits = function (sNum: string, separators: any) {
    let newNum = '' + roundOff(sNum, separators.precision)
    const sNumParts = newNum.split('.')
    sNumParts[0] = String('000' + sNumParts[0]).slice(-3) // 整数位补0
    newNum = sNumParts.join('.') // 拼接小数部分
    return newNum
  }

  // 12.345.678,90
  const dotThousCommaDec = function (sNum: string, options: any) {
    const separators = { decimal: ',', thousands: '.', precision: options.minimumFractionDigits || 0 }
    return replaceSeparators(sNum, separators)
  }
  // 12,345,678.90
  const commaThousDotDec = function (sNum: string, options: any) {
    const separators = { decimal: '.', thousands: ',', precision: options.minimumFractionDigits || 0 }
    return replaceSeparators(sNum, separators)
  }
  // 12 345 678,90
  const spaceThousCommaDec = function (sNum: string, options: any) {
    const separators = { decimal: ',', thousands: '\u00A0', precision: options.minimumFractionDigits || 0 } // \u00A0 表示空格
    return replaceSeparators(sNum, separators)
  }
  // 12,34,56,789.99
  const spaceHundredsCommaThousCommaDec = function (sNum: string, options: any) {
    const hundredSeparators = { decimal: '.', hundreds: ',', precision: 0 }
    const thousandSeparators = { decimal: '.', thousands: ',', precision: options.minimumFractionDigits || 0 }
    const newNum = +sNum
    if (newNum >= 1000) {
      return replaceSeparators(Math.floor(newNum / 1000) + '', hundredSeparators) + ',' + getLast3Digits((newNum % 1000).toFixed(2), thousandSeparators)
    } else {
      return replaceSeparators(newNum + '', thousandSeparators)
    }
  }

  // 数字部分的转换格式
  const transformForLocale = {
    commaThousDotDec               : commaThousDotDec, // 12,345,678.90 (通用型)
    spaceHundredsCommaThousCommaDec: spaceHundredsCommaThousCommaDec, // 12,34,56,789.99 (印度独有)
    dotThousCommaDec               : dotThousCommaDec, // 12.345.678,90 (西欧与印尼)
    spaceThousCommaDec             : spaceThousCommaDec, // 12 345 678,90 (法国与俄罗斯)
  }

  const initNumString = Number(price).toString() //  需要格式化的金额，将 string 转为 number 类型处理，避免异常类型等情况
  const formatFunc = transformForLocale[currencyFunction || 'commaThousDotDec'] // 金额格式化处理函数

  let formattedPrice = initNumString === '-1'
    ? currencyBlind // 后端数据返回-1，表示盲售金额，不做金额格式化
    : initNumString === 'NaN'
      ? currencyError // 金额错误返回-2，展示'---'占位
      : formatFunc(initNumString, options)

  // 如果需要返回金额符号，额外做一层判断
  if (options && options.style === 'currency') {
    // 货币单位拼接格式
    const currencyFormats = {
      pre : '{{code}}{{num}}',
      post: '{{num}}{{code}}',
    }

    const renderFormat = function (template: string, props: any) {
      for (const prop in props) {
        template = template.replace('{{' + prop + '}}', props[prop])
      }
      return template
    }

    // 找出金额与货币符号的位置关系模板
    const formatTemplate = currencyFormats[currencyFormat]

    formattedPrice = renderFormat(formatTemplate, {
      num : formattedPrice,
      code: currencySymbol,
    })
  }

  // 返回一个格式化后的数字（或者带有金额符号的格式化后的数字）
  return formattedPrice
}
