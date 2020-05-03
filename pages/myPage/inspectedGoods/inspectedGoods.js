
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
          // console.log(JSON.parse(that.options.item).goodsID)
          let goodsID = JSON.parse(that.options.item).goodsID;
          console.log('goodsID',goodsID);
          let alluser = app.globalData.allUser;
          out: for(let i of alluser) {
            for(let j of i.goods) {
              if(j.goodsID === goodsID) {
                j.state = 'UP';
                break out;
              }
            }
          }
          //最后返回上一页
          wx.navigateBack({
            delta: 1,
          })
          console.log('a')
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
          let goodsID = JSON.parse(that.options.item).goodsID;
          let alluser = app.globalData.allUser;
          out: for(let i of alluser) {
            for(let j of i.goods) {
              if(j.goodsID === goodsID) {
                j.state = 'NO';
                console.log(j)
                break out;
              }
            }
          }

          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  }
})