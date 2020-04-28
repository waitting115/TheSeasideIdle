// component/commodityDisplay/productDisplay.js
Component({
  //组件的属性列表：properties 
  properties:{
    recommendation: {
      type: Array,
      value: []
    },
    index: {
      type: Number,
      value: 1
    }
  },
  //私有数据，组件的初始数据
  data: {
    startTime: 0,
  },
  //组件的方法列表： methods
  methods: {
    touchstart: function (e) {
      // console.log(e);
      this.setData({
        startTime: e.timeStamp,
      })
      let index = {
        index: e.currentTarget.dataset.index
      }
      let item = {
        item: e.currentTarget.dataset.item
      }
      //将用户点击信息发送回使用组件的地方
      this.triggerEvent("index", index);
      this.triggerEvent("item", item)
    },
    touchend: function (e) {
      // console.log('yes');
      let endTime = e.timeStamp;
      let startTime = this.data.startTime;
      //计算用户触摸时间是否超过一秒，用来判断用户是长按还是点击
      if(endTime - startTime < 1000) {//点击
        var item = JSON.stringify(e.currentTarget.dataset.item);//obj-->json
        wx.navigateTo({
          url: '/pages/homePage/goodsDetails/goodsDetails?item=' + item
        })
      }
    },
    // },
    // openGoodsDetails: function (e) {
    //   // console.log(e.currentTarget.dataset.item);
    //   var item = JSON.stringify(e.currentTarget.dataset.item);//obj-->json
    //   wx.navigateTo({
    //     url: '/pages/homePage/goodsDetails/goodsDetails?item=' + item
    //   })
    // },
    // bindtouchstart: function (e) {
    //   let index = {
    //     index : e.currentTarget.dataset.index
    //   }
    //   // console.log(index);
    //   this.triggerEvent("index",index);
    // }
  }
})