// this file becomes more useful when authentication is necessary to gain access...

const checkAuth = (req, res) => {
  res.send(req.oidc.isAuthenticated() ? `Logged In: Authentication successful. Welcome to the family information directory! Add '/api-docs' to the url to view API documentation!` : 'Logged out');
};

const callback = (req, res) => {
  res.send(
    `Authentication successful. Welcome to the family information directory! Add '/api-docs' to the url to view API documentation!`
  );
};

const getProfile = (req, res) => {
  res.status(200).json({
    userProfile: req.oidc.user,
    title: 'Profile page'
  })
};

module.exports = { callback, checkAuth, getProfile };
