// this file becomes more useful when authentication is necessary to gain access...
const landingPage = (req, res) => {
  res.send(
    `Welcome to the family information directory! Add '/api-docs' to the url to view API documentation!`
  );
};

module.exports = { landingPage };
