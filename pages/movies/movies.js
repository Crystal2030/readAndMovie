var util = require("../../utils/util.js");
var app = getApp();
Page({
  //RESTFul API JSON
  //SOAP XML
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPannelShow: false
  },
  onLoad: function(event){
    var globalData = app.globalData.doubanBase;
    var inTheatersUrl = globalData + '/v2/movie/in_theaters' + '?start=0&count=3';
    var commingSoonUrl = globalData + '/v2/movie/coming_soon' + '?start=0&count=3';
    var top250Url = globalData + '/v2/movie/top250' + '?start=0&count=3';
    this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映');
    this.getMovieListData(commingSoonUrl, 'comingSoon', '即将上映');
    this.getMovieListData(top250Url, 'top250', '豆瓣Top250');
    // this.getMovieListData(commingSoonUrl);
    // this.getMovieListData(top250Url);
  },
  onMoreTap: function (event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },
  onBindFocus: function(event) {
    console.log("onbindfocus");
    this.setData({
      containerShow: false,
      searchPannelShow: true
    });
  },
  onBindBlur: function(event) {
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + text;
    this.getMovieListData(searchUrl, 'searchResult', "");
  },
  onCancelImgTap: function(event) {
    console.log('on cancel img tap')
    this.setData({
      containerShow: true,
      searchPannelShow: false,
      searchResult: {}
    });
  },
  getMovieListData: function (url, settedKey, cagetoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',//OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
      header: {
        'Content-Type': 'json' 
      },
      success: function (res) {
        //success
        // console.log(res);
        that.processDoubanData(res.data, settedKey, cagetoryTitle);
      },
      fail: function (error) {
        //fail
        console.log('failed');
        console.log(error);
      },
      complete: function () {
        //complete
      }
    });
  },

  processDoubanData: function (moviesDouban, settedKey, cagetoryTitle) {
    var movies = [];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length>=6){
        title = title.substring(0,6) + "...";
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

    var readyData={};
    readyData[settedKey] = {
      categoryTitle: cagetoryTitle,
      movies: movies
    };
    console.log('readydata---->', readyData);
    this.setData(readyData);
  },

  oMovieTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    });
  }
})