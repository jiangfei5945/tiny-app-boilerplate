var Promise = require('../vendors/es6-promise').Promise;

function request(url, data, method, options) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: method,
      success: function (res) {
        resolve(res);
      },
      fail: function (error) {
        reject(error);
      }
    });
  });
}

module.exports = {
  get: function (url, data, options) {
    return request(url, data, 'GET', options);
  },
  post: function (url, data, options) {
    return request(url, data, 'POST', options);
  },
  put: function (url, data, options) {
    return request(url, data, 'PUT', options);
  },
  delete: function (url, data, options) {
    return request(url, data, 'DELETE', options);
  },
};