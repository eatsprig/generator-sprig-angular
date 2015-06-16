var express = require('express')<% if (googleSignin) { %>
  , cookieParser = require('cookie-parser')
  , cookieSession = require('cookie-session')
  , passport = require('passport')
  , util = require('util')
  , GoogleStrategy = require('passport-google-oauth2').Strategy<% } %>;
<% if (googleSignin) { %>
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: (process.env.GOOGLE_OAUTH_CALLBACK_HOST || 'http://localhost:9000') + '/auth/google_oauth2/callback',
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      // TODO: Possibly change this to lookup who has access on sprig-server
      // Hard-coded check to see if this is a sprig email
      // The message is not currently rendered anywhere
      if (!profile || profile.email.toLowerCase().search('@sprig.com') === -1) {
        return done(null, false, { message: 'This email is not associated with Sprig' });
      }
      return done(null, profile);
    });
  }
));

<% } %>var app = express();

// Middleware for redirecting http to https
app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

<% if (googleSignin) { %>app.use(cookieParser());
app.use(cookieSession({
  keys: [process.env.GOOGLE_OAUTH_COOKIE_SECRET || 'secret']
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(req, res) {
  res.sendFile('dist/login.html', { root: __dirname });
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

// Authenticate with Google to get basic email info
app.get('/auth/google_oauth2',
    passport.authenticate('google', {
        scope: [ 'email' ]
}));

// Redirect based on result of authentication
app.get('/auth/google_oauth2/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
}));

<% } %>app.use(express.static('dist'));

app.listen(process.env.PORT || 9000);
console.log("Starting server...");
<% if (googleSignin) { %>
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}
<% } %>
