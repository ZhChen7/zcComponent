/**
 * @author Conan06 <hongshiwen@xiaomi.com>
 * @description 获取查询 浏览器名称及其版本、操作系统名称及其版本
 * @param {string} userAgent? 需要查询的UserAgent
 * @return {UserAgentInfo} 查询结果
 */

interface UserAgentInfo {
  browser: string
  browserVersion: string
  os: string
  osVersion: string
}

export function getUserAgentInfo (userAgent?: string): UserAgentInfo {
  const ua: string = userAgent || (window.navigator && window.navigator.userAgent) || ''

  if (!ua) {
    return {
      browser       : '',
      browserVersion: '',
      os            : '',
      osVersion     : '',
    }
  }

  // 获取浏览器名称
  function getBrowser (ua: string): string {
    // 浏览器匹配列表，只增不减，注意不要删除
    const matchBrowser = {
      'Safari'       : !!~ua.indexOf('Safari'),
      'Chrome'       : !!~ua.indexOf('Chrome') || !!~ua.indexOf('CriOS'),
      'IE'           : !!~ua.indexOf('MSIE') || !!~ua.indexOf('Trident'),
      'Edge'         : !!~ua.indexOf('Edge') || !!~ua.indexOf('Edg/'),
      'Firefox'      : !!~ua.indexOf('Firefox') || !!~ua.indexOf('FxiOS'),
      'Firefox Focus': !!~ua.indexOf('Focus'),
      'Chromium'     : !!~ua.indexOf('Chromium'),
      'Opera'        : !!~ua.indexOf('Opera') || !!~ua.indexOf('OPR'),
      'Vivaldi'      : !!~ua.indexOf('Vivaldi'),
      'Yandex'       : !!~ua.indexOf('YaBrowser'),
      'Arora'        : !!~ua.indexOf('Arora'),
      'Lunascape'    : !!~ua.indexOf('Lunascape'),
      'QupZilla'     : !!~ua.indexOf('QupZilla'),
      'Coc Coc'      : !!~ua.indexOf('coc_coc_browser'),
      'Kindle'       : !!~ua.indexOf('Kindle') || !!~ua.indexOf('Silk/'),
      'Iceweasel'    : !!~ua.indexOf('Iceweasel'),
      'Konqueror'    : !!~ua.indexOf('Konqueror'),
      'Iceape'       : !!~ua.indexOf('Iceape'),
      'SeaMonkey'    : !!~ua.indexOf('SeaMonkey'),
      'Epiphany'     : !!~ua.indexOf('Epiphany'),
      '360'          : !!~ua.indexOf('QihooBrowser') || !!~ua.indexOf('QHBrowser'),
      '360EE'        : !!~ua.indexOf('360EE'),
      '360SE'        : !!~ua.indexOf('360SE'),
      'UC'           : !!~ua.indexOf('UC') || !!~ua.indexOf(' UBrowser'),
      'QQBrowser'    : !!~ua.indexOf('QQBrowser'),
      'QQ'           : !!~ua.indexOf('QQ/'),
      'Baidu'        : !!~ua.indexOf('Baidu') || !!~ua.indexOf('BIDUBrowser') || !!~ua.indexOf('baiduboxapp'),
      'Maxthon'      : !!~ua.indexOf('Maxthon'),
      'Sogou'        : !!~ua.indexOf('MetaSr') || !!~ua.indexOf('Sogou'),
      'LBBROWSER'    : !!~ua.indexOf('LBBROWSER'),
      '2345Explorer' : !!~ua.indexOf('2345Explorer') || !!~ua.indexOf('Mb2345Browser'),
      '115Browser'   : !!~ua.indexOf('115Browser'),
      'TheWorld'     : !!~ua.indexOf('TheWorld'),
      'XiaoMi'       : !!~ua.indexOf('MiuiBrowser'),
      'Quark'        : !!~ua.indexOf('Quark'),
      'Qiyu'         : !!~ua.indexOf('Qiyu'),
      'Wechat'       : !!~ua.indexOf('MicroMessenger'),
      'Taobao'       : !!~ua.indexOf('AliApp(TB'),
      'Alipay'       : !!~ua.indexOf('AliApp(AP'),
      'Weibo'        : !!~ua.indexOf('Weibo'),
      'Douban'       : !!~ua.indexOf('com.douban.frodo'),
      'Suning'       : !!~ua.indexOf('SNEBUY-APP'),
      'iQiYi'        : !!~ua.indexOf('IqiyiApp'),
      'DingTalk'     : !!~ua.indexOf('DingTalk'),
      'Huawei'       : !!~ua.indexOf('HuaweiBrowser') || !!~ua.indexOf('HUAWEI'),
    }

    // 浏览器匹配列表，顺序很重要，请不要随意修改
    const browser: string[] = [
      'Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera',
      'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle',
      'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany',
      'XiaoMi', 'Huawei', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou',
      'LBBROWSER', '2345Explorer', '115Browser', 'TheWorld', 'Quark', 'Qiyu',
      'Wechat', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi', 'DingTalk',
    ]

    // 获取最后一个匹配的浏览器名称，返回其值
    const getLastMatch: string[] = browser.filter((el: string) => matchBrowser[el] === true).slice(-1)
    const [ browserName ]: string [] = getLastMatch

    return browserName || ''
  }

  // 获取浏览器版本
  function getVersion (ua: string, browserName: string): string {
    const matchVersion = {
      'Safari'       : () => ua.replace(/^.*Version\/([\d.]+).*$/, '$1'),
      'Chrome'       : () => ua.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1'),
      'IE'           : () => ua.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1'),
      'Edge'         : () => ua.replace(/^.*Edge\/([\d.]+).*$/, '$1').replace(/^.*Edg\/([\d.]+).*$/, '$1'),
      'Firefox'      : () => ua.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1'),
      'Firefox Focus': () => ua.replace(/^.*Focus\/([\d.]+).*$/, '$1'),
      'Chromium'     : () => ua.replace(/^.*Chromium\/([\d.]+).*$/, '$1'),
      'Opera'        : () => ua.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1'),
      'Vivaldi'      : () => ua.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1'),
      'Yandex'       : () => ua.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1'),
      'Arora'        : () => ua.replace(/^.*Arora\/([\d.]+).*$/, '$1'),
      'Lunascape'    : () => ua.replace(/^.*Lunascape[/\s]([\d.]+).*$/, '$1'),
      'QupZilla'     : () => ua.replace(/^.*QupZilla[/\s]([\d.]+).*$/, '$1'),
      'Coc Coc'      : () => ua.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1'),
      'Kindle'       : () => ua.replace(/^.*Version\/([\d.]+).*$/, '$1'),
      'Iceweasel'    : () => ua.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1'),
      'Konqueror'    : () => ua.replace(/^.*Konqueror\/([\d.]+).*$/, '$1'),
      'Iceape'       : () => ua.replace(/^.*Iceape\/([\d.]+).*$/, '$1'),
      'SeaMonkey'    : () => ua.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1'),
      'Epiphany'     : () => ua.replace(/^.*Epiphany\/([\d.]+).*$/, '$1'),
      'Maxthon'      : () => ua.replace(/^.*Maxthon\/([\d.]+).*$/, '$1'),
      'QQBrowser'    : () => ua.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1'),
      'QQ'           : () => ua.replace(/^.*QQ\/([\d.]+).*$/, '$1'),
      'Baidu'        : () => ua.replace(/^.*BIDUBrowser[\s/]([\d.]+).*$/, '$1').replace(/^.*baiduboxapp\/([\d.]+).*$/, '$1'),
      'UC'           : () => ua.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1'),
      'Sogou'        : () => ua.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1'),
      '115Browser'   : () => ua.replace(/^.*115Browser\/([\d.]+).*$/, '$1'),
      'TheWorld'     : () => ua.replace(/^.*TheWorld ([\d.]+).*$/, '$1'),
      'XiaoMi'       : () => ua.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1'),
      'Quark'        : () => ua.replace(/^.*Quark\/([\d.]+).*$/, '$1'),
      'Qiyu'         : () => ua.replace(/^.*Qiyu\/([\d.]+).*$/, '$1'),
      'Wechat'       : () => ua.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1'),
      'Taobao'       : () => ua.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1'),
      'Alipay'       : () => ua.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1'),
      'Weibo'        : () => ua.replace(/^.*weibo__([\d.]+).*$/, '$1'),
      'Douban'       : () => ua.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1'),
      'Suning'       : () => ua.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1'),
      'iQiYi'        : () => ua.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1'),
      'DingTalk'     : () => ua.replace(/^.*DingTalk\/([\d.]+).*$/, '$1'),
      'Huawei'       : () => ua.replace(/^.*Version\/([\d.]+).*$/, '$1').replace(/^.*HuaweiBrowser\/([\d.]+).*$/, '$1'),
      '360'          : () => ua.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1'),
      '360SE'        : function () {
        const hash = {
          78: '12.1',
          69: '11.1',
          63: '10.0',
          55: '9.1',
          45: '8.1',
          42: '8.0',
          31: '7.0',
          21: '6.3',
        }
        const chromeVision = ua.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return hash[chromeVision] || ''
      },
      '360EE': function () {
        const hash = {
          78: '12.0',
          69: '11.0',
          63: '9.5',
          55: '9.0',
          50: '8.7',
          30: '7.5',
        }
        const chromeVision = ua.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return hash[chromeVision] || ''
      },
      'LBBROWSER': function () {
        const hash = {
          57: '6.5',
          49: '6.0',
          46: '5.9',
          42: '5.3',
          39: '5.2',
          34: '5.0',
          29: '4.5',
          21: '4.0',
        }
        const chromeVision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return hash[chromeVision] || ''
      },
      '2345Explorer': function () {
        const hash = {
          69: '10.0',
          55: '9.9',
        }
        const chromeVision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return hash[chromeVision] || ua.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1').replace(/^.*Mb2345Browser\/([\d.]+).*$/, '$1')
      },
    }

    // 获取匹配的函数
    const getMatchFn: () => string = matchVersion[browserName]

    return getMatchFn ? getMatchFn() : ''
  }

  // 获取操作系统
  function getOsName (ua: string): string {
    const matchOS = {
      'Windows'      : !!~ua.indexOf('Windows'),
      'Linux'        : !!~ua.indexOf('Linux') || !!~ua.indexOf('X11'),
      'Mac OS'       : !!~ua.indexOf('Macintosh'),
      'Android'      : !!~ua.indexOf('Android') || !!~ua.indexOf('Adr'),
      'Ubuntu'       : !!~ua.indexOf('Ubuntu'),
      'FreeBSD'      : !!~ua.indexOf('FreeBSD'),
      'Debian'       : !!~ua.indexOf('Debian'),
      'Windows Phone': !!~ua.indexOf('IEMobile') || !!~ua.indexOf('Windows Phone'),
      'BlackBerry'   : !!~ua.indexOf('BlackBerry') || !!~ua.indexOf('RIM'),
      'MeeGo'        : !!~ua.indexOf('MeeGo'),
      'Symbian'      : !!~ua.indexOf('Symbian'),
      'iOS'          : !!~ua.indexOf('like Mac OS X'),
      'Chrome OS'    : !!~ua.indexOf('CrOS'),
      'WebOS'        : !!~ua.indexOf('hpwOS'),
    }

    // 系统匹配列表
    const osList: string[] = [
      'Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS',
    ]

    // 获取最后一个匹配的系统名称，返回其值
    const getLastMatch: string[] = osList.filter((el: string) => matchOS[el] === true).slice(-1)
    const [ osName ]: string [] = getLastMatch

    return osName || ''
  }

  // 获取操作系统版本
  function getOsVersion (ua: string, osName: string): string {
    const osVersion = {
      'Windows': function () {
        const v = ua.replace(/^Mozilla\/\d.0 \(Windows NT ([\d.]+);.*$/, '$1')
        const hash = {
          '10' : '10',
          '6.4': '10',
          '6.3': '8.1',
          '6.2': '8',
          '6.1': '7',
          '6.0': 'Vista',
          '5.2': 'XP',
          '5.1': 'XP',
          '5.0': '2000',
        }
        return hash[v] || v
      },
      'Android'      : () => ua.replace(/^.*Android ([\d.]+);.*$/, '$1'),
      'iOS'          : () => ua.replace(/^.*OS ([\d_|\d.]+) like.*$/, '$1').replace(/_/g, '.'),
      'Debian'       : () => ua.replace(/^.*Debian\/([\d.]+).*$/, '$1'),
      'Windows Phone': () => ua.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2'),
      'Mac OS'       : () => ua.replace(/^.*Mac OS X ([\d_|\d.]+).*$/, '$1').replace(/_/g, '.'),
      'WebOS'        : () => ua.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1'),
    }

    // 获取匹配的函数
    const getMatchFn: () => string = osVersion[osName]

    return getMatchFn ? getMatchFn() : ''
  }

  return {
    browser       : getBrowser(ua) || '',
    browserVersion: getVersion(ua, getBrowser(ua)) || '',
    os            : getOsName(ua) || '',
    osVersion     : getOsVersion(ua, getOsName(ua)) || '',
  }
}
