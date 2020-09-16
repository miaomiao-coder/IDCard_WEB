<template>
	<div class="hello">
		<button @click="toggleConfirm">打开确认框</button>
		<button @click="toggleModal">修改用户名</button>
		<button @click="togglePwd">修改密码</button>
		<Confirm v-show="showConfirm" v-on:closeme="closeme" v-bind:info="info"></Confirm>
		<Modal v-show="showModal" v-on:closemodal="closemodal" v-bind:info="info"></Modal>
		<Pwd v-show="showPwd" v-on:closepwd="closepwd" v-bind:info="info"></Pwd>
	</div>
</template>


<script>
	import Confirm from '../../components/Modal/Confirm.vue';
	import Modal from '../../components/Modal/UpdateUserName.vue';
	import Pwd from '../../components/Modal/UpdatePwd.vue';
	export default {
		name: 'Home',
		data() {
			return {
				showConfirm: false,
				showModal: false,
				showPwd: false,
				info: {
					title: '确定吗',
					desp: '是否确定操作',
					okimg: require('../../icons/ok_icon.png')
				}
			}
		},
		components: {
			Confirm,
			Modal,
			Pwd
		},
		methods: {
			toggleModal: function() {
				this.showModal = !this.showModal;
			},
			toggleConfirm: function() {
				this.showConfirm = !this.showConfirm;
			},
			closeme: function() {
				this.showConfirm = !this.showConfirm;
			},
			closemodal: function() {
				this.showModal = !this.showModal;
			},
			togglePwd: function() {
				this.showPwd = !this.showPwd;
			},
			closepwd: function() {
				console.log(this.showPwd);
				this.showPwd = !this.showPwd;
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
