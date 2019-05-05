const authController = require('./controllers/authentification.js');
require('./services/passport');
const passport = require('passport');

const requireToken = passport.authenticate('jwt', { session: false });
const requireValidCredentials = passport.authenticate('local', {
  session: false
});

module.exports = function(expressServer) {
  expressServer.post('/signup', authController.signup);
  expressServer.get('/ressources', requireToken, function(req, res) {
    res.send({ result: 'private data' });
  });
  expressServer.post('/signin', requireValidCredentials, authController.signin);
};
