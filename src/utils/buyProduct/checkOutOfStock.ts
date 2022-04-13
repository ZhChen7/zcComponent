import { GoodsInformationTypes } from '@/src/services/GoodsInformation'

/**
 * 返回商品是否无库存状态
 * @description 无库存状态的SKU：1. 会以虚线标识; 2. 无法默认选中及加购; 3. 不展示套装与保险; 4. 购买数量重置; 5. 有可能展示 MiHome 列表
 * @param goodsInfo 商品信息
 * @returns {boolean} 商品是否无库存，true 表示无库存，false 表示有库存
 */
export function checkOutOfStock (goodsInfo: GoodsInformationTypes.GoodsInformation): boolean {
  if (!goodsInfo) {
    return true // 无库存
  }

  // 大秒活动的状态
  // 普通状态(normal):   0默认，表示当前商品不是大秒商品
  // 预约抢购(bespeak):  1未到预约时间，2预约进行中，3预约结束活动开始前，4活动开始
  // 普通抢购(bespeak):  11预约结束前两小时，13预约结束活动开始前，14活动开始
  // 全款预售(preOrder): 21预售开始前两小时，23预售结束活动未开始，24活动开始
  if ([ 21, 23, 24 ].includes(goodsInfo.daMiaoStatus)) {
    return goodsInfo.isPreSaleOutOfStock // 预售使用此字段判断库存
  }

  // 非卖品不可售返回 true，无库存商品返回 true，未上架商品返回 true
  return (
    goodsInfo.isNotForSale || goodsInfo.isOutOfStock || !goodsInfo.isOnSale
  )
}
