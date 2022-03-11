const jwt = require('jsonwebtoken');
const organizationModel = require('../models/organizationModel');

exports.loggedOrganization = async function (req, res, next) {
  const organizationToken = req.header('auth-token');
  let organization;
  let verifiedOrganizationId;

  try {
    if (!organizationToken) {
      res.status(401);
      throw new Error('Odmowa dostępu. Operacja możliwa tylko dla zalogowanej organizacji.');
    }
    jwt.verify(organizationToken, process.env.TOKEN_SECRET, function (err, decoded) {
      if (err) {
        throw new Error('Odmowa dostępu. Nieprawidłowy token');
      } else {
        verifiedOrganizationId = decoded._id;
      }
    });

    organization = await organizationModel
      .findById(req.params.id)
      .populate('user')
      .catch((err) => {
        res.status(404);
        throw new Error('Podana organizacja nie istnieje');
      });

    if (!organization) {
      res.status(404);
      throw new Error('Podana organizacja nie istnieje');
    }

    if (verifiedOrganizationId !== organization.user.id) {
      res.status(403);
      throw new Error('Odmowa dostępu. Bak możliwości zmiany danych dla wskazanej organizacji');
    }
    next();
  } catch (error) {
    res.send({ message: error.message });
  }
};
