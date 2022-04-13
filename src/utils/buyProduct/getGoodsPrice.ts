/**
 * @author Conan06
 * @description 结合商品接口与活动接口，获取展示金额
 * @param {string[]} goodsPriceSet [ 商品接口最低售价, 商品接口最低原价 ]
 * @param {string} activityList 需要遍历的活动列表
 * @param {object} activityMap 当前进行中的活动列表，存储于state当中
 * @param {boolean} isEnableReservation 是否结合订金预售的金额展示
 * @returns {[string, string, number]} [ 最低售价, 最低原价, 活动类型 ]
 */

import { getActivityType } from './'

import { ActivityProductListTypes } from '@/src/services/ActivityProductList'

export function getGoodsPrice (
  goodsPriceSet: [string, string],
  activityList: ActivityProductListTypes.ActivityItem[],
  activityMap: any,
  isEnableReservation: boolean,
): [string, string, number] {
  // 商品金额与原价
  let [ goodsPrice, goodsMarketPrice ] = goodsPriceSet
  const currentActivityType = getActivityType(activityList, activityMap)

  // 找出会临时改变展示金额的活动（排序逻辑）
  // 当前进行中的订金预售(Reservation)
  const reservationItems: ActivityProductListTypes.ActivityItem[] =
    currentActivityType === 3
      ? activityList
        .filter((item: ActivityProductListTypes.ActivityItem) =>
          activityMap.reservationIds.includes(item.activityId),
        )
        .sort(
          (a: ActivityProductListTypes.ActivityItem, b: ActivityProductListTypes.ActivityItem) =>
            Number(a.reservationInfo.aPrice) -
              Number(b.reservationInfo.aPrice),
        ) // 按照最低金额从小到大排序
      : []

  // 当前进行中的每日优惠(DailyPicks)
  const dailyPicksItems: ActivityProductListTypes.ActivityItem[] =
    currentActivityType === 1
      ? activityList
        .filter((item: ActivityProductListTypes.ActivityItem) =>
          activityMap.dailyPicksIds.includes(item.activityId),
        )
        .sort((a: ActivityProductListTypes.ActivityItem, b: ActivityProductListTypes.ActivityItem) => a.price - b.price) // 按照最低金额从小到大排序
      : []

  const [ reservationItem ] = reservationItems // 取出第一个订金预售（金额最低）
  const [ dailyPicksItem ] = dailyPicksItems // 取出第一个 DailyPick（金额最低）

  // 活动价格覆盖自身展示价格
  if (!!reservationItem && isEnableReservation) {
    const [ activityPrice, activityMarketPrice ] = [
      reservationItem.reservationInfo.aPrice,
      reservationItem.reservationInfo.aPrice,
    ]

    goodsPrice = String(activityPrice)
    goodsMarketPrice = String(activityMarketPrice)
  } else if (dailyPicksItem) {
    const [ activityPrice, activityMarketPrice ] = [
      dailyPicksItem.price,
      dailyPicksItem.marketPrice,
    ]

    goodsPrice = String(activityPrice)
    goodsMarketPrice = String(activityMarketPrice)
  }

  return [ goodsPrice, goodsMarketPrice, currentActivityType ]
}
