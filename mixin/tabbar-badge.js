import {mapGetters} from 'vuex'

export default{
  
  computed:{
    ...mapGetters('m_cart', ['total'])
  },
  watch:{
    total(){
      this.setBadge()
    }
  },
  onShow(){
    this.setBadge()
  },
  methods:{
    setBadge(){
      uni.setTabBarBadge({
        index:2,  //索引序号表示购物车图标
        text:this.total + ''   //注意：text 的值必须是字符串，不能是数字
      })
    }   
    }
}