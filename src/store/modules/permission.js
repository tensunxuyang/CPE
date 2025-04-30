import auth from '@/plugins/auth'
import router, {
  constantRoutes,
  dynamicRoutes
} from '@/router'
import {
  getRouters
} from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [
      // {
      //   component: "Layout",
      //   hidden: false,
      //   meta: {
      //     icon: require("../../assets/icon/zhuye.png"),
      //     link: null,
      //     noCache: false,
      //     title: "首页"
      //   },
      //   name: "index",
      //   path: "/systemState/index",
      // },
      {
        alwaysShow: true,
        component: "Layout",
        hidden: false,
        children: [
          {
            component: "systemState/vanStatus",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong.png"),
              link: null,
              noCache: false,
              title: "WAN状态信息"
            },
            name: "vanStatus",
            path: "/systemState/vanStatus",
          },
          {
            component: "systemState/dhcpStatus",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong2.png"),
              link: null,
              noCache: false,
              title: "Dhcp状态信息"
            },
            name: "dhcpStatus",
            path: "/systemState/dhcpStatus",
          },
          {
            component: "systemState/wifi2.4G",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong3.png"),
              link: null,
              noCache: false,
              title: "2.4G Wi-Fi状态信息"
            },
            name: "wifi2.4G",
            path: "/systemState/wifi2.4G",
          },
          {
            component: "systemState/wifi5G",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong4.png"),
              link: null,
              noCache: false,
              title: "5G Wi-Fi状态信息"
            },
            name: "wifi5G",
            path: "/systemState/wifi5G",
          },
          {
            component: "systemState/deviceInfo",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong5.png"),
              link: null,
              noCache: false,
              title: "设备信息"
            },
            name: "deviceInfo",
            path: "/systemState/deviceInfo",
          }
        ],
        meta: {
          icon: require("../../assets/icon/xitong.png"),
          link: null,
          noCache: false,
          title: "系统状态"
        },
        name: "SystemState",
        path: "/systemState",
        redirect: "noRedirect"
      },
      {
        alwaysShow: true,
        component: "Layout",
        hidden: false,
        children: [
          {
            component: "networkManage/mobileNetwork",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong.png"),
              link: null,
              noCache: false,
              title: "移动网络配置"
            },
            name: "mobileNetwork",
            path: "/networkManage/mobileNetwork",
          },
          {
            component: "networkManage/apnConfig",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong2.png"),
              link: null,
              noCache: false,
              title: "APN配置"
            },
            name: "apnConfig",
            path: "/networkManage/apnConfig",
          },
          {
            component: "networkManage/simFunction",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong3.png"),
              link: null,
              noCache: false,
              title: "SIM功能"
            },
            name: "simFunction",
            path: "/networkManage/simFunction",
          },
          {
            component: "networkManage/ flowSet",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong4.png"),
              link: null,
              noCache: false,
              title: "流量设置"
            },
            name: " flowSet",
            path: "/networkManage/flowSet",
          },
          // {
          //   component: "monitor/server/wifi5G",
          //   hidden: false,
          //   meta: {
          //     icon: "server",
          //     link: null,
          //     noCache: false,
          //     title: "网络加速"
          //   },
          //   name: "wifi5G",
          //   path: "/network/wifi5G",
          // }
        ],
        meta: {
          icon: require("../../assets/icon/xitong.png"),
          link: null,
          noCache: false,
          title: "网络管理"
        },
        name: "networkManage",
        path: "/networkManage",
        redirect: "noRedirect"
      },
      {
        alwaysShow: true,
        component: "Layout",
        hidden: false,
        children: [
          {
            component: "wifiConfig/wifi2.4G",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong.png"),
              link: null,
              noCache: false,
              title: "2.4G WI-FI配置"
            },
            name: "wifi2.4G",
            path: "/wifiConfig/wifi2.4G",
          },
          {
            component: "wifiConfig/wifi5G",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong2.png"),
              link: null,
              noCache: false,
              title: "5G WI-FI配置"
            },
            name: "wifi5G",
            path: "/wifiConfig/wifi5G",
          },
          {
            component: "wifiConfig/wpsConfig",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong3.png"),
              link: null,
              noCache: false,
              title: "WPS配置"
            },
            name: "wpsConfig",
            path: "/wifiConfig/wpsConfig",
          },
          // {
          //   component: "monitor/server/wifi5G",
          //   hidden: false,
          //   meta: {
          //     icon: "server",
          //     link: null,
          //     noCache: false,
          //     title: "网络加速"
          //   },
          //   name: "wifi5G",
          //   path: "/network/wifi5G",
          // }
        ],
        meta: {
          icon: require("../../assets/icon/xitong.png"),
          link: null,
          noCache: false,
          title: "WI-FI配置"
        },
        name: "wifiConfig",
        path: "/wifiConfig",
        redirect: "noRedirect"
      },
      {
        alwaysShow: true,
        component: "Layout",
        hidden: false,
        children: [
          {
            component: "deviceConfig/dhcpConfig",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong.png"),
              link: null,
              noCache: false,
              title: "DHCP配置"
            },
            name: "dhcpConfig",
            path: "/deviceConfig/dhcpConfig",
          },
          // {
          //   component: "deviceConfig/routerConfig",
          //   hidden: false,
          //   meta: {
          //     icon: require("../../assets/icon/xitong2.png"),
          //     link: null,
          //     noCache: false,
          //     title: "路由配置"
          //   },
          //   name: "routerConfig",
          //   path: "/deviceConfig/routerConfig",
          // },
      
        ],
        meta: {
          icon: require("../../assets/icon/xitong.png"),
          link: null,
          noCache: false,
          title: "设备配置"
        },
        name: "deviceConfig",
        path: "/deviceConfig",
        redirect: "noRedirect"
      },
      // {
      //   alwaysShow: true,
      //   component: "Layout",
      //   hidden: false,
      //   children: [
      //     {
      //       component: "firewall/dmz",
      //       hidden: false,
      //       meta: {
      //         icon: require("../../assets/icon/xitong.png"),
      //         link: null,
      //         noCache: false,
      //         title: "dmz"
      //       },
      //       name: "dmz",
      //       path: "/firewall/dmz",
      //     },
      //     {
      //       component: "firewall/portForwarding",
      //       hidden: false,
      //       meta: {
      //         icon: require("../../assets/icon/xitong2.png"),
      //         link: null,
      //         noCache: false,
      //         title: "端口转发"
      //       },
      //       name: "portForwarding",
      //       path: "/firewall/portForwarding",
      //     },
      //     {
      //       component: "firewall/filterRules",
      //       hidden: false,
      //       meta: {
      //         icon: require("../../assets/icon/xitong3.png"),
      //         link: null,
      //         noCache: false,
      //         title: "过滤规则"
      //       },
      //       name: "filterRules",
      //       path: "/firewall/filterRules",
      //     },
      //     {
      //       component: "firewall/urlFilter",
      //       hidden: false,
      //       meta: {
      //         icon: require("../../assets/icon/xitong4.png"),
      //         link: null,
      //         noCache: false,
      //         title: "URL过滤"
      //       },
      //       name: "urlFilter",
      //       path: "/firewall/urlFilter",
      //     },
      //     {
      //       component: "firewall/ipmacBind",
      //       hidden: false,
      //       meta: {
      //         icon: require("../../assets/icon/xitong5.png"),
      //         link: null,
      //         noCache: false,
      //         title: "IP MAC绑定"
      //       },
      //       name: "ipmacBind",
      //       path: "/firewall/ipmacBind",
      //     },
      //     {
      //       component: "firewall/ddosProtection",
      //       hidden: false,
      //       meta: {
      //         icon: require("../../assets/icon/xitong6.png"),
      //         link: null,
      //         noCache: false,
      //         title: "DDOS防护"
      //       },
      //       name: "ddosProtection",
      //       path: "/firewall/ddosProtection",
      //     },
      //     {
      //       component: "monitor/firewall/remoteNetwork",
      //       hidden: false,
      //       meta: {
      //         icon: require("../../assets/icon/xitong7.png"),
      //         link: null,
      //         noCache: false,
      //         title: "远程网络设置"
      //       },
      //       name: "remoteNetwork",
      //       path: "/firewall/remoteNetwork",
      //     },
      //     {
      //       component: "firewall/accessControl",
      //       hidden: false,
      //       meta: {
      //         icon: require("../../assets/icon/xitong.png"),
      //         link: null,
      //         noCache: false,
      //         title: "访问控制"
      //       },
      //       name: "accessControl",
      //       path: "/firewall/accessControl",
      //     },
          
          
          
      //   ],
      //   meta: {
      //     icon: require("../../assets/icon/xitong.png"),
      //     link: null,
      //     noCache: false,
      //     title: "防火墙"
      //   },
      //   name: "firewall",
      //   path: "/firewall",
      //   redirect: "noRedirect"
      // },
      {
        alwaysShow: true,
        component: "Layout",
        hidden: false,
        children: [
          {
            component: "systemManage/systemSettings",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong.png"),
              link: null,
              noCache: false,
              title: "系统设置"
            },
            name: "systemSettings",
            path: "/systemManage/systemSettings",
          },
          {
            component: "system/systemLog",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong2.png"),
              link: null,
              noCache: false,
              title: "系统日志"
            },
            name: "systemLog",
            path: "/systemManage/systemLog",
          },
          {
            component: "systemManage/systemUpgrade",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong3.png"),
              link: null,
              noCache: false,
              title: "系统升级"
            },
            name: "systemUpgrade",
            path: "/systemManage/systemupgrade",
          },
          {
            component: "systemManage/networkTools",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong4.png"),
              link: null,
              noCache: false,
              title: "网络工具"
            },
            name: "networkTools",
            path: "/systemManage/networkTools",
          },
          {
            component: "systemManage/rebootDevice",
            hidden: false,
            meta: {
              icon: require("../../assets/icon/xitong5.png"),
              link: null,
              noCache: false,
              title: "重启设备"
            },
            name: "rebootDevice",
            path: "/systemManage/rebootDevice",
          },
          


        ],
        meta: {
          icon: require("../../assets/icon/xitong.png"),
          link: null,
          noCache: false,
          title: "系统管理"
        },
        name: "systemManage",
        path: "/system Manage",
        redirect: "noRedirect"
      },
      {
        component: "Layout",
        hidden: false,
        meta: {
          icon: require("../../assets/icon/xitong.png"),
          link: null,
          noCache: false,
          title: "参数注解"
        },
        name: "parNote",
        path: "/systemState/parNote",
      },
    ]
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes)
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      state.topbarRouters = routes
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({
      commit
    }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          console.log(res);
          // res.data = [
          //   {
          //     alwaysShow: true,
          //     children: [],
          //     hidden: false,
          //     meta: {
          //       icon: "system",
          //       link: null,
          //       noCache: false,
          //       title: "系统状态"
          //     },
          //     name: "System",
          //     path: "/system",
          //     redirect: "noRedirect"
          //   }
          // ]
          const sdata = JSON.parse(JSON.stringify(res.data))
          const rdata = JSON.parse(JSON.stringify(res.data))
          const sidebarRoutes = filterAsyncRouter(sdata)
          const rewriteRoutes = filterAsyncRouter(rdata, false, true)
          const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
          rewriteRoutes.push({
            path: '*',
            redirect: '/404',
            hidden: true
          })
          console.log(sidebarRoutes);
          router.addRoutes(asyncRoutes);
          commit('SET_ROUTES', rewriteRoutes)
          commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
          commit('SET_DEFAULT_ROUTES', sidebarRoutes)
          commit('SET_TOPBAR_ROUTES', sidebarRoutes)
          resolve(rewriteRoutes)
        })
      })
    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve)
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`)
  }
}

export default permission
