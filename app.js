//app.js
App({
  //设置全局对象
  globalData: {
    g_isPlayingMusic: false, //音乐是否正在播放
    g_currentMusicPostId: null, //哪一个音乐正在播放
    doubanBase: 'http://t.yushu.im', // 调用接口里的 https://api.douban.com 更换为 http://t.yushu.im，注意是http，不是https！
  }
})
