Page({
  onTap: function (event) {
    // wx.navigateTo({
    //   "url": "../posts/post"
    // })
    // wx.redirectTo({
    //   "url": "../posts/post"
    // })
    //如果要跳转到一个带tab选项卡的页面，必须使用wx.switchTab这个新增方法。
    wx.switchTab({
      url: "../posts/post"
    });
  }
})