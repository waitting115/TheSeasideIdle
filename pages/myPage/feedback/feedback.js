let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  formSubmit: function (e) {
    // console.log(e);
    if(e.detail.value.textarea === '') {
      wx.showModal({
        title: '请填写信息！',
      })
      return;
    }
    wx.showToast({
      title: '反馈成功！',
    })
    app.globalData.feedbackMsg.push(e.detail.value.textarea);
    //返回上一页
    setTimeout(function () {
      wx.navigateBack({
        delta: 1,
      })
    },1000)
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})