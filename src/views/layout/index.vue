<template>
	<div :class="classObj" class="app-wrapper">
		<div class="banner-top">
			<div class="banner-title">
				<img src="../../assets/imgbanner/country.png" />
				<span class="webtip">居民身份证自助取证终端后台</span>
			</div>
			<div class="banner-btn">
				<img src="../../assets/imgbanner/upname.png" @click="closename" />
				<img src="../../assets/imgbanner/uppwd.png" @click="closepwd" />
				<img src="../../assets/imgbanner/logout.png" @click="logout" />
			</div>
		</div>
		<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<Sidebar class="sidebar-container" />

		<div class="main-container">
			<div :class="{'fixed-header':fixedHeader}">
				<navbar />
			</div>
			<app-main />
		</div>
		<UserName v-show="showName" v-on:closename="closename" v-bind:info="info"></UserName>
		<Pwd v-show="showPwd" v-on:closepwd="closepwd" v-bind:info="info"></Pwd>

	</div>
</template>

<script>
	import AppMain from './AppMain.vue'
	import Navbar from './Navbar.vue'
	import Sidebar from './Sidebar'
	import ResizeMixin from './mixin/ResizeHandler'
	import UserName from '../../components/Modal/UpdateUserName.vue';
	import Pwd from '../../components/Modal/UpdatePwd.vue';

	export default {
		name: 'Layout',
		data() {
			return {
				showName: false,
				showPwd: false,
				info: {
					okimg: require('../../icons/ok_icon.png')
				}
			}
		},
		components: {
			Navbar,
			Sidebar,
			AppMain,
			UserName,
			Pwd
		},
		mixins: [ResizeMixin],
		computed: {
			sidebar() {
				return this.$store.state.app.sidebar
			},
			device() {
				return this.$store.state.app.device
			},
			fixedHeader() {
				return this.$store.state.settings.fixedHeader
			},
			classObj() {
				return {
					hideSidebar: !this.sidebar.opened,
					openSidebar: this.sidebar.opened,
					withoutAnimation: this.sidebar.withoutAnimation,
					mobile: this.device === 'mobile'
				}
			}
		},
		methods: {
			handleClickOutside() {
				this.$store.dispatch('app/closeSideBar', {
					withoutAnimation: false
				})
			},
			async logout() {
				await this.$store.dispatch('user/logout')
				this.$router.push(`/login?redirect=${this.$route.fullPath}`)
			},
			closename: function() {
				this.showName = !this.showName;
			},
			closepwd: function() {
				this.showPwd = !this.showPwd;
			},
		}
	}
</script>
<style>
	.banner-top {
		width: 100%;
		margin: 0 auto;
		height: 53px;
		display: flex;
		align-items: center;
		padding-left: 30px;
		padding-right: 65px;
		justify-content: space-between;
		background-color: #5D5D5D;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
		position: fixed;
	}

	.banner-top .banner-title {
		display: flex;
		align-items: center;
		height: 37px;
	}

	.banner-top .banner-title .webtip {
		font-size: 16px;
		font-family: Source Han Sans SC;
		font-weight: 500;
		line-height: 24px;
		color: #FFFFFF;
		text-align: center;
		padding-left: 11px;
	}

	.banner-top .banner-title img {
		width: 36px;
		height: 37px;
	}

	.banner-btn img {
		width: 68px;
		height: 19px;
		margin-left: 15px;
	}

	#app .sidebar-container {
		top: 53px;
	}

	#app .main-container {
		width:96%;
		position: fixed;
		top: 53px;
		left: 0;
		bottom: 0;
		overflow: scroll;
	}
</style>
<style lang="scss" scoped>
	@import "~@/styles/mixin.scss";
	@import "~@/styles/variables.scss";

	.app-wrapper {
		@include clearfix;
		position: relative;
		height: 100%;
		width: 100%;

		&.mobile.openSidebar {
			position: fixed;
			top: 0;
		}
	}

	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		top: 0;
		height: 100%;
		position: absolute;
		z-index: 999;
	}

	.fixed-header {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 9;
		width: calc(100% - #{$sideBarWidth});
		transition: width 0.28s;
	}

	.hideSidebar .fixed-header {
		width: calc(100% - 54px)
	}

	.mobile .fixed-header {
		width: 100%;
	}
</style>
