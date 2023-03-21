<template>
	<view class="goods-item">
	  <!--左侧的盒子-->
	  <view class="goods-item-left">
      <!--购物车商品的勾选状态-->
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>   
	    <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
	  </view>
	  <!--右侧的盒子-->
	  <view class="goods-item-right">
	    <view class="goods-name">{{goods.goods_name}}</view>
	    <view class="goods-info-box">
	      <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <!--商品数量-->
        <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
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
      },
      showRadio:{
        type:Boolean,
        //默认情况下，不会展示radio
        default:false
      },
      showNum:{
        type:Boolean,
        default:false
      }
    },
		data() {
			return {
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'  //默认图片
			};
		},
    methods:{
      //这是radio组件的点击事件处理函数
      radioClickHandler(){
        //用emit触发事件并且传递参数
        this.$emit('radio-change', {
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      numChangeHandler(val){
        this.$emit('num-change', {
          goods_id:this.goods.goods_id,
          goods_count:+val
      })
      }
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
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #F0AD4E;
    .goods-item-left{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 5px;
    .goods-pic{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
    .goods-item-right{
      display: flex;
      flex:1;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-price{
          color: #C00000;
          font-size: 16px;
         }
      }
     }
}
</style>
