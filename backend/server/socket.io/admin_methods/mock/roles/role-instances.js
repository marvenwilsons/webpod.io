// sys-2
export default [
    {
        role_name: 'master',
        menus: [
            {
                name: 'Dashboard',
                service: 'dashboard/master'
            },
            {
                name: 'Collections',
                service: 'collections/master'
            },
            {
                name: 'Site',
                service: 'services/master'
            },
            {
                name: 'My Settings',
                service: 'settings/master'
            },
            {
                name: 'Media',
                service: 'media/master'
            },
            {
                name: 'Apps',
                service: 'apps/master'
            },
            {
                name: 'User & Roles',
                service: 'user&roles/master'
            },
            {
                name: 'Layout Builder',
                service: 'layoutBuilder/master'
            }
        ],
    },
    {
        role_name: 'seo-analyst',
        menus: []
    }
]