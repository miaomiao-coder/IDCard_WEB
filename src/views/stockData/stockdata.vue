<template>
  <div class="app-container stock-container">
    <el-form :inline="true" ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.name"  placeholder="请输入姓名" />
      </el-form-item>
       <el-form-item>
        <el-input v-model="form.name"  placeholder="请输入身份证号" />
      </el-form-item>
      <el-form-item >
        <el-select v-model="form.region" placeholder="请选择存证人">
          <el-option label="aa" value="aa" />
          <el-option label="bb" value="bb" />
          <el-option label="aaqq" value="aaqq" />
          <el-option label="bbee" value="bbee" />
        </el-select>
      </el-form-item>

      <el-form-item>
         <el-date-picker
            v-model="form.date1"
            type="daterange"
            range-separator="-"
            start-placeholder="取证开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
         <el-date-picker
            v-model="form.date2"
            type="daterange"
            range-separator="-"
            start-placeholder="存证开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item >
        <el-select v-model="form.region" placeholder="请选择是否指定代领人">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.name"  placeholder="请输入代领人姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.name"  placeholder="请输入代领人身份号" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查 询 <i class="el-icon-search"></i></el-button>
       
        <el-button style="color:#409EFF" @click="onCancel">重 置 <i class="el-icon-refresh"/></el-button>
      </el-form-item>
     
    </el-form>

    <div class="btnList">
        <el-button type="primary"><img src="../../assets/img/plcz.png"/></el-button>
         <el-button type="primary"><img src="../../assets/img/btn2.png"/></el-button>
          <el-button type="primary"><img src="../../assets/img/btn1.png"/></el-button>
    </div>


 <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
     <el-table-column align="center"
      type="selection"
      width="55">
    </el-table-column>

      <el-table-column align="center" label="卡块" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="卡位"  width="95">
        <template slot-scope="scope">
           {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          男
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="民族" width="110" align="center">
        <template slot-scope="scope">
          汉族
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="身份证" width="200">
        <template slot-scope="scope">
          451638455989745604x
        </template>
      </el-table-column>
    <el-table-column class-name="status-col" label="存证方式" width="110" align="center">
        <template slot-scope="scope">
            寄存
        </template>
      </el-table-column>
 <el-table-column class-name="status-col" label="存证人" width="110" align="center">
        <template slot-scope="scope">
          匿名
        </template>
      </el-table-column>
       <el-table-column class-name="status-col" label="存证时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="是否指定代领人" width="110" align="center">
        <template slot-scope="scope">
          是
        </template>
      </el-table-column>
      <el-table-column class-name="status-col operation" label="操作"  align="center">
        <template slot-scope="scope">
          <img src="../../assets/img/btn3.png" /><img src="../../assets/img/btn2.png" />
          <el-dropdown style="display: inline-block;vertical-align: middle;" >
            <span class="el-dropdown-link">更多<i class="el-icon-caret-bottom" /></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><i class="el-icon-close" />清除代理人</el-dropdown-item>
                <el-dropdown-item><i class="el-icon-document" />详情</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
          <span></span>
        </template>
      </el-table-column>
    </el-table>

 <div class="pagenationBox">
    <el-pagination
    background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 60,100]"
      :page-size="10"
      layout="prev, pager, next, sizes, jumper"
      :total="100">
    </el-pagination>
  </div>



  </div>
</template>

<script>
import { getList } from '@/api/table'
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      list: null,
      listLoading: true,
      currentPage4: 1
    }
  },
   filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items.splice(1,5)
        this.listLoading = false
      })
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}

.el-date-editor--daterange.el-input__inner{
  width: 216px;
}
.el-input{
  width: 230px;
}

.pagenationBox{
  margin-top:60px;
  text-align: right;
}

.el-table{
    font-size: 12px; 
}

</style>