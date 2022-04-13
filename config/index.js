const variable = require('./variable')

// 发npm包时不同环境对应的不同路径
const distPathMap = {
  test: 'test',
  pre: 'preonline',
  pro: 'release'
}

module.exports = {
  dev: {
    host: '127.0.0.1',
    port: '3000',
    entryList: variable.localList,
  },
  prod: {
    host: 'auto',
    // host: variable.isSsrMode ? '${obj.resourceJsUrl}/' : variable.siteHost,
  },
  build: {
    environment: variable.environment,
    assetsRoot: `assets`,
    distPath: variable.isSsrMode ? `./lib/dist/${distPathMap[variable.environment]}` : `./dist`,
    distManifestPath: variable.isSsrMode ? `./lib/dist/${distPathMap[variable.environment]}/pwa` : variable.isPwaMode ? `./dist` : `./dist/pwa`,
    externalData,
    pwaManifest,
    fileHost: variable.isPwaMode ? variable.siteHost : variable.isSsrMode ? '${obj.resourceJsUrl}' : '',
    pwaBaseUrl: variable.siteHost,
    packageVersion: variable.packageVersion,
    isAnalyzer: variable.isAnalyzer,
    isSsrMode: variable.isSsrMode,
    isPwaMode: variable.isPwaMode,
    isDevelopment: variable.isDevelopment,
  }
}
