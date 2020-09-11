<template>
	<div class="modal-backdrop" @click.self="close">
		<div class="modal">
			<div class="modal-header">
				<img class="modal-close" src="../../icons/close_icon.png" @click.stop="close" />
				<img class="modal-icon" src="../../icons/warn_icon.png" />
				<label>{{info.title}}</label>
			</div>
			<el-form ref="fromInfo" :model="fromInfo" :rules="ruleInline">
				<div class="modal-body uppwd">
					<div class="column-item">
						<label class="left-tip"></label>
						<div class="right-input">
							<label>张三</label>
						</div>
					</div>


					<div class="column-item">
						<label class="left-tip">修改用户名:</label>
					<!-- 	<el-form-item prop="newname">
							<span class="svg-container">
								<svg-icon icon-class="user" />
							</span>
							<el-input ref="newname" v-model="fromInfo.username" placeholder="请输入用户名" name="newname" type="text" tabindex="1"
							 auto-complete="on" />
						</el-form-item> -->
						<el-form-item prop="newname">
							<div class="right-input">
							<el-input
							 ref="newname"
                v-model="fromInfo.newname" 
                placeholder="请输入修改后的用户名"
                name="newname"
                type="text"
                auto-complete="on"/>
							<img src="../../icons/user_small.png" />
						</div>
						</el-form-item>
					</div>
				</div>
				<div class="modal-footer">
					<!-- <img class="btn-close" src="../icons/cancel_icon.png" @click.stop="close" />
					<img class="btn-confirm" v-bind:src="info.okimg" @click.stop="confirm('fromInfo')" /> -->

					<el-button type="primary" class="btn-close" @click.stop="close"></el-button>
					<!-- <Button type="primary" @click.stop="confirm('fromInfo')" class="btn-confirm"></Button> -->
					<el-button class="btn-confirm"  @click.native.prevent="confirm('fromInfo')"></el-button>
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
					default: '修改密码'
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
				this.$emit("closemodal");
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
		}
	}
</script>

<style>
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
		font-size: 24px;
		font-family: Source Han Sans SC;
		font-weight: 500;
		line-height: 36px;
		color: #353535;
		opacity: 1;
	}

	.modal-backdrop .modal-footer {
		/* border-top: 1px solid #eee; */
		justify-content: space-between;
		display: flex;
		padding-top: 45px;
		margin-left: 293px;
		margin-bottom: 62px;
		width: 298px;
	}

	.modal-backdrop .modal-body {
		position: relative;
		margin-top: 26px;
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
		margin-top: 20px;
		display: flex;
		height: 40px;
	}

	.right-input {
		align-items: center;
	}

	.right-input label {

		font-size: 24px;
		font-family: Source Han Sans SC;
		font-weight: 500;
		line-height: 36px;
		color: #353535;
		opacity: 1;
	}

	.right-input input {
		width: 298px;
		height: 40px;
		background: #FFFFFF;
		border: 1px solid #707070;
		opacity: 1;
		padding-left: 48px;
	}

	.right-input img {
		position: relative;
		height: 24px;
		width: 22px;
		/* top: 5px;
		left: -285px; */
		top: -32px;
		left: 13px;
	}

.el-form-item__content{
  line-height: 0;
}
.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #606266;
}

.el-form-item__error {
    font-size: 14px;
    left: 0px;
}
</style>
// <style lang="scss" scoped>
// $bg:#53A2FF;
// $dark_gray:#889aa4;
// $light_gray:#eee;

// .modal {
//   .input-container{
//     width: 100%;
//     height: 585px;
//     background: url('../../assets/imglogin/box.png') no-repeat left top;
//     background-size: 100% 100%;
    
//     .inputBox{
//       padding: 48px 0 0 223px;
//     }
//   }

//   .svg-container {
//     color:#499AEF;
//     vertical-align: middle;
//     height: 24px;
//     display: inline-block;
//     .svg-icon{
//       width: 20px;
//       height: 24px;
//     }
//   }
//     .el-form-item {
//       border: 1px solid rgba(255, 255, 255, 0.1);
//       background: #fff;
//       color: #454545;
//       width: 320px;
//       padding: 0 15px;
//     }
//     .el-input {
//       display: inline-block;
//       height: 41px;
//       width: calc(100% - 22px);
  
//       input {
//         background: transparent;
//         border: 0px;
//         // -webkit-appearance: none;
//         border-radius: 0px;
//         padding: 0 5px 0 15px;
//         height: 41px;
//         caret-color: #000;
  
//         // &:-webkit-autofill {
//         //   box-shadow: 0 0 0px 1000px $bg inset !important;
//         //   -webkit-text-fill-color: $cursor !important;
//         // }
//       }
//     }
//   }
//   </style>


