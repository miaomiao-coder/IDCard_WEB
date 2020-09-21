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
				<el-date-picker v-model="fromInfo.date1" type="daterange" range-separator="-" start-placeholder="取证开始日期"
				 end-placeholder="结束日期">
				</el-date-picker>
			</el-form-item>

			<el-form-item prop="data2">
				<el-date-picker v-model="fromInfo.date2" type="daterange" range-separator="-" start-placeholder="存证开始日期"
				 end-placeholder="结束日期">
				</el-date-picker>
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
				<el-button type="primary" @click="onSubmit">查 询 <i class="el-icon-search"></i></el-button>

				<el-button style="color:#409EFF;float:right" @click="onCancel">重 置 <i class="el-icon-refresh" /></el-button>
			</el-form-item>

		</el-form>

		<el-dropdown class="export-item">
			<span class="el-dropdown-link">导出记录<i class="el-icon-caret-bottom" /></span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>
					<div><i class="el-icon-close" />当页</div>
				</el-dropdown-item>
				<el-dropdown-item>
					<div><i class="el-icon-document" />全部</div>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>


		<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row
		 :header-cell-style="{background: '#9AD5FF',color:'#353535'}">
			<el-table-column align="center" type="selection" >
			</el-table-column>

			<el-table-column label="姓名"  align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.author }}</span>
				</template>
			</el-table-column>
			<el-table-column label="性别"  align="center">
				<template slot-scope="scope">
					男
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="民族"  align="center">
				<template slot-scope="scope">
					汉族
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="身份证" width="200px">
				<template slot-scope="scope">
					451638455989745604x
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="存证方式"  align="center">
				<template slot-scope="scope">
					寄存
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="存证人" align="center">
				<template slot-scope="scope">
					匿名
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="存证时间" width="180px" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.display_time }}</span>
				</template>
			</el-table-column>
			<el-table-column class-name="status-col" label="是否指定代领人"  align="center">
				<template slot-scope="scope">
					是
				</template>
			</el-table-column>
			<el-table-column class-name="status-col operation" label="操作" width="180px" align="center">
				<template slot-scope="scope">
					<!-- <div v-on:click="todetail(scope.row.id)"><i class="el-icon-document" />详情</div> -->
					<router-link to="/drawdata/detail"><i class="el-icon-document" />详情</router-link>
					<span></span>
				</template>
			</el-table-column>
		</el-table>

		<div class="pagenationBox">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
			 :page-sizes="[10, 20, 30, 60,100]" :page-size="10" layout="prev, pager, next, sizes, jumper" :total="100">
			</el-pagination>
		</div>



	</div>
</template>

<script>
	import path from 'path'
	import {
		getList
	} from '@/api/table'
	export default {
		data() {
			return {
				fromInfo: {
					name: '',
					idcard: '',
					savename: '',
					replacegetname: '',
					replacegetidcard: '',
					region: '',
					region1: '',
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
				this.$refs.fromInfo.resetFields();
			},
			fetchData() {
				this.listLoading = true
				getList().then(response => {
					this.list = response.data.items.splice(1, 5)
					this.listLoading = false
					document.getElementsByClassName('el-pagination__jump')[0].childNodes[0].nodeValue = '跳至'
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			todetail(id) {
				 // this.$store.dispatch("app/toggleSideBar");
				this.$router.push({
					name: 'detail',
					params: {
						id: id
					}
				})
			},
			resolvePath() {
			  return path.resolve('/drawdata','detail')
			}
		}
	}
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
		right: 20px
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
		color: #409EFF;
		font-size: 14px;
	}

	.el-dropdown-menu__item {
		font-size: 14px;
	}
	
</style>
