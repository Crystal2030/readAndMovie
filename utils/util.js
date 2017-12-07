function convertToStarsArray(stars){
  var num = stars.toString().substring(0,1);
  var array = [];
  for(var i=1;i<=5;i++) {
    if(i<=num){
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function http(url, callback) {
  var that = this;
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'json'
    },
    success: function (res) {
      //success
      callback(res.data);
    },
    fail: function (error) {
      //fail
      console.log('failed');
      console.log(error);
    }
  });
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http
}
