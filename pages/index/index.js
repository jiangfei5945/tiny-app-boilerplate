//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    newsList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
      console.log(that.data);
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    var newsList = [];
    wx.request({
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
      success: function (res) {
        if (res.data && res.data.length) {
          res.data.slice(0, 9).forEach(function (newsId) {
            wx.request({
              url: 'https://hacker-news.firebaseio.com/v0/item/' + newsId + '.json?print=pretty',
              success: function (res) {
                if (res.data) {
                  newsList.push(res.data);
                  that.setData({newsList:newsList});
                }
              }
            });
          });
        }
      }
    });
  }
})
