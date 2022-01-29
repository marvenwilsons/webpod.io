// sys-3
module.exports = [
    {
        serviceName: 'dashboard',
        versions: [
            {
                versionName: 'master',
                body: {
                    view: '', // points to an app name
                    viewConfig: 'empty',
                    viewData:'', // points to an app instance, it will be provided by the instancer
                    viewHooks:'',
                    paneConfig: '',
                    paneHooks: ''
                }
            }
        ]
    },
    {
        serviceName: 'Collections',
        versions: [
            {
                versionName: 'master',
                body: {
                    
                }
            }
        ]
    }
]