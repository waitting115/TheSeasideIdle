
const app = getApp();

Page({
  data: {
    recommendation: [],//我发布的所有商品
    index: 0,//用户点击元素的下标
    startTime: 0,
    intervalTime: null,
    item: {}

  },
  onLoad: function (options) {
    this.setData({
      recommendation : app.globalData.user.goods
    })
    // console.log(this.data.recommendation)
  },
  onShow: function () {
    this.onLoad();
    // console.log('onshow')
  },
  //获得点击的元素位置下标
  getIndex: function (e) {
    // console.log('1')
    this.setData({
      index: e.detail.index
    })
    // console.log(this.data.index)
  },
  //获得点击的元素详情
  getItem: function (e) {
    // console.log('2')
    this.setData({
      item: e.detail.item
    })
  },
  touchstart: function (e) {
    // console.log(e);
    this.setData({
      startTime: e.timeStamp,
      intervalTime: null
    })
    let that = this;
    let timeout = setTimeout(function () {//这里用一个定时器，一秒后检测触摸时间是否存在，如果不存在，则证明用户并没有松手，然后就调用操作菜单，如果存在触摸时间，则证明用户只是点击进去了，并不需要调用操作菜单，然后便于用户第二次长按，需要在点击开始的时候将触摸事件再次变为null
      if (that.data.intervalTime == null) {
        wx.showActionSheet({
          itemList: ['编辑商品', '下架商品'],
          itemColor: '#f44',
          success(res) {
            let tapIndex = res.tapIndex;
            //下面两个变量用于下架商品
            let recommendation = that.data.recommendation;
            let index = that.data.index;

            if(tapIndex == 0) {
              wx.showModal({
                title: '温馨提示',
                content: '编辑商品后商品会暂时下架等待进一步审核哦！',
                success(res) {
                  if (res.confirm) {
                    let item = that.data.item;
                    // console.log(item);

                    let defaultValue = JSON.stringify(item);
                    // console.log(defaultValue);
                    // let index 
                    // console.log(index)

                    wx.navigateTo({
                      url: '/pages/myPage/editCommodity/editCommodity?defaultValue=' + defaultValue + '&index=' + index,//&
                      success(res) {
                        console.log("success");
                      },
                      fail(res) {
                        console.log(res)
                      }
                    })
                    //将商品下架（不应该放在这里，有bug，应该在下一页改数据，然后返回的时候重新加载）
                    // console.log(index)
                    // recommendation.splice(index, 1);
                    // that.setData({
                    //   recommendation: recommendation
                    // })//这里也只是做了效果的处理，数据处理有待完善
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            } else if(tapIndex == 1) {
             
              // console.log(recommendation);
              // console.log(that.data.index)
              wx.showModal({
                title: '提示',
                content: '您确定下架该商品吗？',
                success(res) {
                  if (res.confirm) {
                    recommendation.splice(index,1);
                    that.setData({
                      recommendation: recommendation
                    })//这里也只是做了效果的处理，数据处理有待完善
                  }
                }
              })
            }
          },
          fail(res) {
            console.log(res.errMsg)
          }
        })
      }
    },1000)
  },
  touchend: function (e) {
    let intervalTime = this.data.startTime - e.timeStamp;
    this.setData({
      intervalTime: intervalTime
    })
  }
})