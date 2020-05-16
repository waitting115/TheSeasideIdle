
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
    //所有上架的商品
    let allGoods = app.globalData.user.goods.filter((item) => {
      if(item.state === 'OUT') {
        return false;
      };
      return true;
    })
    this.setData({
      recommendation : allGoods
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
                    //将商品下架
                    recommendation[index].state = 'OUT';
                    // console.log(app.globalData.allUser[0].goods[index]);
                    app.globalData.allUser[0].goods[index].state = 'OUT';
                    // console.log(recommendation[index])
                    that.onShow();
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
                    // 更改商品状态才是正确的选择！
                    recommendation[index].state = 'OUT';
                    app.globalData.allUser[0].goods[index].state = 'OUT';
                    // console.log(recommendation[index])
                    that.onShow();
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