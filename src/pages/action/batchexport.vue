


<template>
  <div>
    <div>
      <h2 style="margin-bottom:15px">库存查询记录</h2>
      <div style="color:#fff">
        <span style="width: 70px;display: inline-block;text-align: right;">姓名：</span>
        <Input style="width: 300px;margin-right:15px" v-model="name"/>
        <!-- v-model="value" -->
        <span style="width: 66px;display: inline-block;text-align: right;">性别：</span>

        <Select v-model="sex" style="width:300px;margin-right:15px">
          <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>身份证号：
        <Input style="width: 300px;margin-right:15px" v-model="idnumber"/>
        <Checkbox v-model="single">只查外省证件</Checkbox>
      </div>
      <div style="color:#fff;margin:20px 0;">
        <span>领取方式：</span>
        <Select v-model="Take" style="width:300px;margin-right:15px">
          <Option v-for="item in TakeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>存证方式：
        <Select v-model="Save" style="width:300px;margin-right:15px">
          <Option v-for="item in SaveList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
入库时间：
        <DatePicker
          type="date"
          placeholder="请选择入库时间"
          style="width: 280px;color:#000"
          :options="optionsDate"
          v-model="loadstarttime"
        ></DatePicker>至
        <DatePicker
          type="date"
          placeholder="请选择入库时间"
          style="width: 280px;color:#000"
          :options="optionsDate2"
          v-model="loadendtime"
        ></DatePicker>

        <Button type="success" style="font-size: 18px;margin-left: 120px;" @click="getData()">查找</Button>
      </div>
    </div>
    <div>
      <div style="display:inline-block;width:49%">
        <Table
          border
          ref="selection"
          :columns="columns"
          :data="list"
          style="margin-bottom:30px"
          @on-select="handleSelectionChange"
          @on-select-cancel="handleSelectionChangecancel"
          @on-select-all="handleSelectionChangeall"
          @on-select-all-cancel="handleSelectionChangeallcancel"
          height="500"
          :no-data-text="loadingText ? loadingText : '暂无数据'"
        ></Table>
        <Page
          :total="total"
          show-elevator
          @on-change="changepageone"
          style="color:#fff;margrin-top;20px;display:inline-block"
        />
        <Button
          type="success"
          ghost
          style="background:#fff;margin-left: 200px;margin-top:-20px;font-size: 14px;"
          @click="addqueue()"
        >加入出库队列</Button>
      </div>
      <div style="display:inline-block;width:49%;">
        <Table
          border
          ref="selection"
          :columns="columns1"
          :data="listexport"
          style="margin-bottom:30px"
          @on-select="handleSelectionChangetwo"
          @on-select-cancel="handleSelectionChangecanceltwo"
          @on-select-all="handleSelectionChangealltwo"
          @on-select-all-cancel="handleSelectionChangeallcanceltwo"
          height="500"
          :no-data-text="loadingTexttwo ? loadingTexttwo : '暂无数据'"
        ></Table>
        <Page
          :total="totalexport"
          show-elevator
          @on-change="changepagetwo"
          style="color:#fff;margrin-top;20px;display:inline-block"
        />
        <RadioGroup v-model="out" @on-change="changeModel" style="color:white;margin-left:8%;margin-bottom:2%;">
          <Radio v-for="item in outList" :label="item.value" :key="item.value">
            <span>{{item.label}}</span>
          </Radio>
        </RadioGroup>
        <Button
          type="success"
          ghost
          style="background:#fff;margin-left: 8%;margin-top:-20px;font-size: 14px;"
        >移除</Button>
        <Button
          type="success"
          ghost
          style="background:#fff;margin-left: 6%;margin-top:-20px;font-size: 14px;"
          @click="executeexport"
        >执行导出</Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Export",
  data() {
    return {
      loadingTexttwo:'',
      loadingText:'',
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "Name",
          width: 100
        },
        {
          title: "身份证号",
          key: "IDCardNo",
          width: 250
        },
        {
          title: "民族",
          key: "Nationality",
          width: 90
        },
        {
          title: "入库方式",
          key: "CardSaveType",
          width: 120
        },
        {
          title: "入库时间",
          key: "CardSaveTime",
          width: 252
        }
        /* {
          title: "操作",
          key: "action",
          width: 133,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    fontSize:"12px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row._id);
                    }
                  }
                },
                "加入出库队列"
              )
            ]);
          }
        } */
      ],
      list: [],
      total: "",
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "Name",
          width: 100
        },
        {
          title: "身份证号",
          key: "IDCardNo",
          width: 250
        },
        {
          title: "民族",
          key: "Nationality",
          width: 90
        },
        {
          title: "入库方式",
          key: "CardSaveType",
          width: 120
        },
        {
          title: "入库时间",
          key: "CardSaveTime",
          width: 252
        }
        /* {
          title: "操作",
          key: "action",
          width: 162,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    fontSize:"12px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row._id);
                    }
                  }
                },
                "移除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row._id);
                    }
                  }
                },
                "执行导出"
              ),
            ]);
          }
        } */
      ],
      listexport: [],
      totalexport: "",
      EnableSaveTimeParam: false,
      /*  EnabledCardTimeParam:false,
      EnableCluster:false, */
      single: false,
      loadstarttime: "",
      loadendtime: "",
      optionsDate: {
        disabledDate(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      optionsDate2: {
        disabledDate: function(date) {
          return (
            (date && date.valueOf() < this.loadstarttime) ||
            (date && date.valueOf() > Date.now())
          );
        }.bind(this)
      },
      TakeList: [
        {
          value: "0",
          label: "未领取"
        },
        {
          value: "1",
          label: "本人指纹核验"
        },
        {
          value: "2",
          label: "刷旧身份证"
        },
        {
          value: "3",
          label: "刷旧身份证"
        },
        {
          value: "4",
          label: "输入身份证号码"
        },
        {
          value: "5",
          label: "输入身份证号码+指纹核验"
        },
        {
          value: "6",
          label: "输入姓名+指纹核验"
        },
        {
          value: "7",
          label: "人脸识别"
        },
        {
          value: "8",
          label: "人脸识别+指纹核验"
        },
        {
          value: "9",
          label: "民警代领"
        },
        {
          value: "10",
          label: "批量导出"
        },
        {
          value: "11",
          label: "手动取证"
        },
        {
          value: "12",
          label: "未知或证件遗失"
        },
        {
          value: "13",
          label: "他人代领"
        },
        {
          value: "20",
          label: "所有类型"
        }
      ],
      Take: "20",
      SaveList: [
        {
          value: "0",
          label: "所有"
        },
        {
          value: "1",
          label: "发卡箱"
        },
        {
          value: "2",
          label: "出证口"
        }
      ],
      Save: "0",
      sexList: [
        {
          value: "0",
          label: "所有"
        },
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        },
        {
          value: "3",
          label: "其他"
        }
      ],
      out: "0",
      outList: [
        {
          label: "出证口出证",
          value: "0"
        },
        {
          label: "回收箱出证",
          value: "1"
        }
      ],
      sex: "0",
      name: "",
      idnumber: "",
      province: 0,
      cardarr: [],
      startIndex:0,
      endIndex:9
    };
  },
  methods: {
    getData() {
      this.list=''
      if (this.single) {
        this.province = 1;
      }
      if (this.loadstarttime != "" || this.loadendtime != "") {
        this.EnableSaveTimeParam = true;
      }
      if (this.loadstarttime != "")
        this.loadstarttime = this.$moment(this.loadstarttime).format("YYYY-MM-DD HH:mm:ss");

      if (this.loadendtime != "")
        this.loadendtime = this.$moment(this.loadendtime).format("YYYY-MM-DD HH:mm:ss");
      this.loadingText = '数据加载中...'
      this.axios({
        url: this.$ports.Data.IDCardSelectByLib,
        data: {
          EnableSaveTimeParam: this.EnableSaveTimeParam,
          EnabledCardTimeParam: false,
          EnableCluster: false,
          TakeType: this.Take,
          SaveType: this.Save,
          Name: this.name,
          GenderType: this.sex, //性别
          IDCardNumber: this.idnumber,
          CardProvince: this.province,
          PutStartTime: "",
          PutEndTime: "",
          EnabledCardStartTime: this.loadstarttime,
          EnabledCardEndTime: this.loadendtime,
          QueryBound: 0,
          OrderByColumnName: "SerialNo",
          startIndex:this.startIndex,
          endIndex:this.endIndex,
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        if (res.data.data.length!=0) {
          this.list = res.data.data;
          this.total = res.data.data.length;
        }else{
          this.$Message.info('没有符合条件的数据')
          this.loadingText = ''
        }
        this.name = ''
        this.sex = '0'
        this.idnumber = ''
        this.Take = '20'
        this.Save='0'
        this.single = false
        this.loadendtime = ''
        this.loadstarttime = ''
      });
    },
    handleSelectionChange(s, r) {
      this.cardarr = [];
      for (var i = 0; i < s.length; i++) {
        this.cardarr.push(s[i].SerialNo);
        console.log(this.cardarr);
      }
    },
    handleSelectionChangecancel(s,r){
      this.cardarr.splice(this.cardarr.indexOf(r.SerialNo),1)
      console.log(this.cardarr)
    },
    handleSelectionChangeall(s) {
      this.cardarr = [];
      for (var i = 0; i < s.length; i++) {
        this.cardarr.push(s[i].SerialNo);
        console.log(this.cardarr);
      }
    },
    handleSelectionChangeallcancel(s){
     this.cardarr = [];
    },
    addqueue() {
      this.loadingTexttwo = '数据加载中...'
    },
    executeexport() {
      this.axios({
        url: this.$ports.Data.IDCardBathExport,
        data: {
          Token: this.$cookie.get("Token") || sessionStorage.getItem("Token"),
          IDCardSerialNO: this.cardarr,
          CarePushType: this.out
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res);
      });
    },
    changepageone(){
      this.startIndex +=10;
      this.endIndex +=10;
      this.getData(); 
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
h2 {
  color: #fff;
}
.ivu-table-wrapper {
  width: 100%;
  display: inline-block;
}
/* .ivu-table-wrapper .ivu-table {
  width: 100%;
} */
.ivu-col-span-12 {
  display: inline-block;
  width: 25%;
}
.ivu-select-dropdown {
  color: #999;
}
.ivu-btn > span {
  vertical-align: middle;
  font-size: 12px;
  letter-spacing: 0px;
}
td {
  height: 40px;
}
</style>
