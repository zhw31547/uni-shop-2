<template>
	<view class="cart-container" v-if="cart.length !==0">
    <!--收货地址组件-->
    
    <my-address></my-address>
		<!--商品列表的标题区域-->
    <view class="cart-title">
      <!--左侧的图标-->
      <uni-icons type="shop" size="18"></uni-icons>
      <!--右侧的文本-->
      <text class="cart-title-text">购物车</text>
    </view>
    
    <!--循环渲染购物车中的商品信息-->
    <!--左滑删除-->
    <uni-swipe-action>  
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :options="options" @click="swipeItemClickHandler(goods)">
        <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandle"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    
    <!--使用自定义的结算组件-->
    <my-settle></my-settle>
	</view>
  
  <!--空白购物车-->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-image"></image>
    <text class="tip-text">空空如也</text>
  </view>
</template>

<script>
  import badgeMix from '@/mixin/tabbar-badge.js'
  import { mapState, mapMutations } from 'vuex'
	export default {
    mixins:[badgeMix],
    //监听购物车图标栏数量实时变化
    watch:{
        total(newVal) {
          this.setBadge()
        }
      },
    computed:{
      ...mapState('m_cart', ['cart'])
    },
		data() {
			return {		
        options:[{
          text:'删除',
          style:{
            backgroundColor:'#C00000'
          }
        }]
			};
		},
    methods:{
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
      //商品勾选状态发生了变化
      radioChangeHandler(e){
        this.updateGoodsState(e)
      },
      numberChangeHandle(e){
        this.updateGoodsCount(e)
      },
      swipeItemClickHandler(goods){
        this.removeGoodsById(goods.goods_id)
      }
    }
    
    
	}
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
  .cart-title{
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #EFEFEF;
    .cart-title-text{
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .empty-cart{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    .empty-image{
      width: 90px;
      height: 90px;
    }
    .tip-text{
      font-size: 12px;
      color: red;
      margin-top: 15px;
    }
  }

</style>
