module.exports = (app) => {
  console.log('user route')
  app.get('/user/confirm_user', function (req, res ) {
    /** confirm username or email exist */
    // res.status(200).json({
    //     isSuccess: true,
    //     msg: null,
    //     content: {
    //         token: 'nvoYkjsdfkjndkjhf2983475932rksdnf'
    //     }
    // })

    const users = ['marvenwilsons','jannyann']

    const { user } = req.query

    res.status(200).json({
      isSuccess: users.includes(user) ? true : false,
      msg: users.includes(user) ? {} : `Invalid: Cannot find "${user}" in the database`,
      contents: null
    })
  })

  app.post('/user/signin', function (req, res) {
    res.status(200).json({
      isSuccess: true,
      msg: null,
      content: {
          token: 'nvoYkjsdfkjndkjhf2983475932rksdnf'
      }
    })
  })
}