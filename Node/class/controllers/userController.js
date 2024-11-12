const db = require('../models')
const passport = require('passport')

module.exports = {
  register: async (req, res) => {
    const { username, email, password, role } = req.body
    console.log('Inside register controller')
    console.log('Form data:', req.body)
    console.log('Uploaded file:', req.file)

    console.log(
      `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum laborum nihil eius doloribus impedit atque cum, molestiae adipisci quis, voluptate possimus iure obcaecati debitis quisquam incidunt. Numquam, ex quisquam qui, mollitia nam nostrum dolor explicabo quibusdam error harum incidunt omnis, est reprehenderit repudiandae! Repellat sapiente, iure hic dolore incidunt sequi ratione distinctio debitis quidem consectetur nam veritatis unde blanditiis non maiores. Adipisci sed cumque delectus quo eos veniam doloremque sit mollitia nostrum laudantium quae reprehenderit ad harum blanditiis, labore vel natus neque accusamus ut eveniet non. Itaque aliquam optio esse culpa, corrupti officiis voluptate. Perferendis quia temporibus molestias possimus in aliquam atque. Accusamus numquam recusandae itaque repellat reiciendis ratione assumenda aliquid excepturi provident maiores doloremque eligendi nemo, nam fuga vero ipsa et temporibus fugiat illum quos voluptas mollitia. Amet praesentium impedit cum dignissimos tenetur inventore nulla explicabo delectus reiciendis, laborum, quis in dolor voluptatem? Deserunt dolorem quasi fuga optio natus quo dignissimos dolore inventore aut obcaecati provident eos, placeat atque laboriosam. Id, praesentium quae fugiat officia quasi tenetur deserunt, iusto ipsam adipisci reiciendis dignissimos debitis necessitatibus vero facere sequi neque! Unde sed ipsam veritatis consequuntur dolores, reprehenderit commodi harum exercitationem, fugiat eius beatae voluptate tenetur quo, sit praesentium blanditiis laboriosam culpa excepturi optio dolorem voluptatem. Aspernatur repellat consectetur rem, culpa explicabo maxime expedita architecto impedit minima maiores nam, ducimus deserunt alias magnam. Sint laborum ratione hic consequuntur dolore, cum placeat nulla, autem nisi pariatur magni odio repellat quae, dolorum quod inventore tenetur ut quidem necessitatibus tempora eveniet! Labore nobis provident optio aspernatur ea incidunt, ratione placeat nesciunt quos dignissimos adipisci impedit ex culpa dolore! Nisi quisquam nemo neque ullam eaque sunt at hic quaerat nam itaque repudiandae soluta, sapiente ad aut debitis, amet consectetur dignissimos omnis! Incidunt soluta magnam fugit aperiam, architecto perspiciatis voluptatem quas ipsa debitis natus recusandae voluptas fugiat tempore illo voluptate corrupti necessitatibus hic molestiae ipsam sed numquam! Autem, maiores, hic delectus facilis, deleniti tenetur inventore modi aperiam deserunt vero veniam minima perspiciatis reprehenderit aut rerum! Mollitia, sapiente quam alias optio tempora quis consequatur dolorem accusantium rerum error rem, consequuntur recusandae dicta praesentium cumque aut placeat? Maxime dolor, vitae amet, eius enim quam tempore corrupti saepe deleniti nemo nam aliquid perferendis nihil. Provident, architecto culpa impedit iste tempore dolores possimus dicta explicabo eius tenetur earum nisi enim ipsam vero delectus assumenda odit non doloremque voluptatem accusantium sequi maiores. Pariatur, esse explicabo. Ipsum temporibus laboriosam sint accusantium odio excepturi nihil neque cumque quidem animi, libero aut hic velit earum voluptas aspernatur unde voluptatem perspiciatis perferendis nostrum ab quas. Quidem enim nostrum, velit quibusdam natus voluptate error ratione animi iste dolore nam deserunt, architecto mollitia numquam saepe molestias, eos tenetur dicta alias aspernatur? Assumenda quae deleniti saepe reprehenderit velit minima. Consequuntur sed quis amet! Vitae laudantium voluptatibus incidunt assumenda ullam accusamus enim excepturi iure eveniet sint quaerat reiciendis soluta nulla ex eius aut, accusantium saepe voluptate in voluptatum! Neque beatae unde, asperiores commodi omnis facilis praesentium at nobis inventore, consectetur corrupti eos, accusamus dolorem soluta exercitationem. Omnis, quaerat magni.`
    )

    const profileImage = req.file
      ? `profileImages/${req.file.filename}`
      : 'profileImages/default.jpeg'

    const user = await db.User.create({
      username,
      email,
      password,
      profileImage,
      role
    })

    console.log(user)

    req.flash('success', `Successfully registered ${username}`)
    res.redirect('/register')
  },

  login: (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: `Welcome back`
    })(req, res, next)
  },

  getUsers: async (req, res) => {
    const users = await db.User.findAll()
    if (!users) {
      req.flash('error', 'No users found')
      return res.redirect('/dashboard')
    }

    res.render('users', { users })
  },
  getUserById: async (req, res) => {
    const users = await db.User.findOne({ where: { id } })
    if (!users) {
      req.flash('error', 'No users found')
      return res.redirect('/dashboard')
    }

    res.render('users', { users })
  },

  logout: (req, res) => {
    req.logout(err => {
      if (err) return res.send('Log out unsuccessful.')
      req.flash('success', 'Logout successful')
      res.redirect('/')
    })
  },

  deleteUsers: async (req, res) => {
    const { id } = req.params

    await db.User.destroy({ where: { id } })

    req.flash('success', 'All users deleted.')
    res.redirect('/dashboard')
  }
}
