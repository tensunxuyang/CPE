import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: () => import('@/views/login'),
    hidden: true
    // path: '',
    // component: Layout,
  
    // children: [
    //   {
    //     path: 'index',
    //     component: () => import('@/views/index_v1'),
    //     name: 'Index',
    //     meta: { title: '首页', icon: 'dashboard', affix: true }
    //   }
    // ]
  },
  {
    path: '/systemState',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index_v1'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      },
      {
        path: 'parNote',
        component: () => import('@/views/page/parNote.vue'),
        name: 'parNote',
        meta: { title: '参数注解', icon: 'dashboard', affix: true }
      },
      {
        path: 'vanStatus',
        component: () => import('@/views/page/systemState/vanStatus.vue'),
        name: 'vanStatus',
        meta: { title: 'WAN状态信息', icon: 'user' }
      },
      {
        path: 'dhcpStatus',
        component: () => import('@/views/page/systemState/dhcpStatus.vue'),
        name: 'dhcpStatus',
        meta: { title: 'DHCP状态信息', icon: 'user' }
      },
      {
        path: 'wifi2.4G',
        component: () => import('@/views/page/systemState/wifi2.4G.vue'),
        name: 'wifi2.4G',
        meta: { title: '2.4G WI-FI状态信息', icon: 'user' }
      },
      {
        path: 'wifi5G',
        component: () => import('@/views/page/systemState/wifi5G.vue'),
        name: 'wifi5G',
        meta: { title: '5G WI-FI状态信息', icon: 'user' }
      },
      {
        path: 'deviceInfo',
        component: () => import('@/views/page/systemState/deviceInfo.vue'),
        name: 'deviceInfo',
        meta: { title: '设备信息', icon: 'user' }
      },
    ]
  },
  {
    path: '/networkManage',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'mobileNetwork',
        component: () => import('@/views/page/networkManage/mobileNetwork.vue'),
        name: 'mobileNetwork',
        meta: { title: '移动网络配置', icon: 'user' }
      },
      {
        path: 'apnConfig',
        component: () => import('@/views/page/networkManage/apnConfig.vue'),
        name: 'apnConfig',
        meta: { title: 'APN配置', icon: 'user' }
      },
      {
        path: 'simFunction',
        component: () => import('@/views/page/networkManage/simFunction.vue'),
        name: 'simFunction',
        meta: { title: 'SIM功能', icon: 'user' }
      },
      {
        path: 'flowSet',
        component: () => import('@/views/page/networkManage/flowSet.vue'),
        name: 'dhcp',
        meta: { title: '流量设置', icon: 'user' }
      },
    ]
  },
  {
    path: '/wifiConfig',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'wifi2.4G',
        component: () => import('@/views/page/wifiConfig/wifi2.4G.vue'),
        name: 'wifi2.4G',
        meta: { title: '2.4G WI-FI配置', icon: 'user' }
      },
      {
        path: 'wifi5G',
        component: () => import('@/views/page/wifiConfig/wifi5G.vue'),
        name: 'wifi5G',
        meta: { title: '5G WI-FI配置', icon: 'user' }
      },
      {
        path: 'wpsConfig',
        component: () => import('@/views/page/wifiConfig/wpsConfig.vue'),
        name: 'wpsConfig',
        meta: { title: 'WPS配置', icon: 'user' }
      },
    ]
  },
  {
    path: '/deviceConfig',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'dhcpConfig',
        component: () => import('@/views/page/deviceConfig/dhcpConfig.vue'),
        name: 'dhcpConfig',
        meta: { title: 'DHCP配置', icon: 'user' }
      },
      {
        path: 'routerConfig',
        component: () => import('@/views/page/deviceConfig/routerConfig.vue'),
        name: 'routerConfig',
        meta: { title: '路由配置', icon: 'user' }
      },
    ]
  },
  {
    path: '/firewall',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'dmz',
        component: () => import('@/views/page/firewall/dmz.vue'),
        name: 'DMZ',
        meta: { title: 'DMZ', icon: 'user' }
      },
      {
        path: 'portForwarding',
        component: () => import('@/views/page/firewall/portForwarding.vue'),
        name: 'portForwarding',
        meta: { title: '端口转发', icon: 'user' }
      },
      {
        path: 'filterRules',
        component: () => import('@/views/page/firewall/filterRules.vue'),
        name: 'filterRules',
        meta: { title: '过滤规则', icon: 'user' }
      },
      {
        path: 'urlFilter',
        component: () => import('@/views/page/firewall/urlFilter.vue'),
        name: 'urlFilter',
        meta: { title: 'URL过滤', icon: 'user' }
      },
      {
        path: 'ipmacBind',
        component: () => import('@/views/page/firewall/ipmacBind.vue'),
        name: 'ipmacBind',
        meta: { title: 'IP MAC绑定', icon: 'user' }
      },
      {
        path: 'ddosProtection',
        component: () => import('@/views/page/firewall/ddosProtection.vue'),
        name: 'ddosProtection',
        meta: { title: 'DDOS防护', icon: 'user' }
      },
      {
        path: 'remoteNetwork',
        component: () => import('@/views/page/firewall/remoteNetwork.vue'),
        name: 'remoteNetwork',
        meta: { title: '远程网络设置', icon: 'user' }
      },
      {
        path: 'accessControl',
        component: () => import('@/views/page/firewall/accessControl.vue'),
        name: 'accessControl',
        meta: { title: '访问控制', icon: 'user' }
      },
    ]
  },
  {
    path: '/systemManage',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'systemSettings',
        component: () => import('@/views/page/systemManage/systemSettings.vue'),
        name: 'systemSettings',
        meta: { title: '系统设置', icon: 'user' }
      },
      {
        path: 'systemLog',
        component: () => import('@/views/page/systemManage/systemLog.vue'),
        name: 'systemLog',
        meta: { title: '系统日志', icon: 'user' }
      },
      {
        path: 'systemUpgrade',
        component: () => import('@/views/page/systemManage/systemUpgrade.vue'),
        name: 'systemUpgrade',
        meta: { title: '系统升级', icon: 'user' }
      },
      {
        path: 'networkTools',
        component: () => import('@/views/page/systemManage/networkTools.vue'),
        name: 'networkTools',
        meta: { title: '网络工具', icon: 'user' }
      },
      {
        path: 'rebootDevice',
        component: () => import('@/views/page/systemManage/rebootDevice.vue'),
        name: 'rebootDevices',
        meta: { title: '重启设备', icon: 'user' }
      },
    ]
  },
  // {
  //   path: '/user',
  //   component: Layout,
  //   hidden: true,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'profile',
  //       component: () => import('@/views/system/user/profile/index'),
  //       name: 'Profile',
  //       meta: { title: '个人中心', icon: 'user' }
  //     }
  //   ]
  // }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
 
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'hash', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
