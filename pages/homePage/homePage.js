let app = getApp();

Page({
  data: {
    topUrl: '',
    classify: [],
    recommendation: [],//个性推荐商品
    unRecommendation: [],
    index: 0,
  },
  onLoad: function (e){
    //从app.js中取得公共资源

    //后端研究路由。。。

    this.setData({
      classify: app.globalData.classify,
      topUrl: app.globalData.topUrl
    })

    let i, i_len, j, j_len, p, p_len, k = 0;
    let classifyGoods_1 = [];//个性推荐商品
    let classifyGoods_2 = [];//非个性推荐商品
    let allUser = app.globalData.allUser;//所有用户
    let species = app.globalData.user.recommendation;//user偏好
    for (i = 0, i_len = allUser.length; i < i_len; i++) {//用i_len将长度存起来，有利于提高效率
      for (j = 0, j_len = allUser[i].goods.length; j < j_len; j++) {
        for(p = 0, p_len = species.length; p < p_len; p ++) {//循环user偏好
          if (allUser[i].goods[j].classify == species[p]) {//筛选出与之偏好相同的商品并添加
            classifyGoods_1[k] = allUser[i].goods[j];
            k ++;
          } else {//添加非个性推荐商品
            classifyGoods_2.push(allUser[i].goods[j])
          }
        }
      }
    }
    // console.log(classifyGoods_1);

    this.randFun(classifyGoods_1);//将数组打乱顺序
    this.randFun(classifyGoods_2);

    this.setData({
      recommendation: classifyGoods_1,
      unRecommendation: classifyGoods_2
    })
    // console.log(this.data.recommendation)

  },
  //搜索框聚焦
  inSearch: function () {
    wx.navigateTo({
      url: '/pages/homePage/search/search',
    })
  },
  //跳转classify页并且传递数据
  onClassify: function (e) {
    let title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/homePage/classify/classify?title='+title
    });
  },
  index: function (e){
    this.setData({
      index: e.detail
    });
    // console.log(this.data.index);
  },
  // openGoodsDetails: function (e) {
  //   var that = this;
  //   // console.log(that.data.index);
  //   wx.navigateTo({
  //     url: '/pages/homePage/goodsDetails/goodsDetails?index=' + that.data.index,
  //   })
  // },
  //将顺序打乱 --- 循环随机位交换法
  randFun: function (arr) {
    for(let i = 0, len = arr.length; i<len; i ++) {
      let index = parseInt(Math.random() * (len - 1));
      let tempVaule = arr[i];
      arr[i] = arr[index];
      arr[index] = tempVaule;
    }
    return arr;
  }
})