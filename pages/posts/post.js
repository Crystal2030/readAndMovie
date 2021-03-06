var postsData = require('../../data/posts-data.js');//必须用相对路径

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们成为动作A
    //儿这个动作A的执行，是在onload事件执行之后发生后
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(postsData.postList);
    // this.data.postList = postsData.postList;
    this.setData({ posts_key: postsData.postList});
  },

  onPostTap: function(event) {
    // event.currentTarget当前点击组件
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  onSwiperTap: function(event) {
    //target指的是当前点击的组件
    //currentTarget指的是事件捕获的组件
    //target这里值得是image，而currentTarget值得是swiper
    var postId = event.target.dataset.postid;
    console.log(postId); 
  }

})