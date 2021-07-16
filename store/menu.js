export const state = () => ({
  menu: []
})
export const mutations = {
  setMenu: (state, payload) => {
    state.menu = payload
  }
}
export const actions = {
  async getMenuList({ commit }) {
    const menu = await this.$api.Menu.myMenu()
    commit('setMenu', menu.data)
  }
}
export const getters = {
  menuList: (state) => {
    const menus = [...state.menu]
    const filteredMenus = menus.map((el) => {
      const children = el.children
        ? el.children.filter((child) => {
            return (
              child.Permissions.filter(
                (permission) => permission.name === 'index'
              ).length > 0
            )
          })
        : []
      if (
        !el.children &&
        el.Permissions.filter((permission) => permission.name === 'index')
          .length > 0
      ) {
        return el
      }
      if (el.children && children.length > 0) {
        const menu = { ...el }
        menu.children = children
        return menu
      }
    })
    return filteredMenus
  },
  currentMenu: (state) => {
    let path = window.location.pathname.split('/')
    path.splice(0, 2)
    path = path.join('/')
    path = `/${path}`
    let currentMenu = {
      Permissions: []
    }
    state.menu.map((menu) => {
      if (menu.children) {
        return menu.children.map((child) => {
          if (child.path === path) {
            const _menu = { ...child }
            _menu.Permissions = _menu.Permissions.map((perm) => {
              return perm.name
            })
            currentMenu = _menu
          }
        })
      } else if (menu.path === path) {
        currentMenu = menu
      }
    })
    return currentMenu
  }
}
