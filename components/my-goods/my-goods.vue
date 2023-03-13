<template>
	<view class="goods-item">
	  <!--左侧的盒子-->
	  <view class="goods-item-left">
	    <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
	  </view>
	  <!--右侧的盒子-->
	  <view class="goods-item-right">
	    <view class="goods-name">{{goods.goods_name}}</view>
	    <view class="goods-info-box">
	      <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
    //用来外界接收外界传递到当前组件的数据
    props:{
      //商品的信息对象
      goods:{
        type:Object,
        default:{}
      }
    },
		data() {
			return {
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'  //默认图片
			};
		},
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)   //处理成带两位小数的价格
      }
    }
	}
</script>

<style lang="scss">
.goods-item{
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #F0AD4E;
    .goods-item-left{
    margin-right: 5px;
    .goods-pic{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
    .goods-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        .goods-price{
          color: #C00000;
          font-size: 16px;
         }
      }
     }
}
</style>
