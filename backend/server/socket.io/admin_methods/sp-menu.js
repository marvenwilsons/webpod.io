async function getMenu(menu_id) {
    console.log(`=== getMenu ${menu_id} ===`)
    // const menus = db("SELECT * FROM menu WHERE id = $1",[menu_id])
    // menus.rows

    const mock_menu = [
        
        {
          menu_id: 'menu-id-lkasdn2',
          menu_name: 'Collections',
        },
        {
          menu_id: 'menu-id-lkasdn3',
          menu_name: 'Site',
        },
        {
          menu_id: 'menu-id-lkasdn4',
          menu_name: 'Services',
        },
        {
          menu_id: 'menu-id-lkasdn5',
          menu_name: 'Settings',
        },
        {
          menu_id: 'menu-id-lkasdn6',
          menu_name: 'Media Files',
        },
        {
          menu_id: 'menu-id-lkasdn7',
          menu_name: 'Apps',
        },
        {
          menu_id: 'menu-id-lkasdn8',
          menu_name: 'User',
        },
        {
          menu_id: 'menu-id-lkasdn9',
          menu_name: 'Roles',
        },
        {
          menu_id: 'menu-id-lkasdn10',
          menu_name: 'Layout Builder',
        },
        {
          menu_id: 'menu-id-lkasdn1',
          menu_name: 'Dashboard',
        },
    ]
    return new Promise((resolve,_) => {
        setTimeout(() => {
            for(let i = 0; i < mock_menu.length; i++) {
              if(mock_menu[i].menu_id == menu_id) {
                  resolve(mock_menu[i])
                  break
              }
            }
        }, 500)
    })
}

module.exports = {
    getMenu
}