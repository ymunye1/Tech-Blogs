const router = require('express').Router();



router.get('/', async (req, res) => {
  res.render('homepage');
});

router.get('/register', async (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        res.status(500).json(err)
         console.log(err)
    }
    
});


router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        res.status(500).json(err)
         console.log(err)
    }
    
});

router.get('/dashboard', async (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        res.status(500).json(err)
         console.log(err)
    }
    
});

module.exports = router;
 