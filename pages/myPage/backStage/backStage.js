import * as echarts from '../../../component/ec-canvas/echarts'
// 有*as的导入会将多个export导出的内容组合成一个对象返回，而没有*as的只会导出这个默认对象作为一个对象

let chart = null;//建立一个全局变量，放在page外面，不然在页面加载之后再动态修改图表数据的话，没法修改，这样方便点

let app = getApp();

//总体登录日表
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
        text: "用户登录变化表",
        left: 'left'
    },
    //直角坐标系内绘制网格
    grid: {
      containLabel: true//坐标轴刻度标签
    },
    //x轴
    xAxis: {
      // type: 'time',
      type: 'category',
      data: ['9.23','9.24','9.25','9.26','9.27','9.28','9.29'],
      nameRotate: null,//坐标轴名字旋转角度值
      splitNumber: 7,//分割段数
      silent: false
    },
    yAxis: {
      type: 'value',
      splitNumber: 5,
      splitLine: {
        lineStyle: {
          type: 'dashed'//分割线类型
        }
      }
    },
    // toolbox: {
    //   feature: {
    //     // dataZoom: {
    //     //   yAxisIndex: 'none'
    //     // },
    //     magicType: {//动态类型切换
    //       type: ['line','bar'],
    //       title: ['line','bar'],
    //       // seriesIndex: ['bar']
    //     }
    //   }
    // },
    series: [
      {
        name: '人数',
        type: 'line',
        smooth: true,
        data: [12,23,22,54,14,11,25]
      },
    ]
  };

  chart.setOption(option);
  return chart;
};

//商品类别分布表
function initChart2(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: "商品类别分布表",
      left: 'left'
    },

    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: [
        {
          name: '考研资料',
          max: 50
        },
        {
          name: '电脑硬件',
          max: 50
        },
        {
          name: '图书',
          max: 50
        },
        {
          name: '生活百货',
          max: 50
        },
        {
          name: '服装鞋帽',
          max: 50
        },
        {
          name: '手机硬件',
          max: 50
        },
        {
          name: '健身器材',
          max: 50
        },
        {
          name: '球类运动',
          max: 50
        },
        {
          name: '美妆美品',
          max: 50
        },
        {
          name: '游戏交易',
          max: 50
        },
        {
          name: '租好物',
          max: 50
        },
        {
          name: '其他',
          max: 50
        },
      ]
    },
    series: [{
      name: '商品类别分布',
      type: 'radar',
      data: [{
        value: [34,36,27,18,45,34,22,26,44,16,41,25],
        name: '类别'
      }]
    }]
  };

  chart.setOption(option);
  return chart;
};

Page({
  data: {
    ec: {
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    },
    registeredNum: 0,
    productsShelvesNum: 0,
    removedShelvesNum: 0,
    // inspectedGoods: []
  },
  onLoad: function (options) {
    //计算状态为AUDIT的商品，预计在后端写
    this.setData({
      registeredNum: app.globalData.registeredNum,
      productsShelvesNum: app.globalData.productsShelvesNum,
      removedShelvesNum: app.globalData.removedShelvesNum,
      // inspectedGoods: app.globalData.inspectedGoods
    })
    // console.log(this.data.inspectedGoods)
  },
  //页面加载就触发
  onShow: function () {
    this.onLoad();
  },
  checkImgTap: function (res) {
    // console.log(res.currentTarget.dataset.item)
    let item = JSON.stringify(res.currentTarget.dataset.item);
    wx.navigateTo({
      url: '/pages/myPage/inspectedGoods/inspectedGoods?item=' + item,
    })
  }
})