<template>
  <div class="app-container stock-container">
    <el-form :inline="true" ref="fromInfo" :model="fromInfo">
      <el-form-item prop="name">
        <el-input v-model="fromInfo.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="idcard">
        <el-input v-model="fromInfo.idcard" placeholder="请输入身份证号" />
      </el-form-item>
      <el-form-item prop="region">
        <el-select v-model="fromInfo.region" placeholder="请选择存证人">
          <el-option label="aa" value="aa" />
          <el-option label="bb" value="bb" />
          <el-option label="aaqq" value="aaqq" />
          <el-option label="bbee" value="bbee" />
        </el-select>
      </el-form-item>

      <el-form-item prop="data1">
        <el-date-picker
          v-model="fromInfo.date1"
          type="daterange"
          range-separator="-"
          start-placeholder="取证开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item prop="data2">
        <el-date-picker
          v-model="fromInfo.date2"
          type="daterange"
          range-separator="-"
          start-placeholder="存证开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item prop="region1">
        <el-select v-model="fromInfo.region1" placeholder="请选择是否指定代领人">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item prop="replacegetname">
        <el-input v-model="fromInfo.replacegetname" placeholder="请输入代领人姓名" />
      </el-form-item>
      <el-form-item prop="replacegetidcard">
        <el-input v-model="fromInfo.replacegetidcard" placeholder="请输入代领人身份号" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          查 询
          <i class="el-icon-search"></i>
        </el-button>

        <el-button style="color:#409EFF;float:right" @click="onCancel">
          重 置
          <i class="el-icon-refresh" />
        </el-button>
      </el-form-item>
    </el-form>

    <el-dropdown class="export-item">
      <span class="el-dropdown-link">
        导出记录
        <i class="el-icon-caret-bottom" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >
          <div @click="handleDownloadCurrentPage">
            <i class="el-icon-close" />当页
          </div>
        </el-dropdown-item>
        <el-dropdown-item >
          <div @click="handleDownloadAll">
            <i class="el-icon-document" />全部
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-table
     ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :header-cell-style="{background: '#9AD5FF',color:'#353535'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection"></el-table-column>

      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
		 <span>{{ scope.row.pageviews }}</span>
		</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="民族" align="center">
        <template slot-scope="scope">
		<span>{{ scope.row.status }}</span>
		</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="身份证" width="200px">
        <template slot-scope="scope">
			<span>{{ scope.row.id }}</span>
		</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="存证方式" align="center">
        <template slot-scope="scope">
			<span>{{ scope.row.author }}</span>
		</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="存证人" align="center">
        <template slot-scope="scope">
			<span>{{ scope.row.author }}</span>
		</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="存证时间" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否指定代领人" align="center">
        <template slot-scope="scope">
			<span>{{ scope.row.author }}</span>
		</template>
      </el-table-column>
      <el-table-column class-name="status-col operation" label="操作" width="180px" align="center">
        <template slot-scope="scope">
          <div v-on:click="todetail(scope.row.id)">
            <i class="el-icon-document" />详情
          </div>
          <span></span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagenationBox">
     
       <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
    </div>
      
  
  
  </div>
</template>

<script>
 // <pagination background 
      //   layout="prev, pager, next,sizes, jumper" 
      //   :total="total"
      //   :page.sync="listQuery.page"
      //   :limit.sync="listQuery.limit"
      //   @pagination="fetchData" />
import path from "path";
import { getList } from "@/api/table";
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  data() {
    return {
      fromInfo: {
        name: "",
        idcard: "",
        savename: "",
        replacegetname: "",
        replacegetidcard: "",
        region: "",
        region1: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
    },
    // 分页
    listQuery: {
      page: 1,
      limit: 10,
    },
    total: 0,
    multipleSelection: [],
    list: null,
    listAll: null,
    listLoading: true,
	  currentPage: 1,
	  downloadLoading: false,
    };
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    onSubmit() {
      this.$message("submit!");
    },
    onCancel() {
      this.$refs.fromInfo.resetFields();
    },
    fetchData() {
      var $this =this
      this.listLoading = true;
      getList().then((response) => {   // 此处没有传参，取到所有的数据
        console.log(response)
        this.listAll = response.data.items;
        // this.list = response.data.items

        // 数组截取
        const start = ($this.listQuery.page-1)*($this.listQuery.limit);
        const end =($this.listQuery.page)*($this.listQuery.limit);
        this.list = response.data.items.slice(start, end)

        this.total = response.data.total
        this.listLoading = false;
        document.getElementsByClassName( "el-pagination__jump")[0].childNodes[0].nodeValue = "跳至";
      });
    },
    todetail(id) {
      // this.$store.dispatch("app/toggleSideBar");
      this.$router.push({
        name: "detail",
        params: {
          id: id,
        },
      });
    },
    resolvePath() {
      return path.resolve("/drawdata", "detail");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 导出功能--当前页
    handleDownloadCurrentPage() {
        var LIST=null;
        import("@/vendor/export2Excel").then((excel) => {
          const tHeader = ["姓名", "性别", "民族", "身份证" , "存证人", "存证时间", "是否指定代领人", "性别" ];
          const filterVal = ["title","pageviews","status","id","author","author","display_time","author"];
          if (this.multipleSelection.length){  //导出当前页被选中的
              LIST = this.multipleSelection
          }else{                               // 导出当前页所有的
              LIST = this.list
          }
          const data = this.formatJson(filterVal, LIST)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "存证记录（当前页）",
          });
        });
	},
	 formatJson(filterVal,listObj) {
      return listObj.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
	},
	// 导出功能--全部
    handleDownloadAll() {
		var LIST1 = this.listAll
		import("@/vendor/export2Excel").then((excel) => {
        const tHeader = ["姓名", "性别", "民族", "身份证" ,"存证方式" , "存证人","存证时间", "是否指定代领人" ];
        const filterVal = ["title","pageviews","status","id","author","author","display_time","author"];
        const data = this.formatJson(filterVal, LIST1)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "存证记录（全部）",
        });
      });
  },
  },
};
</script>
<style>
.el-input,
.el-form-item__content,
.el-date-editor {
  width: 250px;
}

.export-item {
  position: absolute;
  top: 120px;
  right: 20px;
}
</style>
<style scoped>
.el-form--inline .el-form-item {
  margin-right: 20px;
}

.line {
  text-align: center;
}

.el-date-editor--daterange.el-input__inner {
  width: 250px;
}

.el-input {
  width: 250px;
}

.pagenationBox {
  margin-top: 60px;
  text-align: right;
}

.el-table {
  font-size: 12px;
}

.el-form {
  width: 950px;
}

.el-dropdown-link {
  color: #409eff;
  font-size: 14px;
}

.el-dropdown-menu__item {
  font-size: 14px;
}
</style>
