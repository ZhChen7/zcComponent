/**
   * 添加图片尺寸压缩参数
   * @param imgUrl 图片路径 //i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1532428203.40173612.png
   * @param resize 压缩尺寸 600x600
   * @returns //i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1532428203.40173612!600x600.png
   */
export function imageResize (imgUrl: string, resize: string): string {
  if (resize) {
    return imgUrl.replace(/(.*)\.(\w+)/, `$1!${resize}.$2`)
  } else {
    return imgUrl
  }
}