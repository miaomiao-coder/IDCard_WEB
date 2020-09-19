<template>
	<div class="modal-backdrop" @click.self="close">
		<div class="modal">
			<div class="modal-header">
				<img class="modal-close" src="../../icons/close_icon.png" @click.stop="close" />
				<img class="modal-icon" src="../../icons/card_icon.png" />
				<label>出证</label>
				
			</div>

			<div class="modal-body">
				<div class="column-item">
					<label class="left-tip spacing">姓名:</label>
					<label class="right-input">{{fromInfo.name}}</label>

				</div>
				<div class="column-item">
					<label class="left-tip">性 别:</label>
					<label class="right-input">{{fromInfo.sex}}</label>
					<div>
						<p class="name">民 族：</p>
						<p >{{fromInfo.zu}}</p>
					</div>

				</div>
				<div class="column-item">
					<label class="left-tip">出 生:</label>
					<label class="right-input">{{fromInfo.birthday}}</label>
				</div>
				<div class="column-item">
					<label class="left-tip">住 址:</label>
					<label class="right-input">{{fromInfo.address}}</label>
				</div>
				<div class="column-item">
					<label class="left-tip">签发机关:</label>
					<label class="right-input">{{fromInfo.country}}</label>
				</div>
				<div class="column-item">
					<label class="left-tip">有限期限:</label>
					<label class="right-input">{{fromInfo.timetype}}</label>
				</div>
				<div class="column-item" >
					<label class="left-tip" style="font-size: 20px;line-height: 29px;">身份证号:</label>
					<label class="right-input" style="font-size: 20px;line-height: 29px;">{{fromInfo.cardnum}}</label>
				</div>
			<img class="cardimg" src="../../assets/img/6.jpg" />
			</div>
			<div class="modal-footer">

				<el-button type="primary" class="btn-close" @click.stop="close"></el-button>
				<el-button class="btn-confirm" @click.native.prevent="confirm('fromInfo')"></el-button>
			</div>
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
				}
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
					name: '张三',
					sex: '男',
					zu: '汉',
					birthday: 'ddd',
					address: '浙江省温州市苍南县灵溪镇双洋村163号',
					country: '苍南县公安局',
					timetype: '永久',
					cardnum: '330327196404044293'
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
				this.$emit("closecard", {
					id: 0
				});
			},
			confirm(name) {
				this.$emit("closecard", {
					id: 1
				});
			}
		}
	}
</script>

<style scoped>
	.modal {
		width: 730px;
		height: 508px;
	}
	.modal .cardimg{
		width:120px;
		height: 144px;
		position: absolute;
		left:487px;
		top:10px;
	}

	.modal-backdrop .modal-header {
		width: 100%;
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
		margin-left: 145px;
		margin-right: 145px;
		margin-top:32px;
		width: 420px;
	}

	.modal-backdrop .modal-body {
		margin-top: 50px;
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
		background: url(../../icons/card.png) no-repeat;
		background-size: cover;
	}

	.left-tip {
		padding-right: 20px;
		font-size: 16px;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 24px;
		color: #1890FF;
		width: 225px;
		text-align: right;
		justify-content: center;
	}
.spacing{
	/* word-spacing:8px; letter-spacing: 1px; */
}
	.column-item {
		/* margin-top: 20px; */
		display: flex;
		height: auto;
	}

	.column-item>div {
		display: flex;
		position: absolute;
		left: 273px;
	}

	.column-item p {

		font-size: 16px;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 24px;
	}

	.column-item .name {
		color: #1890FF;
	}

	.right-input {
		align-items: center;
		font-size: 16px;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 24px;
		color: #353535;
		text-align: left;
		justify-content: center;
		width: 240px;
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
	.el-input .el-input__inner {
		padding-left: 48px;
	}
</style>
