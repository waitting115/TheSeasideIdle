
let app = getApp();

Page({
  data: {
    title: "",
    // classifyGooods: [],
    recommendation: []
  },
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      title:options.title
    })
    //将所有数据从app.js中导过来，过滤后使用
    let i, j, k = 0;
    let classifyGoods_1 = [];
    let allUser = app.globalData.allUser;
    for( i = 0; i < allUser.length; i ++ ) {
      for( j = 0; j < allUser[i].goods.length; j++) {
        if(allUser[i].goods[j].classify == this.data.title){
          classifyGoods_1[k] = allUser[i].goods[j];
          // classifyGoods_1[k].userName = allUser[i].userName;
          // classifyGoods_1[k].headPortraitUrl = allUser[i].headPortraitUrl;
          // classifyGoods_1[k].openID = allUser[i].openID;
          k++;
        }
      }
    }
    // console.log(classifyGoods_1);
    this.setData({
      recommendation: classifyGoods_1
    })
    // console.log(this.data.recommendation)
  }
})