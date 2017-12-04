var postsData = require('../../../data/posts-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var postData = postsData.postList[postId];
    //如歌在onLoad方法中，不是异步的去执行一个数据绑定，
    //则不需要使用this.setDate方法
    //只需要对this.data赋值即可实现数据绑定
    // this.data.postData = postData;
    this.setData({postData: postData});

    // wx.setStorageSync('string', '风暴英雄');//设置缓存
     //修改缓存
    wx.setStorageSync('key', {
      game: '风暴英雄',
      developer: '暴雪'
    })
  },

  onCollectionTap: function(event){
    var game = wx.getStorageSync('key');
    console.log(game);
  },

  onShareTap: function(event) {
    console.log('111');
    //缓存的上限最大不能超过10MB
    //清除缓存
    // wx.removeStorageSync('key');
    //清除所有缓存
    wx.clearStorageSync();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})