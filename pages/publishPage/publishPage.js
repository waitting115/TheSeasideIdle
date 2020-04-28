
let app = getApp();

Page({
  data: {
    classify: [],
    goodsSituation: []
  },
  onLoad: function (options) {
    this.setData({
      classify: app.globalData.classify,
      goodsSituation: app.globalData.goodsSituation
    })
    // console.log(this.data.classify)
  },

  formSubmit: function (res) {
    wx.request({
      url: 'http://127.0.0.1:3000',
      method: 'POST',
      data: {
        name: 'wei'
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
      }
    })
  }
})