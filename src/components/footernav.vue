// <template>
//   <div class="layout">
//      <div id="main" class="layout" style='height:300px'></div>
//        <!-- <div id="second" class="layout" style='height:300px'></div> -->
//   </div>
// </template>

// <script>
// import echarts from 'echarts'
// import axios from 'axios'
// import $ from 'jquery'
// export default {
//   name: 'table',
//   data () {
//     return {
//       group: [],
//       Names: [], // 类别数组（实际用来盛放X轴坐标值）
//       Nums: [] // 销量数组（实际用来盛放Y坐标值）
//     }
//   },
//   created () {

//   },
//   methods () {

//   },
//   mounted () {
//     // 变量是基本类型 值不可变，在初始化的时候必须要赋值        var值可变  let 块级作用域 一般在 {}内 作用防止外边变量的干扰而定义在内部的变量
//     const myChart = echarts.init(document.getElementById('main'))
//     myChart.setOption({
//       title: {
//         text: 'Client status'
//       },
//       tooltip: {},
//       toolbox: {
//         feature: {
//           dataView: {show: true, readOnly: false},
//           magicType: {show: true, type: ['line', 'bar']},
//           restore: {show: true},
//           saveAsImage: {show: true}
//         }
//       },
//       grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         height: 'auto',
//         containLabel: true
//       },
//       legend: {
//         data: []
//       },
//       xAxis: {
//         data: []
//       },
//       yAxis: {},
//       series: [{
//         name: 'ClientCount',
//         type: 'bar',
//         data: []
//       }]
//     })
//     // $.get('http://mrbj-auto-01/PowerMonkey/ctm/GetClientGroups').done(function (data) {
//     //   myChart.setOption({
//     //     xAxis: {
//     //       data: data.ClientCount
//     //     },
//     //     series: [{
//     //       // 根据名字对应到相应的系列
//     //       name: 'ClientCount',
//     //       data: []
//     //     }]
//     //   })
//     // })
//     myChart.showLoading() // 数据加载完之前先显示一段简单的loading动画
//     var names = [] // 类别数组（实际用来盛放X轴坐标值）
//     var nums = [] // 销量数组（实际用来盛放Y坐标值）
//     $.ajax({
//       type: 'get',
//       async: true, // 异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
//       url: 'http://mrbj-auto-01.mr.ericsson.se/PowerMonkey/ctm/GetClientGroups', // 请求发送到TestServlet处
//       success: function (result) {
//         // 请求成功时执行该函数内容，result即为服务器返回的json对象
//         if (result) {
//           for (let i = 0; i < result.length; i++) {
//             names.push(result[i].GroupName) // 挨个取出类别并填入类别数组
//           }
//           for (let i = 0; i < result.length; i++) {
//             if (result[i].IP !== null) {
//               nums.push(result[i].ClientCount)
//             }
//             //  nums.push(result[i].productionArrangement.number);    //挨个取出销量并填入销量数组daliy
//           }
//           myChart.hideLoading() // 隐藏加载动画
//           myChart.setOption({ // 加载数据图表
//             xAxis: {
//               data: names
//             },
//             series: [{
//               // 根据名字对应到相应的系列
//               name: 'ClientCount',
//               data: nums
//             }]
//           })
//         }
//       },
//       error: function (errorMsg) {
//         // 请求失败时执行该函数
//         alert('图表请求数据失败!')
//         myChart.hideLoading()
//       }
//     })

//     axios.get('http://mrbj-auto-01.mr.ericsson.se/PowerMonkey/ctm/GetClientGroups').then(result => {
//     // if (reslut) {
//     //     for (let i = 0; i < reslut.length; i++) {
//     //       names.push(reslut[i].GroupName)
//     //       nums.push(reslut[i].ClientCount)
//     //     }
//     //   }
//     // }
//       this.Nums = result.data
//       console.log(nums)
//     })
//     if (this.Nums !== null) {
//       this.Nums = nums
//       for (let i = 0; i < nums.length; i++) {
//         nums.push(nums[i].ClientCount)
//         console.log(nums)
//       }
//     }
//     myChart.setOption({
//       xAxis: {
//         data: names
//       },
//       yAxis: {
//         data: nums
//       }
//     })
//   }
// }

// </script>

// <style scoped>
//   .layout{
//         width: 100%;
//         height:100%;
//         background: #ffff;
//         position: relative;
//         margin-right: 5%

//     }

// </style>
