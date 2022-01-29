async function getMenu(menu_id) {
    console.log(`=== getMenu ${menu_id} ===`)
    // const menus = db("SELECT * FROM menu WHERE id = $1",[menu_id])
    // menus.rows

    const mock_menu = [
        {
            menu_id: 'menu-id-lkasdn',
            menu_name: 'Dashboard',
            use_instancer: 'no'
        },
        {
          menu_id: 'menu-id-fhtte45y',
          menu_name: 'Collections',
          use_instancer: 'yes'
        },
        {
          menu_id: 'menu-id-fhytj34r',
          menu_name: 'Site',
          use_instancer: 'no'
        },
        {
          menu_id: 'menu-id-fesseft',
          menu_name: 'Services',
          use_instancer: 'yes'
        },
        {
          menu_id: 'menu-id-hfg45uc',
          menu_name: 'Settings',
          use_instancer: 'no'
        },
        {
          menu_id: 'menu-id-lkasdn22',
          menu_name: 'Media',
          use_instancer: 'no'
        },
        {
          menu_id: 'menu-id-lkasdn1',
          menu_name: 'Apps',
          use_instancer: 'yes'
        },
        {
          menu_id: 'menu-id-lkasdn28',
          menu_name: 'User & Roles',
          use_instancer: 'yes'
        },
        {
          menu_id: 'menu-id-lkasdn',
          menu_name: 'Layout Builder',
          use_instancer: 'yes'
        }
    ]
    return new Promise((resolve,_) => {
        setTimeout(() => {
            mock_menu.map(menu => {
                if(menu.menu_id == menu_id) {
                    resolve(menu)
                }
            })
        }, 500)
    })
}

module.exports = {
    getMenu
}