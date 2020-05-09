let app = getApp();
// pages/homePage/searchedPage/searchedPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendation: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 通过msg模糊查询数据库，然后显示商品
    // console.log(options.msg)
    let allUser = app.globalData.allUser;
    let msgReg = new RegExp('.*' + options.msg + '.*', 'i');
    let allGoods = [];
    for(let i of allUser) {
      for(let j of i.goods) {
        if(j.goodsTitle.match(msgReg) !== null || j.classify.match(msgReg) !== null || j.userName.match(msgReg) !== null || j.introduceText.match(msgReg) !== null) {
          allGoods.push(j);
        }
      }
    }
    // console.log(allGoods);
    this.setData({
      recommendation: allGoods
    })
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