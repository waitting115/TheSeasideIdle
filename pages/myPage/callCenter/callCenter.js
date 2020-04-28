
let app = getApp();

Page({
  data: {
    callCenter :[],
  },
  onLoad: function (options) {
    this.setData({
      callCenter: app.globalData.callCenter
    })
  },
  copyWx: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.wx,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
        // wx.getClipboardData({
        //   success: function (res) {
        //     wx.showToast({
        //       title: '复制成功',
        //     })
        //     console.log(res.data)
        //   }
        // })
      }
    })
  }
})