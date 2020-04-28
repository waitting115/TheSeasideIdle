
let app = getApp();

// component/commodityDisplay/productDisplay.js
Component({
  //组件的属性列表：properties 
  properties: {
    classify: {
      type: Array,
      value : []
    },
    defaultValue: {
      type: Object,
      value: {}
    },
    goodsSituation: {
      type: Array,
      value: []
    },
    index: {
      type: Number,
      value: 0
    }
  },
  //组件数据初始化（如果是从编辑商品处来的，则将过来的图片地址数组复制到publishImg中）
  ready: function () {//生命周期：在组件在视图层布局完成后执行
    // console.log(this.properties.index);
    // console.log(this.data.publishImg)
    if(this.properties.defaultValue) {
      this.setData({
        publishImg: this.properties.defaultValue.picture
      })
    }
  },
  //私有数据，组件的初始数据
  data: {
    classify: [],
    publishImg: [],
    classifyItem: '',
    goodsSituationItem: ''
  },
  //组件的方法列表： methods
  methods: {
    deleteImg: function (e) {
      let index = e.currentTarget.dataset.index;
      let imgArr = this.data.publishImg;
      let that = this;
      wx.showModal({
        title: '温馨提示',
        content: '您确定删除此照片吗？',
        success (res) {
          if(res.confirm) {
            that.data.publishImg.splice(index, 1);
            let publishImg = that.data.publishImg;
            // console.log(publishImg);

            that.setData({
              publishImg: publishImg
            })
          }
        }
      })
    },
    choosePic: function (e) {
            //从手机相册选择图片
            wx.chooseImage({
              count: 4,
              success: res => {
                //判断用户选择的图片是否超过四张
                let len = this.data.publishImg.length + res.tempFilePaths.length;
                if(len > 4) {
                  wx.showToast({
                    title: '保留前四张图片'
                  });
                }
                this.data.publishImg = this.data.publishImg.concat(res.tempFilePaths).slice(0,4);//concat不会改变原数组，只会返回一个连接后的副本！
                var publishImg = this.data.publishImg;
                this.setData({
                  publishImg: publishImg
                })
              },
            })
    },
    //将两个单选框用户信息写入
    radio1Change: function (e) {
      this.setData({
        classifyItem: e.detail.value
      })
    },
    radio2Change: function (e) {
      this.setData({
        goodsSituationItem: e.detail.value
      })
    },
    formSubmit: function (e) {
      //首先检验表单
      let that = this;
      let formData = e.detail.value;//获取表单所有input的值
      // console.log(formData instanceof Object);
      formData.classify = this.data.classifyItem;
      // console.log(!!this.properties.defaultValue)
      formData.goodsSituation = this.data.goodsSituationItem;
      formData.goodsUrl = this.data.publishImg;
      //有两个属性在编辑商品中进来的时候抓取不到，所以这里加工一下
      // 思路：如果在发布页进来提交，不用这段代码，如果在编辑页进来提交，用这段代码
      if(!!this.properties.defaultValue){//用来判断是从哪个页面进来的
        !formData.classify ? formData.classify = this.properties.defaultValue.classify : formData.classify = formData.classify;
        !formData.goodsSituation ? formData.goodsSituation = this.properties.defaultValue.goodsSituation : formData.goodsSituation = formData.goodsSituation;
      }
      

      let bol = true;//用来确定用户是否将信息填全
      for(var item in formData) {
        // console.log(formData[item]);
        if(!formData[item]) {
          wx.showModal({
            title: '温馨提示',
            content: '是不是有信息漏掉了呢，赶快回去查验一下把~',
          })
          bol = false;
          break;
        }
      }
      if(bol) {
        //将formData转换为json
        formData = JSON.stringify(formData);
        let that = this;
        wx.showModal({
          title: '温馨提示',
          content: '您的商品信息即将上传，管理员审核通过后会第一时间通知您并上架您的商品',
          success(res) {
            //这里要测试是否存在上一页，如果存在就返回，不存在就不返回
            if (that.properties.defaultValue != null) {
              wx.navigateBack({
                delta: 1
              })
              //并且将编辑的商品下架

              app.globalData.user.goods.splice(that.properties.index,1)
                    // recommendation.splice(index, 1);
                    // that.setData({
                    //   recommendation: recommendation
                    // })//这里也只是做了效果的处理，数据处理有待完善
            }
            // console.log(this.properties.defaultValue);
            //文件上传
            wx.uploadFile({
              url: '',
              filePath: formData.goodsUrl,
              name: '',
              success: function (res) {
                console.log(res);
              },
              fail: function (res) {
                console.log(res);
              }
            })
            // 表单上传
            wx.request({
              url: '',
              data: formData,
              header: {"Content-Type": "application/json"},
              success: res=> {
                console.log(res);
              },
              fail: res=>{
                console.log(res);
              }
            })
            
          }
        })
      }
      
    }
  },
})