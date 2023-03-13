<template>
	<view>
		<view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!--搜索界面列表项-->
    <view class="sugg-list" v-if="searchReasults.length !==0">
      <view class="sugg-item" v-for="(item, i) in searchReasults" :key="i" @click="gotoDetail(item)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
       </view>
    </view>
    <!--搜索历史-->
    <view class="history-box" v-else>
      <!--标题区-->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <!--列表区-->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        timer:null,
        kw:'' ,//搜索关键词
        //搜索结果列表
        searchReasults:[],
        historyList:[]
				
			};
		},
    onLoad(){
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods:{
      
      input(e){
        //防抖处理
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e.value
          this.getSearchList()
        }, 500)
      },
      async getSearchList(){
        //判断搜索关键词是否为空
        if(this.kw.length === 0){
          this.searchReasults = []
          return
        }
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.kw})
        if(res.meta.status !== 200) return uni.$showMsg()
        this.searchReasults = res.message
        
        this.saveSearchHistory()
      },
      gotoDetail(item){
        console.log(item.goods_id)
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchHistory(){
        //this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)     
         this.historyList = Array.from(set)
         //调用uni函数将搜索历史记录持久保存到本地
         uni.setStorageSync('kw', JSON.stringify(this.historyList))
    },
      clean(){
        this.historyList = []
        uni.setStorageSync('kw', '[]')
      },
      gotoGoodsList(kw){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
   computed:{
      histories(){
        return [...this.historyList].reverse()    //反转历史排名
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top:0;
  z-index: 999;
}
.sugg-list{
  padding: 0 5px;  //环绕效果，上下是0，左右是5
  .sugg-item{
    display: flex;
    align-items: center;//纵向居中对齐
    justify-content: space-between; //横向两端贴边对齐
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #FFA200;
    .goods-name{
      white-space: nowrap;  //不换行
      overflow: hidden;    //超出部分隐藏
      text-overflow: ellipsis;   //用小圆点隐藏
    }
  }
}
.history-box{
  padding: 0 5px;
  .history-title{
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #007AFF;
  }
  .history-list{
    display: flex;
    flex-wrap: wrap;
    .uni-tag{
      margin-top: 5px;
      margin-right: 5px;
    }
    
  }
}
</style>
