// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigateTitle: "",
        movies: {},
        requestUrl: '',
        totalCount: 0,
        isEmpty: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var category = options.category;
        var globalData = app.globalData.doubanBase;
        this.data.navigateTitle = category;
        // console.log(category);
        var dataUrl = "";
        switch (category) {
            case "正在热映":
                dataUrl = globalData + '/v2/movie/in_theaters';
                break;
            case "即将上映":
                dataUrl = globalData + '/v2/movie/coming_soon';
                break;
                dataUrl = globalData + '/v2/movie/top250';
            case "豆瓣Top250":
                break;
        }
        this.data.requestUrl = dataUrl;
        util.http(dataUrl, this.processDoubanData);
    },
    // onScrollLower: function(event) {
    //     console.log('加载更多');
    //     var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
    //     util.http(nextUrl, this.processDoubanData);
    //     wx.showNavigationBarLoading();
    // },
    onReachBottom: function (event) {
        console.log('加载更多');
        var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20';
        util.http(nextUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },
    
    onPullDownRefresh: function (event) {
        var refreshUrl = this.data.requestUrl +
            "?star=0&count=20";
        this.data.movies = {};
        this.data.isEmpty = true;
        this.data.totalCount = 0;
        util.http(refreshUrl, this.processDoubanData);
        wx.showNavigationBarLoading();
    },
    processDoubanData: function(moviesDouban) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title;
            if (title.length >= 6) {
                title = title.substring(0, 6) + "...";
            }
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            };
            movies.push(temp);
        }
        var totalMovies = {};
        //如果要绑定新加载的数据，那么需要和已经加载过的数据合并在一起
        if (!this.data.isEmpty) { //如果isEmpty不为空，说明this.data.movies里面有上次绑定的数据
            totalMovies = this.data.movies.concat(movies);
        } else {
            totalMovies = movies;
            this.data.isEmpty = false; //第一次加载完数据后，要把isEmpty改为false
        }
        this.setData({
            movies: totalMovies
        });
        console.log('totalMovie--->', totalMovies.length, moviesDouban)
        if (moviesDouban.subjects.length > 0 && moviesDouban.subjects.length <= moviesDouban.total) {
            this.data.totalCount += 20
        };
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.setNavigationBarTitle({
            title: this.data.navigateTitle,
            success: function(res) {

            }
        })
    },

})