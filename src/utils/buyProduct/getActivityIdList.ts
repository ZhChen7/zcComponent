/**
 * @description 获得参与活动的 goodsId 数组
 *
 * @author Wu Qiutong
 * @export
 * @param {Array} activityList 包含定金预售和dailyPick数据 来自product/list接口
 * @param {string} activityName 活动名称
 */

import { ActivityProductListTypes } from '@/src/services/ActivityProductList'

export function getActivityIdList (activityList: any, activityName: string) {
  return activityList
    .filter((item: ActivityProductListTypes.ActivityItem) => item.activityName === activityName)
    .map((item: ActivityProductListTypes.ActivityItem) => item.goodsId)
}

export function getActivityById (activityList: any, goodsId: number): Partial<ActivityProductListTypes.ActivityItem> {
  return activityList
    .find((item: ActivityProductListTypes.ActivityItem) => item.goodsId === goodsId)
}
