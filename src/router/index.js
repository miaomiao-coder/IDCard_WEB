import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/index.vue'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},

	{
		path: '/404',
		component: () => import('@/views/404'),
		hidden: true
	},
	{
		path: '/',
		component: Layout,
		redirect: '/stockdata',
		children: [{
				path: 'stockdata',
				name: 'stockdata',
				component: () => import('@/views/stockData/stockdata'),
				meta: {
					title: '库存数据',
					icon: 'el-icon-s-data',
					activeMenu:'stockdata'
				}
			},
			{
				path: 'stockdata/detail/:id(\\d+)',
				name: 'sdetail',
				component: () => import('@/views/stockData/detail'),
				meta: {
					title: '库存详情',
					icon: 'el-icon-s-data',
					activeMenu:'stockdata'
				},
				hidden: true
			}
		]
	},
	{
		path: '/drawdata',
		component: Layout,
		children: [{
			path: 'list',
			name: 'list',
			component: () => import('@/views/drawdata/list'),
			meta: {
				title: '取证记录',
				icon: 'el-icon-edit-outline',
				activeMenu:'drawdata'
			}
		},
		{
			path: 'detail/:id(\\d+)',
			name: 'detail',
			component: () => import('@/views/drawdata/detail'),
			meta: {
				title: '取证详情',
				icon: 'el-icon-edit-outline',
				activeMenu:'drawdata'
			},
			hidden: true
		}]
	},
	{
		path: '/device',
		component: Layout,
		children: [{
			path: 'device',
			name: 'Device',
			component: () => import('@/views/device/index'),
			meta: {
				title: '设备状态',
				icon: 'el-icon-monitor'
			}
		}]
	},
	// {
	//   path: '/example',
	//   component: Layout,
	//   redirect: '/example/table',
	//   name: 'Example',
	//   meta: { title: '取证记录', icon: 'el-icon-s-help' },
	//   children: [
	//     {
	//       path: 'table',
	//       name: 'Table',
	//       component: () => import('@/views/table/index'),
	//       meta: { title: 'Table', icon: 'table' }
	//     },
	//     {
	//       path: 'tree',
	//       name: 'Tree',
	//       component: () => import('@/views/tree/index'),
	//       meta: { title: 'Tree', icon: 'tree' }
	//     }
	//   ]
	// },
	// {
	//   path: '/nested',
	//   component: Layout,
	//   redirect: '/nested/menu1',
	//   name: 'Nested',
	//   meta: {
	//     title: 'Nested',
	//     icon: 'nested'
	//   },
	//   children: [
	//     {
	//       path: 'menu1',
	//       component: () => import('@/views/nested/menu1/index'), // Parent router-view
	//       name: 'Menu1',
	//       meta: { title: 'Menu1' },
	//       children: [
	//         {
	//           path: 'menu1-1',
	//           component: () => import('@/views/nested/menu1/menu1-1'),
	//           name: 'Menu1-1',
	//           meta: { title: 'Menu1-1' }
	//         },
	//         {
	//           path: 'menu1-2',
	//           component: () => import('@/views/nested/menu1/menu1-2'),
	//           name: 'Menu1-2',
	//           meta: { title: 'Menu1-2' },
	//           children: [
	//             {
	//               path: 'menu1-2-1',
	//               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
	//               name: 'Menu1-2-1',
	//               meta: { title: 'Menu1-2-1' }
	//             },
	//             {
	//               path: 'menu1-2-2',
	//               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
	//               name: 'Menu1-2-2',
	//               meta: { title: 'Menu1-2-2' }
	//             }
	//           ]
	//         },
	//         {
	//           path: 'menu1-3',
	//           component: () => import('@/views/nested/menu1/menu1-3'),
	//           name: 'Menu1-3',
	//           meta: { title: 'Menu1-3' }
	//         }
	//       ]
	//     },
	//     {
	//       path: 'menu2',
	//       component: () => import('@/views/nested/menu2/index'),
	//       name: 'Menu2',
	//       meta: { title: 'menu2' }
	//     }
	//   ]
	// },

	// {
	//   path: 'external-link',
	//   component: Layout,
	//   children: [
	//     {
	//       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
	//       meta: { title: '链接', icon: 'link' }
	//     }
	//   ]
	// },

	// 404 page must be placed at the end !!!
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router
