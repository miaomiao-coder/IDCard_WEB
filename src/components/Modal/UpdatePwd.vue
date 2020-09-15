<template>
	<div class="modal-backdrop" @click.self="close">
		<div class="modal">
			<div class="modal-header">
				<img class="modal-close" src="../../icons/close_icon.png" @click.stop="close" />
				<img class="modal-icon" src="../../icons/lock_icon.png" />
				<label>修改密码</label>
			</div>
			<el-form ref="fromInfo" :model="fromInfo" :rules="ruleInline">
				<div class="modal-body uppwd">
					<div class="column-item pwd">
						<label class="left-tip">原密码:</label>
						<el-form-item prop="oldpwd">
							<div class="right-input">
								<el-input ref="oldpwd" v-model="fromInfo.oldpwd" placeholder="请输入原密码" name="oldpwd" type="password" auto-complete="on" />
								<img class="rightimg" src="../../icons/clearinput_icon.png" @click="clear('oldpwd')"/>
							</div>
						</el-form-item>
					</div>
					<div class="column-item pwd">
						<label class="left-tip">新密码:</label>
						<el-form-item prop="newpwd">
							<div class="right-input">
								<el-input ref="newpwd" v-model="fromInfo.newpwd" placeholder="请输入新密码" name="newpwd" type="password" auto-complete="on" />
								<img class="rightimg" src="../../icons/clearinput_icon.png"  @click="clear('newpwd')"/>
							</div>
						</el-form-item>
					</div>
					<div class="column-item pwd">
						<label class="left-tip">确认新密码:</label>
						<el-form-item prop="doublepwd">
							<div class="right-input">
								<el-input ref="doublepwd" v-model="fromInfo.doublepwd" placeholder="请确认新密码" name="doublepwd" type="password" auto-complete="on" />
								<img class="rightimg" src="../../icons/clearinput_icon.png"  @click="clear('doublepwd')"/>
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
	import {validUsername,validPassword} from '@/utils/validate'
	export default {
		name: 'UpdatePwd',
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
			const validateOldPwd = (rule, value, callback) => {
				if (!validPassword(value)) {
					callback(new Error('原密码错误：必须3-16位任意字符'))
				} else {
					callback()
				}
			}
			const validateNewPwd = (rule, value, callback) => {
				
				this.fromInfo.doublepwd = ""
				if (!validPassword(value)) {
					callback(new Error('密码错误：必须3-16位任意字符'))
				} else {
					callback()
				}
			}
			const validateDoublePwd = (rule, value, callback) => {
				if (!validPassword(value)) {
					callback(new Error('密码错误：必须3-16位任意字符'))
				} else if (value != this.fromInfo.newpwd) {
					callback(new Error('与新输入的密码不匹配'))
				} else {
					callback()
				}
			}
			return {
				fromInfo: {
					id: this.info.id,
					oldpwd: '',
					newpwd: '',
					doublepwd: ''
				},
				ruleInline: {
					oldpwd: [{
						required: true,
						validator: validateOldPwd,
						trigger: "blur",
						message:"请填写原密码"
					}],
					newpwd: [{
						required: true,
						validator: validateNewPwd,
						trigger: "blur",
						message:"请填写新密码"
					}],
					doublepwd: [{
						required: true,
						validator: validateDoublePwd,
						trigger: "blur",
						message:"请确认新密码"
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
