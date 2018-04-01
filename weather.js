var city = '合肥'
ajax(city)
 var userIput = document.querySelector('.user-search input')
 userIput.addEventListener('change',function(){
 var city = userIput.value
    ajax(city)
 })
function ajax(city){
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function () { 
    var res = xhr.response 
    if (xhr.readyState === 4 & xhr.status === 200 || xhr.status === 304) {
       getCity(res)
       getTempt(res)
       getIcon(res)
       getWeatherStatu(res)
       getWind(res)
       setInterval(getTime,1000,res)
    }
}
xhr.responseType = 'json';
xhr.open('get', 'https://free-api.heweather.com/s6/weather/forecast?location='+city+'&key=04e95164e88f4f16b4681c2344d50ddf')
xhr.send()
}


var cityTag = document.querySelector('.location-name')
var timeTag = document.querySelector('.location-time')
var dateTag = document.querySelector('.today-date')
var temptTag1 = document.querySelector('.tempt')
var img1 = document.querySelector('.weather-icon img')
var img2 = document.querySelector('.tommorw img')
var img3 = document.querySelector('.afterTomm img')

var temptTag2 = document.querySelector('.tommorrow-tempt')
var temptTag3 = document.querySelector('.aftertom-tempt')
var statusTag1 = document.querySelector('.weather-status1')
var statusTag2 = document.querySelector('.weather-status2')
var statusTag3 = document.querySelector('.weather-status3')
var wind1Tag = document.querySelector('.wind1 span')

function getCity(res){
    var userCity = res.HeWeather6[0].basic.location
    cityTag.textContent = userCity
}
// 获取时间
function getTime(res){
    var localTime = new Date().toLocaleTimeString();
    var nowDate =  res.HeWeather6[0].daily_forecast[0].date
    timeTag.textContent = localTime.slice(2)
    dateTag.textContent = nowDate.slice(5)
}


// 当天,明天后天温度
function getTempt(res){
    var todayTemptMax = res.HeWeather6[0].daily_forecast[0].tmp_max
    var todayTemptMin =  res.HeWeather6[0].daily_forecast[0].tmp_min
    temptTag1.textContent = todayTemptMin + '~' + todayTemptMax + '°'
    var tommorowTemptMax =  res.HeWeather6[0].daily_forecast[1].tmp_max
    var tommorowTemptMin =  res.HeWeather6[0].daily_forecast[1].tmp_min
    temptTag2.textContent =  tommorowTemptMin + '~' + tommorowTemptMax + '°'
    var afterTommTemptMax = res.HeWeather6[0].daily_forecast[2].tmp_max
    var afterTommTemptMin = res.HeWeather6[0].daily_forecast[2].tmp_min
    temptTag3.textContent =  afterTommTemptMin+ '~' + afterTommTemptMax + '°'
}
//天气代码并替换图标
function getIcon(res){
    var Code1= res.HeWeather6[0].daily_forecast[0].cond_code_d
    var Code2 = res.HeWeather6[0].daily_forecast[1].cond_code_d
    var Code3 =  res.HeWeather6[0].daily_forecast[2].cond_code_d
    img1.setAttribute('src','weather-icon/'+Code1+'.png')
    img2.setAttribute('src','weather-icon/'+Code2+'.png')
    img3.setAttribute('src','weather-icon/'+Code3+'.png')
}
//获取天气信息
function getWeatherStatu(res){
    var statu1 = res.HeWeather6[0].daily_forecast[0].cond_txt_d
    var statu2 =  res.HeWeather6[0].daily_forecast[1].cond_txt_d
    var statu3 =  res.HeWeather6[0].daily_forecast[2].cond_txt_d
    statusTag1.textContent = statu1
    statusTag2.textContent = statu2
    statusTag3.textContent = statu3
}
//获取风速
function getWind(res){
    var wind1 =  res.HeWeather6[0].daily_forecast[0].wind_sc
    wind1Tag.textContent = wind1
}