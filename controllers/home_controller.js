module.exports.home = function (req, res) {
  return res.end("<h1>Express is up for Codeial!</h1>");
};

module.exports.settings = function (req, res) {
  return res.end("<h1>Codeial Settings!</h1>");
};
