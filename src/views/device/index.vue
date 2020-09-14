<template>
	<div class="page">
		<span>当前设备状态：{{Status}}</span>
		<img class="img-status" src="../../icons/reflash_icon.png" />
		<img class="img-btn" src="../../icons/stop_icon.png" />

	</div>
</template>

<script>
	export default {
		name: "device",
		data() {
			return {
				Status: '使用中'
			}
		}
	}
</script>

<style>
	.page {
		margin-top: 205px;
		justify-content: center;
		flex-direction: row;
		text-align: center !important;
		align-items: center;
		height: 64px;
		/* vertical-align: middle; */
		overflow: auto;
		display: flex;
	}

	.page span {
		align-items: center;
		
		font-size: 24px;
		font-family: Source Han Sans SC;
		font-weight: bold;
		line-height: 36px;
		color: #1890FF;
		opacity: 1;
	}

	.img-status {
		width: 32px;
		height: 32px;
		margin-left: 40px;
	}

	.img-btn {
		width: 64px;
		height: 64px;
		margin-left: 40px;
	}
</style>
