var Promise = require('../../vendors/es6-promise').Promise;
var request = require('../../utils/request');
//index.js
//获取应用实例
var app = getApp();
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
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    var newsList = [],
        topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
        storyDetailUrl = 'https://hacker-news.firebaseio.com/v0/item/{newsId}.json?print=pretty';

    request.get(topStoriesUrl).then(function (res) {
      if (res.data && res.data.length) {
        var allPromises = res.data.slice(0, 9).map(function(newsId){
          return request.get(storyDetailUrl.replace('{newsId}',newsId));
        });

        Promise.all(allPromises).then(function (data) {
          that.setData({
            newsList: data.map(function (item) {
              return item.data;
            })
          });
        });

      }
    });
  }
})
