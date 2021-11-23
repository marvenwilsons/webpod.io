/**
 * Managing users
 * 1. Create a dashboard user, post
 * 2. Assign services to dashboard user
 * 3. Edit and Update user
 * 4. Delete users
 */
module.exports = {
  userServices: (req, res) => {
    // get services by querying the database using the user value
    res({
      user: 'marvenwilsons',
      app_name: 'sample.com',
      sidebar_items: ['Dashsboard','Collections','Site','Apps','Services','Settings','Media','Uniview'],
      services: []
    })
  }
}