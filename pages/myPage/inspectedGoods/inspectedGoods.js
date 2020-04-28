
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.item)
    let item = JSON.parse(options.item);
    this.setData({
      item: item
    })
  },
  primary: function (res) {
    let that = this;
    // console.log(res.currentTarget.dataset.item)
    wx.showModal({
      title: '帅哥你确定通过此商品？',
      content: '',
      success(res) {
        if(res.confirm) {
          wx.showToast({
            title: '您真是慧眼识珠！',
          })
          //此处向后端发送通过的商品

          //然后将此商品从待审核商品中删除
            //这里解释一下为什么不直接indexOf比较找到位置然后删除，因为inspectedGoods是对象数组，that.data.item也是个对象，虽然两对象内容一模一样，但是两对象不是相同的存储空间，所以二者并不相等。我的做法是在inspectedGoods中找到那个对象，然后返回出来，再用indexOf来找到那个对象的位置，然后删除
          let item = that.data.item;
          let itema = app.globalData.inspectedGoods.find( function (ele) {
            // console.log(ele.userName)
            // console.log(that.data.item.userName)

            if(ele.userName == item.userName && ele.goodsTitle == item.goodsTitle && ele.introduceText == item.introduceText && ele.openID == item.openID) {
              //找到了
              return ele;
            }
          });
          // console.log(itema == app.globalData.inspectedGoods[0]);
          let itemIndex = app.globalData.inspectedGoods.indexOf(itema);
          app.globalData.inspectedGoods.splice(itemIndex,1);
          console.log(app.globalData.inspectedGoods)
          //最后返回上一页
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: '手滑了手滑了',
          })
        }
      }
    })
  },
  warn: function (res) {
    let that = this;
    // console.log(res.currentTarget.dataset.item)
    wx.showModal({
      title: '帅哥你确定遣回此商品？',
      content: '',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '收到！',
          })
          //此处向后端发送遣回的商品
          //然后将此商品从待审核商品中删除
          //最后返回上一页
          let item = that.data.item;
          let itema = app.globalData.inspectedGoods.find(function (ele) {
            // console.log(ele.userName)
            // console.log(that.data.item.userName)

            if (ele.userName == item.userName && ele.goodsTitle == item.goodsTitle && ele.introduceText == item.introduceText && ele.openID == item.openID) {
              //找到了
              return ele;
            }
          });
          // console.log(itema == app.globalData.inspectedGoods[0]);
          let itemIndex = app.globalData.inspectedGoods.indexOf(itema);
          app.globalData.inspectedGoods.splice(itemIndex, 1);
          console.log(app.globalData.inspectedGoods)
          //最后返回上一页
          wx.navigateBack({
            delta: 1,
          })
        } else {
          wx.showToast({
            title: '手滑了手滑了',
          })
        }
      }
    })
  }
})