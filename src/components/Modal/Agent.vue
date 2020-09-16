<template>
	<div class="modal-backdrop" @click.self="close">
		<div class="modal">
			<div class="modal-header">
				<img class="modal-close" src="../../icons/close_icon.png" @click.stop="close" />
				<img class="modal-icon" src="../../icons/agent_icon.png" />
				<label>指定代领人</label>
			</div>
			<el-form ref="fromInfo" :model="fromInfo" :rules="ruleInline">
				<div class="modal-body uppwd">
					<div class="column-item pwd">
						<label class="left-tip">代领人姓名:</label>
						<el-form-item prop="agentName">
							<div class="right-input">
								<el-input ref="agentName" v-model="fromInfo.agentName" placeholder="请输入代领人姓名" name="agentName" type="text" auto-complete="on" />
							</div>
						</el-form-item>
					</div>
					<div class="column-item pwd">
						<label class="left-tip">与持证人关系:</label>
						<el-form-item prop="agentRelation">
							<div class="right-input">
								<el-input ref="agentRelation" v-model="fromInfo.agentRelation" placeholder="请输入与持证人关系" name="agentRelation" type="text" auto-complete="on" />
							</div>
						</el-form-item>
					</div>
					<div class="column-item pwd">
						<label class="left-tip">代领人身份证号:</label>
						<el-form-item prop="agentCard">
							<div class="right-input">
								<el-input ref="agentCard" v-model="fromInfo.agentCard" placeholder="请输入代领人身份证号" name="agentCard" type="text" auto-complete="on" />
							</div>
						</el-form-item>
					</div>
					<div class="column-item pwd">
						<label class="left-tip">代领人联系方式:</label>
						<el-form-item prop="agentPhone">
							<div class="right-input">
								<el-input ref="agentPhone" v-model="fromInfo.agentPhone" placeholder="请输入代领人联系方式" name="agentPhone" type="text" auto-complete="on" />
							</div>
						</el-form-item>
					</div>
				</div>
				<div class="modal-footer" style="margin-left: 233px;">
					<!-- <img class="btn-close" src="../icons/cancel_icon.png" @click.stop="close" />
					<img class="btn-confirm" v-bind:src="info.okimg" @click.stop="confirm('fromInfo')" /> -->

					<el-button type="primary" class="btn-close" @click.stop="close"></el-button>
					<!-- <Button type="primary" @click.stop="confirm('fromInfo')" class="btn-confirm"></Button> -->
					<el-button class="btn-confirm" @click.native.prevent="confirm('fromInfo')"></el-button>
				</div>
			</el-form>
		</div>

	</div>
</template>

<script>
	import {validNum,validPhone,validIdCard} from '@/utils/validate'
	export default {
		name: 'Agent',
		props: {
			info: {
				id: {
					type: Number,
					default: 0
				},
				okimg: {
					default: require('../../icons/ok_icon.png')
				},
			}
		},
		data() {
			const validateName = (rule, value, callback) => {
				console.log(value.length);
				if (value.length<1||value.length>25) {
					callback(new Error('代领人错误：必须1-25位'))
				} else {
					callback()
				}
			}
			const validateRelation = (rule, value, callback) => {
				if (value.length<1||value.length>25) {
					callback(new Error('与代领人关系错误：必须1-25位'))
				} else {
					callback()
				}
			}
			const validateCard = (rule, value, callback) => {
				
				if (!validIdCard(value)) {
					callback(new Error('身份证号错误：必须15/18数字或者最后一位为X字符'))
				} else {
					callback()
				}
			}
			const validatePhone = (rule, value, callback) => {
				if (!validPhone(value)) {
					callback(new Error('联系方式错误：必须11位数字'))
				} else {
					callback()
				}
			}
			return {
				fromInfo: {
					id: this.info.id,
					agentName: '',
					agentPhone: '',
					agentRelation: '',
					agentCard: ''
				},
				ruleInline: {
					agentName: [{
						required: true,
						validator: validateName,
						trigger: "blur"
					}],
					agentPhone: [{
						required: true,
						validator: validatePhone,
						trigger: "blur"
					}],
					agentRelation: [{
						required: true,
						validator: validateRelation,
						trigger: "blur"
					}],
					agentCard: [{
						required: true,
						validator: validateCard,
						trigger: "blur"
					}]
				}
			}
		},
		methods: {
			close() {
				this.$emit("closepwd");
				this.$refs.fromInfo.resetFields();
			},
			confirm(name) {
				this.$refs[name].validate(valid => {
					if (valid) {
						console.log('验证成功');
						this.$refs.fromInfo.resetFields(); //提交后清空表单信息
					} else {
						
						console.log('验证失败');
						// this.$refs.fromInfo.resetFields(); //提交后清空表单信息
						return false;
					}
				});
			}
			,clear(name)
			{
				this.fromInfo[name]="";
			}
		}
	}
</script>

<style>
.uppwd .pwd .left-tip
{
	font-size: 16px;
	font-family: Source Han Sans SC;
	font-weight: 400;
	line-height: 24px;
	color: #353535;
	opacity: 1;
	padding-top: 8px;
	width: 233px;
}
.pwd .right-input input{
	width:363px;
	padding-left:25px;
}
.rightimg{
	position: relative;
	height: 22px;
	width: 22px;
	top: -32px;
	left: 333px;
}
.about{
	height: 40px;
}

</style>
