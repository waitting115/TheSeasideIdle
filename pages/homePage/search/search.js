
const app = getApp();

Page({
  data: {
    topSearch : [],
    searchHistory: [],
    nowTopSearch: '',
    searchLenovo: [],
    lenovoBol: false,
    allGoodsTitle: [],
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
  delete: function () {
    let that = this;
    wx.showModal({
			title: '提示',
			content: '您确定删除所有历史搜索吗？',
			success: function(res) {
				if (res.confirm) {
        // console.log('用户点击确定')
        app.globalData.user.searchHistory = [];
        that.onLoad();
        console.log(that.searchHistory)
				} else if (res.cancel) {
				console.log('用户点击取消')
				}
			}
		})
  },
  // 提交
  formSubmit: function (e) {
    let msg = e.detail.value.searchInput;
    if(msg === '') {
      msg = e.detail.target.dataset.msg
    }
    this.startSearch(msg);
  },
  // 选择历史搜索或今日热搜
  check: function (e) {
    this.startSearch(e.currentTarget.dataset.text)
  },

  // 开始搜索并跳转
  startSearch: function (msg) {
    // console.log(msg);
    wx.navigateTo({
      url: '/pages/homePage/searchedPage/searchedPage?msg='+msg
    });
  },
  //回车搜索
  enterSearch: function (e){
    let msg = e.detail.value;
    console.log(e.de)
    if(msg === undefined) {
      msg = e.target.dataset.msg
    }
    this.startSearch(msg);
  },
  /*生命周期函数--监听页面卸载*/
  onUnload: function () {

  },
})