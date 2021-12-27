
const procedures = require('./index')

module.exports = async (dashboard) => ({

  onMount() {
    console.log('on Mount')
    // dashboard.exec({
    //   location: 'sidebar',
    //   action: 'open',
    //   payload: "test"
    // })
    // dashboard.send('media')
  },

  async onRequest(request_name,user) {
    // console.log('** on request', request_name, user)
    switch(request_name) {
      case 'getUserServices':
        const userServices = await procedures()[request_name]()

        dashboard
          .exec('dash','setUser',{
            name: userServices.name,
            email: userServices.email,
            avatar: userServices.avatar
          })
          .exec('topbar',   'setMsg',       userServices.app_name)
          .exec('service',  'setServices',  userServices.services)
          .exec('menu',     'setItems',     userServices.menu_items)
          .exec('menu',     'setSelected',  'Dashboard')
          .exec('dash', 'alert', `
          <h1>Hello World</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
          obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
          nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
          tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
          quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
          sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
          recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
          minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
          quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
          fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
          consequuntur! Commodi minima excepturi repudiandae velit hic maxime
          doloremque. Quaerat provident commodi consectetur veniam similique ad 
          earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
          fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
          suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
          modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
          totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
          quasi aliquam eligendi, placeat qui corporis!</p>
          `)
          // .exec('sidebar',  'pushNotification', {
          //     app: `System`,
          //     time: '2:20 PM',
          //     type: 'text, // text, html, image, video, sound,
          //     body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
          // })

      break;
    }
  },

  onTokenExpire() {
    console.log('token expired')
  },

  onSideBarItemClick() {

  },

  onPodCommand() {
    // when admin clicks or emits something from a service ui
  },

  beforeLogout() {
    console.log('** before logout')
  },

  onLogout() {
    console.log('** on logout')
  },

  onMediaRequest() {

  },

})