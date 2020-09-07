<template>
  <div>
      <div style="display:flex" class="header">
        <div class="order1">
          <div>
            <span style="width: 70px;display: inline-block;text-align: right;">姓 名：</span>
            <Input style="width: 74%;margin-right:15px" v-model="name"/>
          </div>
          <div>
            <span style="width: 70px;display: inline-block;text-align: right;">性 别：</span>
            <Select v-model="sex" style="width:74%;margin-right:15px">
              <Option v-for="item in sexList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div>
            <span>身份证号：</span>
            <Input style="width: 74%;margin-right:15px" v-model="idnumber"/>
          </div>
          <div>
            <span>领取方式：</span>
            <Select v-model="Take" style="width:74%;margin-right:15px">
              <Option
                v-for="item in TakeList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div>
            <span>省&nbsp;内&nbsp;卡：&nbsp;</span>
            <Select v-model="province" style="width:74%;margin-right:15px">
              <Option
                v-for="item in provinceList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div>
            <span>查询范围：</span>
             <RadioGroup v-model="query" @on-change="changeModel">
              <Radio v-for="item in queryList" :label="item.value" :key="item.value">
                  <span>{{item.label}}</span>
              </Radio>
            </RadioGroup>
          </div>
          <div style="margin-left: 60px;">
            <Button type="success" ghost style="background:#fff;font-size: 18px;">导出当前页</Button>
            <Button type="success" ghost style="background:#fff;font-size: 18px;">导出全部</Button>
             <Button
              type="success"
              ghost
              style="background:#fff;font-size: 18px;"
              @click="exportcard()"
            >执行导出</Button>
          </div>
        </div>
        <div class="order">
          <div style="display:flex;margin-top: 0px;">
            <p style="width:22%;height:30px;margin-top: 25px;">
              <Checkbox v-model="loadtime">入库时间筛选：</Checkbox>
            </p>
            <div>
              <DatePicker
                type="date"
                placeholder="请选择入库时间"
                style="width: 68%;color:#000"
                :options="optionsDate"
                v-model="loadstarttime"
              ></DatePicker>
              <DatePicker
                type="date"
                placeholder="请选择入库时间"
                style="width: 68%;color:#000"
                :options="optionsDate2"
                v-model="loadendtime"
              ></DatePicker>
            </div>
          </div>
          <div style="display:flex;margin-top:-15px;">
            <p style="width:22%;height:30px;margin-top: 25px;">
              <Checkbox v-model="gettime">领&nbsp;&nbsp;取&nbsp;&nbsp;时&nbsp;&nbsp;间：</Checkbox>
            </p>

            <div>
              <DatePicker
                type="date"
                placeholder="请选择领取时间"
                style="width:68%;color:#000"
                :options="optionsDate"
                v-model="getstarttime"
              ></DatePicker>
              <DatePicker
                type="date"
                placeholder="请选择领取时间"
                style="width:68%;color:#000"
                :options="optionsDate3"
                v-model="getendtime"
              ></DatePicker>
            </div>
          </div>
          <div style="display:flex;margin-top:-15px;">
            <p style="width:22%;height:30px;margin-top: 25px;">
              <Checkbox v-model="validtime">证&nbsp;件 有 效&nbsp;期：</Checkbox>
            </p>

            <div>
              <DatePicker
                type="date"
                placeholder="请选择证件有效期"
                style="width:68%;color:#000"
                v-model="validstarttime"
              ></DatePicker>
              <DatePicker
                type="date"
                placeholder="请选择证件有效期"
                style="width:68%;color:#000"
                v-model="validendtime"
              ></DatePicker>
            </div>
          </div>
          <div style="margin-top:50px;">
           
            <Button
              type="success"
              ghost
              style="background:#fff;margin-left: 200px;margin-top: -52px;;font-size: 18px;"
              @click="getAll()"
            >查找</Button>
          </div>
        </div>
        <div class="order">
          <h2>代理人设置</h2>
          <div class="info">
            <p>姓名：{{info.Name}}</p>
            <p>性别：{{info.Sex}}</p>
            <p>民族：{{info.Nationality}}</p>
            <p>出生日期：{{info.BirthDate}}</p>
            <p>身份证号：{{info.IDCardNo}}</p>
            <p>住址：{{info.Address}}</p>
            <img :src="info.IDPicture"  style="width: 80px;height: 100px;position: absolute;border: 1px inset #fff;top: 6%;right: 14%;"> 
          </div>
          <div style="margin-top:0">
            代领人姓名：
            <Input style="width: 100px;margin-right:15px" v-model="rename"/>与持证人关系：
            <Input style="width: 200px;margin-right:15px" v-model="resystem"/>
          </div>
          <div>
            代领人身份证：
            <Input style="width: 412px;margin-right:15px" v-model="reidnumber"/>
          </div>
          <div>
            <Button
              type="success"
              ghost
              style="background:#fff;margin-left: 68px;font-size: 18px;"
              @click="read()"
            >读取</Button>
            <Button
              type="success"
              ghost
              style="background:#fff;margin-left: 68px;font-size: 18px;"
              @click="set()"
            >设置</Button>
            <Button
              type="success"
              ghost
              style="background:#fff;margin-left: 68px;font-size: 18px;"
              @click="clear()"
            >清除</Button>
          </div>
        </div>
      </div>
    <Table
      border
      ref="selection"
      :columns="columns7"
      :data="list"
      height="290"
      style="margin-bottom:20px"
      @on-row-click='handelrowclick'
      :no-data-text="loadingText ? loadingText : '暂无数据'"
    ></Table>
    <Page
      :total="total"
      show-elevator
      @on-change="changepage"
      style="color:#fff;margrin-top;20px;"
    />
  </div>
</template>
<script>
export default {
  name: "Query",
  data() {
    return {
      loadingText:'',
      loadtime: false,
      gettime: false,
      validtime: false,
      loadstarttime: "",
      loadendtime: "",
      getstarttime: "",
      getendtime: "",
      validstarttime: "",
      validendtime: "",
      query: "2",
      Take: "20",
      province: "0",
      sex: "0",
      name:'',
      idnumber:'',
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
      optionsDate3: {
        disabledDate: function(date) {
          return (
            (date && date.valueOf() < this.getstarttime) ||
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
      provinceList: [
        {
          value: "0",
          label: "省内"
        },
        {
          value: "1",
          label: "省外"
        }
      ],
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
      queryList:[
        {
         label:'所有卡',
         value:'0'
        },
        {
         label:'已出库卡',
         value:'1'
        },
        {
         label:'库存卡',
         value:'2'
        },
      ],
      columns7: [
        {
          title: "编号",
          width: 100,
          key: "SerialNo"
        },
        {
          title: "姓名",
          width: 100,
          key: "Name"
        },
        {
          title: "性别",
          width: 100,
          key: "Sex"
        },
        {
          title: "身份证号",
          width: 200,

          key: "IDCardNo"
        },
        {
          title: "民族",
          width: 100,
          key: "Nationality"
        },
        {
          title: "省内卡",
          key: "InProvince"
        },
        {
          title: "入库方式",
          key: "CardSaveType"
        },
        {
          title: "入库时间",
          width: 150,
          key: "CardSaveTime"
        },
        {
          title: "取证方式",
          key: "CardTakeType"
        },
        {
          title: "取证时间",
          width: 150,
          key: "TakeAwayTime"
        },
        {
          title: "卡块",
          key: "Block"
        },
        {
          title: "卡槽",
          key: "CardSlot"
        }
      ],
      list: [],
      total: "",
      startIndex:0,
      endIndex:9,
      info:'',
      rename:'',
      resystem:'',
      reidnumber:''
    };
  },
  methods: {
    stringToByte(str) {
			var bytes = new Array();
			var len, c;
			len = str.length;
			for(var i = 0; i < len; i++) {
				c = str.charCodeAt(i);
				if(c >= 0x010000 && c <= 0x10FFFF) {
					bytes.push(((c >> 18) & 0x07) | 0xF0);
					bytes.push(((c >> 12) & 0x3F) | 0x80);
					bytes.push(((c >> 6) & 0x3F) | 0x80);
					bytes.push((c & 0x3F) | 0x80);
				} else if(c >= 0x000800 && c <= 0x00FFFF) {
					bytes.push(((c >> 12) & 0x0F) | 0xE0);
					bytes.push(((c >> 6) & 0x3F) | 0x80);
					bytes.push((c & 0x3F) | 0x80);
				} else if(c >= 0x000080 && c <= 0x0007FF) {
					bytes.push(((c >> 6) & 0x1F) | 0xC0);
					bytes.push((c & 0x3F) | 0x80);
				} else {
					bytes.push(c & 0xFF);
				}
			}
			return bytes;
 
 
    },
    byteToString(arr) {
			if(typeof arr === 'string') {
				return arr;
			}
			var str = '',
				_arr = arr;
			for(var i = 0; i < _arr.length; i++) {
				var one = _arr[i].toString(2),
					v = one.match(/^1+?(?=0)/);
				if(v && one.length == 8) {
					var bytesLength = v[0].length;
					var store = _arr[i].toString(2).slice(7 - bytesLength);
					for(var st = 1; st < bytesLength; st++) {
						store += _arr[st + i].toString(2).slice(2);
					}
					str += String.fromCharCode(parseInt(store, 2));
					i += bytesLength - 1;
				} else {
					str += String.fromCharCode(_arr[i]);
				}
			}
			return str;
		},
    getAll() {
      this.list = ''
      if (this.loadstarttime != "")
        this.loadstarttime = this.$moment(this.loadstarttime).format("YYYY-MM-DD");

      if (this.loadendtime != "")
        this.loadendtime = this.$moment(this.loadendtime).format("YYYY-MM-DD");

      if (this.getstarttime != "")
        this.getstarttime = this.$moment(this.getstarttime).format("YYYY-MM-DD" );

      if (this.getendtime != "")
        this.getendtime = this.$moment(this.getendtime).format("YYYY-MM-DD");

      if (this.validstarttime != "")
        this.validstarttime = this.$moment(this.validstarttime).format( "YYYY-MM-DD");

      if (this.validendtime != "")
        this.validendtime = this.$moment(this.validendtime).format("YYYY-MM-DD");
      this.loadingText = '数据加载中...'
      this.axios({
        url: this.$ports.Data.IDCardInfo,
        data: {
          EnableSaveTimeParam: this.loadtime, //启用入库时间参数
          EnableTakeTimeParam: this.gettime, //启用出库时间参数
          EnabledCardTimeParam: this.validtime, //启用身份证有效时间
          EnableCluster: false, //启用集群查询
          TakeType: this.Take, //领取状态
          SaveType: this.query,//存卡状态
          Name:this.name,
          GenderType: this.sex,
          IDCardNumber: this.idnumber,
          CardProvince: this.province,
          PutStartTime: this.loadstarttime,
          PutEndTime: this.loadendtime,
          TakeStartTime: this.getstarttime,
          TakeEndTime: this.getendtime,
          EnabledCardStartTime: this.validstarttime,
          EnabledCardEndTime: this.validendtime,
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
        console.log(res)
        if(res.data.data&&res.data.data.Total!= 0){
          this.list = res.data.data.Items;
          this.total = res.data.data.Total;
        }else{
          this.$Message.warning('数据加载失败')
          this.loadingText = '暂无数据'
        }  
        this.name =''
        this.sex ='0'
        this.idnumber =''
        this.Take = '20'
        this.province = '0'
        this.query ='2'
        this.loadstarttime= ""
        this.loadendtime= ""
        this.getstarttime= ""
        this.getendtime= ""
        this.validstarttime= ""
        this.validendtime= ""
        this.loadtime=false
        this.gettime=false
        this.validtime=false
      });
    },
    changepage(){
      this.startIndex += 10
      this.endIndex   +=10
      this.getAll()
    },
    exportcard(){
      this.axios({
        url: this.$ports.Data.IDCardInfoByIDS,
        data: {
          Token:this.$cookie.get('Token')||sessionStorage.getItem('Token'),
          CardInLib:'',
          CardInHistory:""
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        console.log(res)
      })
    },
    handelrowclick(r,i){
       this.axios({
        url: this.$ports.Data.IDCardDetails,
        data: {
          SeriaNo:r.SerialNo,
          InCardLib:r.CardInLib,
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res=>{
        if(res.data.data){
          this.info = res.data.data;
        }else{
          this.$Message.warning('数据加载失败')
        }
      })
    },
    read(){
      this.$Message.warning('读取功能暂未开放');
    },
    set(name){
      console.log(this.info)
      if(this.info.Name){
        this.axios({
          url: this.$ports.Data.EntrustSet,
          data: {
            Token:this.$cookie.get('Token')||sessionStorage.getItem('Token'),
            SeriaNo:this.info.SerialNo,
            IDCardNo:this.info.IDCardNo,
            EntrusterName:this.rename,
            EntrusterIDCardNo:this.reidnumber,
            Relation:this.resystem
          },
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res=>{
          console.log(res.data)
          if(res.data.Status == 1){
            this.$Message.success('设置代领人成功');
          }else{
            this.$Message.error('设置代领人失败');
          }
          this.rename = '';
          this.resystem = '';
          this.reidnumber ='';
        })
      }else{
        this.$Message.error('请先选择要代领的身份证');
        this.rename = '';
        this.resystem = '';
        this.reidnumber ='';
      }
    },
    clear(name){
      if(this.info.Name){
          this.axios({
          url: this.$ports.Data.EntrustClear,
          data: {
            Token:this.$cookie.get('Token')||sessionStorage.getItem('Token'),
            SeriaNo:this.info.SerialNo,
            IDCardNo:this.info.IDCardNo,
            EntrusterName:this.rename,
            EntrusterIDCardNo:this.reidnumber,
            Relation:this.resystem
          },
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res=>{
          console.log(res.data)
          if(res.data.Status == 1){
            this.$Message.success('取消代领人成功');
          }else{
            this.$Message.error('取消代领人失败');
          }
          console.log(this.$refs.form)
          this.rename = '';
          this.resystem = '';
          this.reidnumber ='';
        })
      }else{
        this.$Message.error('请先选择要取消代领的身份证');
        this.rename = '';
        this.resystem = '';
        this.reidnumber ='';

      }
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
.header .order {
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-right: 30px;
  width: 33%;
}
.header .order1 {
  display: flex;
  flex-direction: column;
  color: #fff;
  margin-right: 130px;
  width: 33%;
}
.order1 {
  margin-top: 6px;
}
.order1 > div {
  margin-top: 18px;
}
.order div {
  margin-top: 15px;
}
.order div span {
  text-align: right;
}
.info {
  line-height: 24px;
}
.ivu-table th {
  height: 20px;
}
tbody td {
  height: 24px;
}
</style>