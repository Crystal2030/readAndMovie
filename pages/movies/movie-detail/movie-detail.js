// pages/movies/movie-detail/movie-detail.js
import {Movie} from 'class/Movie.js';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movie: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var movieId = options.id;
        console.log(app);
        var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
        var movie = new Movie(url);
        movie.getMovieData(this.getData);
        // util.http(url, this.processDoubanData);
    },
    getData: function(data) {
        this.setData({
            movie: data
        })
    },
    viewMoviePostImg: function(e) {
        var src = e.currentTarget.dataset.src;
        wx.previewImage({
            current: src, //当前显示图片的http链接
            urls: [src] // 需要预览的图片http链接列表
        })
    }
})