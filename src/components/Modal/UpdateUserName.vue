<template>
	<div class="modal-backdrop" @click.self="close">
		<div class="modal">
			<div class="modal-header">
				<img class="modal-close" src="../../icons/close_icon.png" @click.stop="close" />
				<img class="modal-icon" src="../../icons/setting_icon.png" />
				<label>修改用户名</label>
			</div>
			<el-form ref="fromInfo" :model="fromInfo" :rules="ruleInline">
				<div class="modal-body uppwd">
					<div class="title">张三</div>
					<div class="column-item">
						<label class="left-tip">修改用户名:</label>
						<el-form-item prop="newname">
							<div class="right-input">
								<el-input ref="newname" v-model="fromInfo.newname" placeholder="请输入修改后的用户名" name="newname" type="text"
								 auto-complete="on" />
								<img class="leftimg" src="../../icons/user_small.png" />
							</div>
						</el-form-item>
					</div>
				</div>
				<div class="modal-footer">
					<!-- <img class="btn-close" src="../icons/cancel_icon.png" @click.stop="close" />
					<img class="btn-confirm" v-bind:src="info.okimg" @click.stop="confirm('fromInfo')" /> -->

					<el-button type="primary" class="btn-close" @click.stop="Clear"></el-button>
					<!-- <Button type="primary" @click.stop="confirm('fromInfo')" class="btn-confirm"></Button> -->
					<el-button class="btn-confirm" @click.native.prevent="confirm('fromInfo')"></el-button>
				</div>
			</el-form>
		</div>

	</div>
</template>

<script>
	import {
		validUsername
	} from '@/utils/validate'
	export default {
		name: 'Modal',
		props: {
			info: {
				id: {
					type: Number,
					default: 0
				},
				title: {
					type: String,
					default: '修改用户名'
				},
				okimg: {
					default: require('../../icons/ok_icon.png')
				},
			}
		},
		data() {
			const validateUsername = (rule, value, callback) => {
				if (!validUsername(value)) {
					callback(new Error('请输入正确的用户名'))
				} else {
					callback()
				}
			}
			return {
				fromInfo: {
					id: this.info.id,
					newname: ''
				},
				ruleInline: {
					newname: [{
						required: true,
						validator: validateUsername,
						trigger: "blur"
					}]
				}
			}
		},
		methods: {
			close() {
				this.$emit("closename",{id:0});
				this.$refs.fromInfo.resetFields();
			},
			Clear()
			{
				this.$refs.fromInfo.resetFields();
			},
			confirm(name) {
				this.$refs[name].validate(valid => {
					if (valid) {
						console.log('验证成功');
						this.$refs.fromInfo.resetFields(); //提交后清空表单信息
						this.$emit("closename",{id:1});
					} else {
						console.log('验证失败');
						// this.$refs.fromInfo.resetFields(); //提交后清空表单信息
						return false;
					}
				});
			}
		}
	}
</script>

<style >
	.right-input input {
		width: 298px;
		height: 40px;
		background: #FFFFFF;
		border: 1px solid #707070;
		opacity: 1;
		border-radius:0px;
	}
	.modal-backdrop {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index:10000;
		width: 100%;
		margin: 0 auto;
	}

	.modal-backdrop .modal {
		overflow-x: auto;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		border: 1px solid #707070;
		box-shadow: 0px 3px 6px rgba(53, 53, 53, 0.21);
		opacity: 1;
		border-radius: 8px;
		height: auto;
	}

	.modal-backdrop .modal-header {
		width: 730px;
		height: 88px;
		justify-content: flex-start;
		display: flex;
		/* background: url(../icons/top_bg.png) no-repeat; */
		background-color: rgba(83, 162, 255, 1);
		align-items: center;
	}

	.modal-backdrop .modal-header .modal-icon {
		margin-left: 39px;
		width: 32px;
		height: 32px;
	}

	.modal-backdrop .modal-header .modal-close {
		right: -696px;
		width: 10.8px;
		height: 10.8px;
		position: relative;
	}

	.modal-backdrop .modal-header label {
		padding-left: 12px;
		font-size: 18px;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 27px;
		color: #FFFFFF;
		opacity: 1;
	}

	.modal-backdrop .modal-footer {
		justify-content: space-between;
		display: flex;
		padding-top: 13px;
		margin-left: 293px;
		margin-bottom: 62px;
		width: 298px;
	}

	.modal-backdrop .modal-body {
		position: relative;
		/* margin-top: 26px; */
	}

	.modal-backdrop .btn-close,
	.btn-confirm {
		width: 116px;
		height: 48px;
		border: none;
		cursor: pointer;
	}

	.modal-backdrop .btn-close {
		background: url(../../icons/cancel_icon.png) no-repeat;
		background-size: cover;
	}

	.modal-backdrop .btn-confirm {
		background: url(../../icons/ok_icon.png) no-repeat;
		background-size: cover;
	}

	.uppwd {
		padding-top: 56px;
	}

	.uppwd .left-tip {
		padding-right: 20px;
		font-size: 24px;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 36px;
		color: #353535;
		opacity: 1;
		width: 293px;
		text-align: right;
		justify-content: center;
	}

	.column-item {
		/* margin-top: 20px; */
		display: flex;
		height: 72px;
	}

	.right-input {
		align-items: center;
	}

	.modal-body .title {
		padding-left: 293px;
		margin-bottom: 20px;
		font-size: 24px;
		font-family: Source Han Sans SC;
		font-weight: 500;
		line-height: 36px;
		color: #353535;
		opacity: 1;
	}



	.right-input .leftimg {
		position: relative;
		height: 24px;
		width: 22px;
		/* top: 5px;
		left: -285px; */
		top: -32px;
		left: 3px;
	}

	.el-form-item__content {
		line-height: 0;
	}

	.el-checkbox__input.is-checked+.el-checkbox__label {
		color: #606266;
	}

	.el-form-item__error {
		top: 45px;
		font-size: 14px;
		left: 0px;
		font-size: 12px;
		font-family: Source Han Sans SC;
		font-weight: 300;
		line-height: 18px;
		color: #FF0011;
		opacity: 1;
	}
</style>

<style scoped>
.el-input .el-input__inner
{
	padding-left:48px;
}
</style>