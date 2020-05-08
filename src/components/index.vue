<template>
<div class="Allbackaround">
     <Row>
 <div class="headstyle1">
      <Menu mode="horizontal" :theme="theme1" active-name="1" >
         <Row>
        <Col :xs="2" :sm="4" :md="6" :lg="6" class="box animated bounceInDown "><a href=""><div class="title">MTBF Report</div></a> </Col>
        <Col :xs="20" :sm="4" :md="12" :lg="8">
    <Input v-model="globalbuildmodel" class="searchs">
        <Select v-model="select3" slot="prepend" style="width:100px" placeholder="Enter Report..."  >
            <Option value="day">MTBF</Option>
            <Option value="month">Reboot</Option>
             <Option value="month">upgrade</Option>
        </Select>
        <Button slot="append" icon="ios-search" @click="globlseach"></Button>
    </Input>
  </Col>
        <Col :xs="2" :sm="4" :md="6" :lg="8">
       <div class="headstyle">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            MTBF Report
        </MenuItem>
        <MenuItem name="2"  >
            <Icon type="ios-people" @click="com" />
            <a @click="com">UP Grade</a>
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                all
            </template>
            <MenuGroup title="MTBF Report">
                <MenuItem name="3-1"></MenuItem>
                <MenuItem name="3-2"></MenuItem>
                <MenuItem name="3-3"></MenuItem>
            </MenuGroup>
            <MenuGroup title="client status">
                <MenuItem name="3-4"></MenuItem>
                <MenuItem name="3-5"></MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            About
        </MenuItem>
            </div>
         </Col>
        </Row>
    </Menu>
</div>
    </Row>
    <br>
         <el-dialog
            title="Case info"
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
              <Table :columns="Casecolumns" :data="Casedata" border></Table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
    <div class="box animated bounceInDown ">
      <!-- <p v-anime="{ rotate: '1turn', backgroundColor: '#FFF', duration: 2000, loop: false }"></p> -->
    <Row :gutter="6" class="content">
        <Col span="4">
      <el-card  style='height:800px ;text-align:left;box-shadow: 0 0 30px 0 rgba(1, 1, 0.5, 0.4);'>
        <a>{{runname}}</a><br><br>
        <i class="el-icon-coin" color='green'></i>AutoTest plan: <br><br>
        Run Build:&nbsp;&nbsp;&nbsp;&nbsp;{{runbuild}} <br><br>
        Test type: &nbsp;&nbsp;&nbsp;&nbsp;{{runtype}}<br><br>
        service: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{service}}<br><br>
        survival rate: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{survrvalrate+'%'}}<br><br>
        Case Passrate:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{passrate+'%'}}<br><br>
        Start Time:&nbsp;&nbsp;&nbsp;&nbsp;{{Startime}}<br><br>
        Last Time:&nbsp;&nbsp;&nbsp;&nbsp;{{lasttime}}<br><br>
        Case info:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="info" @click="CaseFunction" size="small" >INFO</el-button><br><br>
        MEMORY info:&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="info" @click="drawer = true" size="small" >GET INFO</el-button><br>
        <el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress>&nbsp;<Tag type="dot" color="primary" size="large">Case PASS</Tag><br>
        <el-progress type="dashboard" :percentage="percentage1" :color="colors"></el-progress>&nbsp;<Tag type="dot" color="primary" size="large">Survival Rate</Tag><br>
      </el-card >
              <el-drawer
                :visible.sync="drawer"
                :direction="direction"
                :modal='false'
                :with-header="false">
                <row>
                  <Col span="14">
                        &nbsp;<Select v-model="client"  style="width:200px" @on-change='memory'>
                 <Option v-for="item in CrashTypelist" :value="item.SID" :key="item.SID">{{ item.Name }}</Option>
              </Select><br><br><br>
                  </Col>
                   <Col span="14">
                    <el-card  style=" width:600px" v-loading="memoryload"
    element-loading-text="Wait for minute"
    element-loading-spinner="el-icon-loading">
                   <div><canvas id="myChart" width="500" height="400" ></canvas>
                       </div>
                </el-card>
                  </Col>
                   </row>

          </el-drawer>
       </Col>
        <Col span="15" class="tablecenter">
           <Card :bordered="false" style='text-align:left;box-shadow: 0 0 30px 0 rgba(1, 1, 0.5, 0.4);' v-loading="gloabl_loading"
    element-loading-text="Wait for minute"
    element-loading-spinner="el-icon-loading">
              <p slot="title" style="height: 32px">
                 PLAN SELECT:
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time:<Select v-model="timemodel"  style="width:200px">
                 <Option v-for="item in time" :value="item.key" :key="item.key">{{ item.label }}</Option>
              </Select>
              &nbsp;&nbsp;&nbsp;&nbsp;
                  Build:<Input v-model="buildmodel" placeholder="Enter something..." clearable style="width: 200px" />
                <Button type="info" @click="Search">Indfo</Button>
              </p>
            <div>
              <Table   size="small" border :columns="columns1" :data="plandata" height='650' @on-row-click="Currentgroup" :loading="tableloading" @on-row-dblclick="CaseFunction"></Table>
              <div style="margin: 10px;overflow: hidden">
                   <div style="float: right;">
                       <Page :total="100" :current="1" @on-change="changePage"></Page>
                   </div>
               </div>
            </div>
            </Card>
        </Col>
        <Col span="5">
         <card v-loading="survivalload"
    element-loading-text="Wait for minute"
    element-loading-spinner="el-icon-loading">
            <div><canvas id="numberstatus" width="400" height="400" ></canvas></div>
          </card>
          <card  v-loading="loading"
    element-loading-text="Wait for minute"
    element-loading-spinner="el-icon-loading">
            <div><canvas id="Crashchart" width="400" height="400" ></canvas></div>
          </card>
        </Col>

    </Row>
    </div>
      <Row>
    </Row>
</div>
</template>

<script>
import top from '@/components/headnv/top.vue'
import Chart from 'chart.js'
import echarts from 'echarts'
import axios from 'Axios'
import swal from 'sweetalert'
import VueAnime from 'vue-animejs'
import Seacch from '@/components/Seacch.vue'
import router from '@/router'
export default {
  components: {
    top
  },
  data () {
    return {
      loading: false,
      survivalload: false,
      tableloading: true,
      memoryload: false,
      gloabl_loading: false,
      runname: '',
      runbuild: '',
      runservice: '',
      passrate: '',
      survrvalrate: '',
      Startime: '',
      lasttime: '',
      runtype: '',
      service: '',
      plandata: [],
      CrashTypelist: [],
      time: [{key: 7, label: 'Week'}, {key: 14, label: '2 Weeks'}, {key: 31, label: 'Month'}, {key: 93, label: '3 Months'}, {key: 183, label: 'Half Year'}, {key: 365, label: 'Year'}, {key: 730, label: '2 Year'}],
      timemodel: '',
      buildmodel: '',
      columns1: [
        // {
        //   title: 'Status',
        //   key: 'Status',
        //   fixed: 'left',
        //   render: (h, params) => {
        //     return h('div', [
        //       params.row.Running
        //         ? h('img', {attrs: {
        //           src: 'http://mrbj-auto-01:8003/loading1.gif',
        //           width: 20,
        //           height: 20
        //         }})
        //         : h('Icon', {
        //           props: {
        //             type: params.row.Running ? '' : (params.row.RunName.indexOf('Reboot') > -1 ? 'md-refresh' : (params.row.Weibull > 720 ? 'md-checkmark' : 'md-close')),
        //             color: params.row.Running ? '#2b85e4' : (params.row.RunName.indexOf('Reboot') > -1 ? '#ff9900' : (params.row.Weibull > 720 ? 'green' : 'red')),
        //             size: '20'
        //           },
        //           style: {
        //             marginRight: '5px'
        //           }
        //         }, params.row.Running)
        //     ])
        //   }
        // },
        {
          width: '350px',
          title: 'Runname',
          key: 'RunName',
          fixed: 'left',
          render: function (Element, context) {
            const row = context.row
            const color = row.Running === true ? 'primary' : row.Weibull > 720 ? 'success' : 'error'
            return Element(
              'Tag', {
                props: {
                  type: 'dot',
                  color: color
                }
              }
              , row.RunName)
          }

        },
        {
          width: '160px',
          title: 'Build',
          key: 'BuildNumber',
          fixed: 'left'
        },
        {
          width: '160px',
          title: 'Survival',
          key: 'Survival'
        },
        {
          width: '160px',
          title: 'Weibull',
          key: 'Weibull'
        },
        {
          width: '150px',
          title: 'RunningHours',
          key: 'RunningHours'
        },
        // {
        //   width: '150px',
        //   title: 'LastResponse',
        //   key: 'LastResponse'
        // },
        {
          width: '300px',
          title: 'Script',
          key: 'Script'
        }
      ],
      percentage: 10,
      percentage1: 10,
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e61240', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#41d64e', percentage: 100}
      ],
      clientlist: [],
      drawer: false,
      direction: 'rtl',
      globalbuildmodel: '',
      conunt: 50,
      dialogVisible: false,
      Casecolumns: [
        {
          title: 'ID',
          key: 'name'
        },
        {
          title: 'CaseName',
          key: 'name'
        },
        {
          title: 'Case Step',
          key: 'Case Step'
        },
        {
          title: 'Cpriority',
          key: 'Cpriority'
        },
        {
          title: 'Time Recorded',
          key: 'Time Recorded'
        },
        {
          title: 'Start Time',
          key: 'Start Time'
        },
        {
          title: 'Pass Status',
          key: 'Start Time'
        }

      ]
    }
  },
  mounted () {
    // const targets = this.$el
    // this
    //   .$anime
    //   .timeline({
    //   })
    //   .add({
    //     targets,
    //     translateX: 0,
    //     easing: 'easeOutExpo'

    //   })
    // .add({
    //   targets,
    //   translateX: 0,
    //   easing: 'easeOutExpo'
    // })
    //   /* ... etc ... */
    this.initialization()
    this.initializationchart()
  },
  methods: {
    initializationchart () {
      var data = []
      var labels = []
      // axios.get('http://mrbj-auto-01:8003/run/memorygraph?idsession=').then(
      //   Response => {
      //     for (let i = 0; i < Response.data.length; i++) {
      //       labels.push(Response.data[i].TimeResponded)
      //       data.push(Response.data[i].AvailablePhyMemory)
      //     }
      //     // console.log(data)
      //     // 实时更新方法  chart.js  自带
      //     myChart.update()
      //   }
      // )
      var tempData = {
        labels: labels,
        datasets: [{
          label: '---',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'

          ],
          borderColor: '#2196F3',
          borderWidth: 1
        }]
      }

      var ctx = document.getElementById('myChart').getContext('2d')
      var myChart = new Chart(ctx, {
        type: 'line',
        data: tempData,
        options: {
          // maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Client status'
          }
        }
      })
    },
    memory () {
      var data = []
      var labels = []
      this.memoryload = true
      axios.get('http://mrbj-auto-01:8003/run/memorygraph?idsession=' + this.client).then(
        Response => {
          for (let i = 0; i < Response.data.length; i++) {
            labels.push(Response.data[i].TimeResponded)
            data.push(Response.data[i].AvailablePhyMemory)
          }
          // console.log(data)
          // 实时更新方法  chart.js  自带
          this.memoryload = false
          myChart.update()
        }
      )
      var tempData = {
        labels: labels,
        datasets: [{
          label: '---',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: '#2196F3',
          borderWidth: 1
        }]
      }

      var ctx = document.getElementById('myChart').getContext('2d')
      var myChart = new Chart(ctx, {
        type: 'line',
        data: tempData,
        options: {
          // maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Client status'
          }
        }
      })
    },
    handleClose (done) {
      swal({
        title: 'Good job!',
        text: 'You clicked the button!',
        icon: 'success',
        button: 'Aww yiss!'
      }).then(_ => {
        done()
      })
        .catch(_ => {})
    },
    initialization () {
      axios.get('http://mrbj-auto-01:8003/run/filter?days=30&buildnumber=&count=100').then(
        Response => {
          this.tableloading = false
          this.plandata = Response.data
        }
      )
    },
    Currentgroup (row) {
      this.survivalload = true
      this.loading = true
      // left part
      this.runname = row.RunName
      this.runbuild = row.BuildNumber
      this.runtype = row.Test_Type
      this.service = row.Service
      this.survrvalrate = ((row.BoxSurvival / row.ClientCount) * 100.00).toFixed(2)
      var successful = (row.TestCount - row.FailureCount)
      this.passrate = Math.round(successful / row.TestCount * 10000) / 100.00
      this.percentage = this.passrate
      this.percentage1 = this.survrvalrate
      console.log(this.passrate)
      this.Startime = this.dateformat(row.StartTime)
      this.lasttime = this.dateformat(row.LastResponse)
      var xdata = []
      var ydata = []
      axios.get('http://mrbj-auto-01:8003/run/survivalgraph?uuidrun=' + row.uuidRun).then(
        response => {
          this.survivalload = false
          for (var i = 0; i < response.data.length; i++) {
            ydata.push(response.data[i].Count)
            xdata.push(response.data[i].Hours)
          }
          numberstatus.update()
        }
      )
      var dataset = {
        labels: xdata,
        datasets: [{
          label: 'Each group status',
          data: ydata,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1
        }]
      }
      // 获取元素图表样式~基础架构
      var ctxd = document.getElementById('numberstatus').getContext('2d')
      // new chart 实例
      var numberstatus = new Chart(ctxd, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: dataset,
        // Configuration options go here
        options: {
          events: ['click']
        }
      })
      //
      //
      //
      //
      //
      // --------downchart
      console.log(row.uuidRun)
      var Completed = 0
      var Fail = 0
      var Runing = 0
      var ManagerCrash = 0
      var OOM = 0
      var Nativecrash = 0
      axios.get('http://mrbj-auto-01:8003/run/session?uuidrun=' + row.uuidRun).then(
        response => {
          this.CrashTypelist = response.data
          this.loading = false
          // console.log(this.CrashTypelist)
          for (var i = 0; i < response.data.length; i++) {
            var crashtype = this.CrashTypelist[i].CrashType
            var groupstatus = this.CrashTypelist[i].Status
            if (crashtype != null) {
              if (crashtype.indexOf('ManagerCrash')) {
                ManagerCrash++
              } if (crashtype.indexOf('OOM')) {
                OOM++
              } else if (crashtype.indexOf('NativeCrash')) {
                Nativecrash++
              }
            } if (groupstatus === 'Failed') {
              Fail++
            } else if (groupstatus === 'Running') {
              Runing++
            } else if (groupstatus === 'Completed') {
              Completed++
            }
          }
          var Crashdata = {
            labels: ['Completed', 'Fail', 'Runing', 'ManagerCrash', 'OOM', 'Nativecrash'],
            datasets: [{
              data: [Completed, Fail, Runing, ManagerCrash, OOM, Nativecrash],
              backgroundColor: [
                'rgba(21, 170, 91,0.7)',
                'rgba(223, 59, 67,0.7)',
                'rgba(35, 124, 226,0.7)',
                'rgba(233, 212, 27,0.3)',
                'rgba(219, 111, 125,0.3)',
                'rgba(71, 201, 89,0.3)'
              ],
              borderColor: '#eee',
              borderWidth: 1
            }]
          }

          // new chart 实例
          var ctxe = document.getElementById('Crashchart').getContext('2d')
          var Crashchart = new Chart(ctxe, {
            // The type of chart we want to create
            type: 'doughnut',
            // The data for our dataset
            data: Crashdata,
            // Configuration options go here
            options: {
              // events: ['touchstart'],
              title: {
                display: true,
                text: 'Crash status'
              }
            }
          })
        }
      )
    },
    dateformat (time) {
      var dtstr = time

      dtstr = dtstr.replace(/\D/g, ' ')
      var dtcomps = dtstr.split(' ')

      // modify month between 1 based ISO 8601 and zero based Date
      dtcomps[1]--

      var convdt = new Date(Date.UTC(dtcomps[0], dtcomps[1], dtcomps[2], dtcomps[3], dtcomps[4], dtcomps[5]))
      return convdt.toLocaleString()
    },
    Search () {
      this.plandata = []
      this.tableloading = true
      axios.get('http://mrbj-auto-01:8003/run/filter?days=' + this.timemodel + '&buildnumber=' + this.buildmodel + '&count=100').then(
        response => {
          this.plandata = response.data
          this.tableloading = false
        }
      )
    },
    com () {
      let routedata = this.$router.resolve({path: '/Seacch/'})
      window.open(routedata.href, '_blank')
      this.$Loading.finish()
    },
    globlseach () {
      this.plandata = []
      this.gloabl_loading = true
      axios.get('http://mrbj-auto-01:8003/run/filter?days=93&buildnumber=' + this.globalbuildmodel + '&count=50').then(
        response => {
          this.gloabl_loading = false
          this.plandata = response.data
        }
      )
    },
    changePage () {
      this.gloabl_loading = true
      this.conunt = this.conunt
      axios.get('http://mrbj-auto-01:8003/run/filter?days=365&buildnumber=' + this.globalbuildmodel + '&count=' + this.conunt).then(
        response => {
          this.gloabl_loading = false
          this.plandata = response.data
        }
      )
    },
    CaseFunction () {
      this.dialogVisible = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headstyle1{
   width: auto;
   height: 0;
   width: 100%;
   position: fixed;
   z-index: 1999;
   top: 0;
    right: 0;
    left: 0;
    display: -ms-flexbox;
     -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
}
.headstyle{
    position: relative;
    float: right;
    margin-left: 20%;
}
.title{
        background: linear-gradient(to right, rgb(16, 97, 228), rgb(16, 97, 228));
        -webkit-background-clip: text;
        color: transparent;
        font-size: 25px;
        margin-left: 10px;
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.searchs{
  width: 300px;
  margin-top: 15px;
}
/* //content----- */
.tablecenter{
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.content{
  margin-top: 3%;
}
  .bg-purple-dark {
    background: #6ec098;
  }
   .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .Allbackaround{
    background:#eee;
  }
  .layout{
         width: 100%;
        height:100%;
        position: relative;
        margin-right: 5%

     }
</style>
