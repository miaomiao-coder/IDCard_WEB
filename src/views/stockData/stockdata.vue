<template>
	<div>
		<div class="app-container stock-container">
			<el-form :inline="true" ref="form" :model="form">
				<el-form-item prop="name">
					<el-input v-model="form.name" placeholder="请输入姓名" />
				</el-form-item>
				<el-form-item prop="idcard">
					<el-input v-model="form.idcard" placeholder="请输入身份证号" />
				</el-form-item>
				<el-form-item prop="region">
					<el-select v-model="form.region" placeholder="请选择存证人">
						<el-option label="aa" value="aa" />
						<el-option label="bb" value="bb" />
						<el-option label="aaqq" value="aaqq" />
						<el-option label="bbee" value="bbee" />
					</el-select>
				</el-form-item>

				<el-form-item prop="date1">
					<el-date-picker v-model="form.date1" type="daterange" range-separator="-" start-placeholder="取证开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<el-form-item prop="date2">
					<el-date-picker v-model="form.date2" type="daterange" range-separator="-" start-placeholder="存证开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</el-form-item>

				<el-form-item prop="region1">
					<el-select v-model="form.region1" placeholder="请选择是否指定代领人">
						<el-option label="是" value="是" />
						<el-option label="否" value="否" />
					</el-select>
				</el-form-item>
				<el-form-item prop="replacegetname">
					<el-input v-model="form.replacegetname" placeholder="请输入代领人姓名" />
				</el-form-item>
				<el-form-item prop="replacegetidcard">
					<el-input v-model="form.replacegetidcard" placeholder="请输入代领人身份号" />
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="onSubmit">查 询 <i class="el-icon-search"></i></el-button>

					<el-button style="color:#409EFF;float:right" @click="onCancel">重 置 <i class="el-icon-refresh" /></el-button>
				</el-form-item>

			</el-form>

			<div class="btnList">
				<!-- <el-button type="primary" @click="togglecom(batchcardinfo)"><img src="../../assets/img/plcz.png" /></el-button>
				<el-button type="primary" @click="appointagent(1)"><img src="../../assets/img/btn2.png" /></el-button>
				<el-button type="primary" @click="togglecom(batchclearinfo)"><img src="../../assets/img/btn1.png" /></el-button> -->
				<el-button type="primary" @click="togglecom(batchcardinfo)"><i class="el-icon-folder-checked"></i>批量出证</el-button>
				<el-button type="primary" @click="appointagent(1)"><i class="el-icon-circle-plus-outline"></i>指定代理人</el-button>
				<el-button type="primary" @click="togglecom(batchclearinfo)"><i class="el-icon-remove-outline"></i>清除代理人</el-button>
			</div>


			<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row
			 :header-cell-style="{background: '#9AD5FF',color:'#353535'}">
				<el-table-column align="center" type="selection" >
				</el-table-column>

				<el-table-column align="center" label="卡块" >
					<template slot-scope="scope">
						{{ scope.$index }}
					</template>
				</el-table-column>
				<el-table-column align="center" label="卡位" >
					<template slot-scope="scope">
						{{ scope.$index }}
					</template>
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
				<el-table-column class-name="status-col" label="民族"   align="center">
					<template slot-scope="scope">
						汉族
					</template>
				</el-table-column>
				<el-table-column align="center" prop="created_at" width="180px" label="身份证" >
					<template slot-scope="scope">
						451638455989745604x
					</template>
				</el-table-column>
				<el-table-column class-name="status-col" label="存证方式"  align="center">
					<template slot-scope="scope">
						寄存
					</template>
				</el-table-column>
				<el-table-column class-name="status-col" label="存证人"  align="center">
					<template slot-scope="scope">
						匿名
					</template>
				</el-table-column>
				<el-table-column class-name="status-col" label="存证时间" width="180px"  align="center">
					<template slot-scope="scope">
						<span>{{ scope.row.display_time }}</span>
					</template>
				</el-table-column>
				<el-table-column class-name="status-col" label="是否指定代领人"  align="center">
					<template slot-scope="scope">
						是
					</template>
				</el-table-column>
				<el-table-column class-name="status-col operation" label="操作" width="250px" align="center">
					<template slot-scope="scope">
						<el-button type="primary" @click="printcard(scope.row.id)">出证</el-button>
						<el-button type="primary" @click="appointagent(scope.row.id)">指定代领人</el-button>
						<el-dropdown style="display: inline-block;vertical-align: middle;">
							<span class="el-dropdown-link">更多<i class="el-icon-caret-bottom" /></span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>
									<div @click="deleteagent(scope.row.id)"><i class="el-icon-close" />清除代领人</div>
								</el-dropdown-item>
								<el-dropdown-item>
									<div v-on:click="todetail(scope.row.id)"><i class="el-icon-document" />详情</div>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
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


		<Confirm v-show="showConfirm" v-on:closeme="closeme" v-bind:info="info"></Confirm>
		<Agent v-show="showPwd" v-on:closeagent="closeagent" v-bind:info="info"></Agent>
			<Card v-show="showCard" v-on:closecard="closecard" v-bind:info="cardinfo"></Card>
	</div>
</template>

<script>
	import {
		getList
	} from '@/api/table'
	import Confirm from '../../components/Modal/Confirm.vue';
	import Agent from '../../components/Modal/Agent.vue';
		import Card from '../../components/Modal/Card.vue';
	export default {
		data() {
			return {
				form: {
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
				currentPage4: 1,
				showConfirm: false,
				showPwd: false,
				showCard: false,
				cardinfo:{
					id:0
				},
				info:{
					okimg: require('../../icons/ok_icon.png')
				},
				clearinfo: {
					title: '确定清除代领人？',
					desp: '是否确定清除所选身份证的代领人信息',
					okimg: require('../../icons/ok_icon.png')
				},
				batchcardinfo: {
					title: '确认批量出证？',
					desp: '是否确认将所选身份证批量导出至回收箱',
					okimg: require('../../icons/ok_icon.png')
				},
				batchclearinfo: {
					title: '确定批量清除代领人？',
					desp: '是否确定批量清除所选身份证的代领人信息',
					okimg: require('../../icons/ok_icon.png')
				}
			}
		},
		components: {
			Confirm,
			Agent,
			Card
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
				console.log("onCancel");
				this.$refs.form.resetFields();
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
				this.$router.push({
					name: 'sdetail',
					params: {
						id: id
					}
				})
			},
			printcard(id) {
				this.cardinfo.id=id;
				this.showCard=!this.showCard
			},
			appointagent(id) {
				this.showPwd = !this.showPwd;
			},
			deleteagent(id) {
				this.showConfirm = !this.showConfirm;
				this.info=this.clearinfo;
			},
			togglecom(ele)
			{
				this.info=ele;
				this.showConfirm = !this.showConfirm;
			},
			closeagent: function(evt) {
				if (evt.id == 1) {
					//成功
				}
				this.showPwd = !this.showPwd;
			},
			closeme: function(evt) {
				if (evt.id == 1) {
					//成功
				}
				this.showConfirm = !this.showConfirm;
			},
			closecard: function(evt) {
				if (evt.id == 1) {
					//成功
				}
				this.showCard = !this.showCard;
			},
		},
		
	}
</script>
<style>
	.el-input,
	.el-form-item__content,
	.el-date-editor {
		width: 250px;
	}

	.el-button--primary {
		margin-right: 10px;
	}

	.el-button--primary span {
		color: #FFFFFF;
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
</style>
