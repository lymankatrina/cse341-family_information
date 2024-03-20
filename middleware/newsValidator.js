const newsRules = () => {
  const rules = {
    newsTitle: 'required|string|max:60',
    newsBody: 'required|string',
    status: 'required|in:public,private',
    postedBy: 'required|mongoId',
    dateCreated: 'required',
    picture: 'url'
  };
  const sanitizationRules = {
    newsTitle: 'escape|trim',
    newsBody: 'escape|trim'
  };
  return { rules, sanitizationRules };
};

module.exports = {
  newsRules
};
