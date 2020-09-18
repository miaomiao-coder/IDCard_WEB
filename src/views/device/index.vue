<template>
		<div class="page">
			<span class="device-status">当前设备状态：{{Status==1?'使用中':'离线中'}}</span>
			<img class="img-status" src="../../icons/reflash_icon.png" />
			<img class="img-btn" v-if='Status==1' src="../../icons/stop_icon.png" @click='changestatus()' />
			<img class="img-btn" v-else='' src="../../icons/reflash_icon.png" @click='changestatus()' />
<Confirm v-show="showConfirm" v-on:closeme="closeme" v-bind:info="Status==1?stopUserInfo:startUserInfo"></Confirm>
		</div>
</template>

<script>
	import Confirm from '../../components/Modal/Confirm.vue';
	export default {
		name: "device",
		data() {
			return {
				Status: 1,
				showConfirm:false,
				startUserInfo: {
					title: '确认恢复',
					desp: '是否确认恢复设备的使用',
					okimg: require('../../icons/ok_icon.png')
				},
				stopUserInfo: {
					title: '确认停用',
					desp: '是否确认停用设备',
					okimg: require('../../icons/ok_icon.png')
				}
			}
		},
		components: {
			Confirm
		},
		methods: {
			changestatus: function() {
				this.showConfirm = !this.showConfirm;
			},
			closeme: function(evt) {
				if(evt.id==1)
				{
					this.Status = !this.Status
				}
				this.showConfirm = !this.showConfirm;
			}
		}
	}
</script>

<style>
	.page {
		margin-top: 205px;
		justify-content: center;
		flex-direction: row;
		/* text-align: center !important; */
		align-items: center;
		height: 64px;
		/* vertical-align: middle; */
		overflow: auto;
		display: flex;
	}

	.page .device-status {
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
