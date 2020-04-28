
const app = getApp();

Page({
  data: {
    topSearch : [],
    searchHistory: [],
    nowTopSearch: '',
    searchLenovo: [],
    lenovoBol: false,
    allGoodsTitle: []
  },
  onLoad: function (options) {
    
    this.setData({
      topSearch : app.globalData.topSearch,
      searchHistory : app.globalData.user.searchHistory,
      allGoodsTitle : app.globalData.allGoodsTitle
    })
  },
  /* 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {
    
  },
  /* 生命周期函数--监听页面显示*/
  onShow: function () {
    let topSearch = this.data.topSearch;
    let that = this;
    //使显示界面的时候就执行一次
    set();
    let time = setInterval(() => {
      set();
    }, 3000);

    function set() {
      let num = Math.floor(Math.random() * topSearch.length);
      that.setData({
        nowTopSearch: topSearch[num]
      });
    };
  },
  /*生命周期函数--监听页面卸载*/
  onUnload: function () {

  },
})