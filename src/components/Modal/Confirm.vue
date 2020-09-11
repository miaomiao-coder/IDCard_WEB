<template>
	<div class="cmodal-backdrop" @click.self="closeSelf">
		<div class="modal">
			<div class="modal-header">
				<img src="../../icons/warn_icon.png" />
				<label>{{info.title}}</label>
			</div>
			<div class="modal-body">
				<label>{{info.desp}}</label>
			</div>
			<div class="modal-footer">
				<img class="btn-close" src="../../icons/cancel_icon.png" @click.stop="closeSelf" />
				<img class="btn-confirm" v-bind:src="info.okimg" @click.stop="confirm" />
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'Modal',
		props: {
			info: {
				type: Object,
				// title: {
				// 	type: String,
				// 	default: '确认？'
				// },
				// desp: {
				// 	type: String,
				// 	default: '是否确认'
				// },
				// okimg: {
				// 	default: require('../icons/ok_icon.png')
				// },
			}
		},
		data() {
			return {}
		},
		methods: {
			closeSelf() {
				this.$emit("closeme");
			},
			confirm() {

			}
		}
	}
</script>

<style>
	.cmodal-backdrop {
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

	.cmodal-backdrop .modal {
		overflow-x: auto;
		display: flex;
		flex-direction: column;
		width: 580px;
		height: 280px;
		background: #FFFFFF;
		border: 1px solid #707070;
		box-shadow: 0px 3px 6px rgba(53, 53, 53, 0.21);
		opacity: 1;
		border-radius: 8px;

	}

	.cmodal-backdrop .modal-header {
		/* border-bottom: 1px solid #eee; */
		color: #313131;
		justify-content: flex-start;
		padding-top: 62px;
		display: flex;
	}

	.cmodal-backdrop .modal-header img {
		margin-left: 64px;
		width: 32px;
		height: 32px;
	}

	.cmodal-backdrop .modal-header label {
		padding-left: 12px;
		font-size: 24px;
		font-family: Source Han Sans SC;
		font-weight: 500;
		line-height: 36px;
		color: #353535;
		opacity: 1;
	}

	.cmodal-backdrop .modal-footer {
		/* border-top: 1px solid #eee; */
		justify-content: start;
		display: flex;
		padding-top: 45px;
	}

	.cmodal-backdrop .modal-body label {
		font-size: 24px;
		font-family: Source Han Sans SC;
		font-weight: 400;
		line-height: 36px;
		color: #989898;
		opacity: 1;
	}

	.cmodal-backdrop .modal-body {
		position: relative;
		padding: 14px 10px 0px 108px;
	}

	.cmodal-backdrop .btn-close,
	.cmodal-backdrop .btn-confirm {
		margin-left: 108px;
		width: 116px;
		height: 48px;
		border: none;
		cursor: pointer;
	}
</style>
