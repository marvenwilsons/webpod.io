// sys-2
export default [
    {
        role_name: 'master',
        menus: [
            {
                name: 'Dashboard',
                service: 'dashboard/master' // <serviceName>/<serviceVersion>
            },
            {
                name: 'Collections',
                service: 'collections/master',
                useInstancer: true
            },
            {
                name: 'Site',
                service: 'services/master',
                useInstancer: true
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
                service: 'apps/master',
                useInstancer: true
            },
            {
                name: 'User & Roles',
                service: 'user&roles/master'
            },
            {
                name: 'Layout Builder',
                service: 'layoutBuilder/master',
                useInstancer: true,
                instaceTypes: ['Static Layout','Dynamic Layout','List Display Provider']
            }
        ],
    },
    {
        role_name: 'seo-analyst',
        menus: []
    }
]