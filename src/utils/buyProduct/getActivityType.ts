/**
 * @description 根据活动优先级获取当前活动类型（优先级：定金预售reservationBuy === 全款预售preOrderBuy > 抢购bespeakBuy > dailyPicks ）
 * @author Wu Qiutong
 * @editor Conan06
 * @export
 * @param {Array} activityList 包含定金预售和dailyPick数据 来自product/list接口
 * @param {Object} currentActivityMap 当前进行中的活动数据，从 state 中取出
 * @returns {number} activityType
 */

import { ActivityProductListTypes } from '@/src/services/ActivityProductList'

export function getActivityType (
  activityList: ActivityProductListTypes.ActivityItem[],
  currentActivityMap: any,
) {
  const activityType = {
    // 定金预售
    reservation    : 3,
    // dailyPicks
    dailyPicks     : 1,
    // 全款预售
    preOrder       : -1,
    // 抢购
    bespeak        : -2,
    // 无活动
    withOutActivity: 0,
  }

  const reservationList = activityList.filter(
    (el: ActivityProductListTypes.ActivityItem) =>
      currentActivityMap.reservationIds.includes(el.activityId), // 返回当前进行中的活动Id
  )
  const dailyPicksList = activityList.filter(
    (el: ActivityProductListTypes.ActivityItem) =>
      currentActivityMap.dailyPicksIds.includes(el.activityId), // 返回当前进行中的活动Id
  )

  const preOrderBuyList = Array.from(currentActivityMap.preOrderList || [])
  const bespeakBuyList = Array.from(currentActivityMap.bespeakList || [])

  // 定金预售
  if (reservationList.length) {
    return activityType.reservation
  }

  // 全款预售
  if (preOrderBuyList.length) {
    return activityType.preOrder
  }

  // 抢购
  if (bespeakBuyList.length) {
    return activityType.bespeak
  }

  // dailyPicks
  if (dailyPicksList.length) {
    return activityType.dailyPicks
  }

  return activityType.withOutActivity
}
