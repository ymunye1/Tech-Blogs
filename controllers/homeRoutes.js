const router = require('express').Router();
const { Project, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          // attributes: ['text'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {

      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});


  router.get('/edit/:id', async (req, res) => {
    try {
      const projectData = await Project.findByPk(req.params.id, {
  
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      const project = projectData.get({ plain: true });
  
      res.render('edit', {
        ...project,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  


// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/test', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['name', 'text'],
        },
      ],
      // [{ model: Category},{ model: Tag}],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));


    res.send (projects);
    // Pass serialized data and session flag into template
    // res.render('homepage', { 
    //   projects, 
    //   logged_in: req.session.logged_in 
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
