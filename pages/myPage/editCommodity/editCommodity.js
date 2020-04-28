
let app = getApp();

Page({
  data: {
    defaultValue: {},
    classify: [],
    goodsSituation: [],
    index: 0//当前选中商品的下标
  },

  onLoad: function (options) {
    // console.log(options.index);
    let index2 = options.index;
    let defaultValue = JSON.parse(options.defaultValue);
    // console.log(defaultValue);
    // console.log(defaultValue)
    defaultValue.price = defaultValue.price.split("￥").join("");//把￥去掉
    //把宝贝类别设置一下
    let classify = app.globalData.classify;
    let thisclassify = defaultValue.classify;
    for(let i=0,len=classify.length; i<len; i++) {
      if(classify[i].title == thisclassify) {
        for(let j=0,len=classify.length; j<len; j++) {
          classify[j].checked = false;
        }
        classify[i].checked = true;
        break;
      }
    }
    //把新旧程度设置一下
    let goodsSituation = app.globalData.goodsSituation;
    let thisSituation = defaultValue.goodsSituation;
    for(let i=0,len=goodsSituation.length; i<len; i++) {
      if (goodsSituation[i].title == thisSituation) {
        for(let j=0,len=goodsSituation.length; j<len; j++) {
          goodsSituation[j].checked = false;
        }
        goodsSituation[i].checked = true;
        break;
      }
    }
    let index = classify.indexOf(thisclassify);
    // console.log(index)
    this.setData({
      defaultValue: defaultValue,
      classify: classify,
      goodsSituation: goodsSituation,
      index: index2
    })
  },
})