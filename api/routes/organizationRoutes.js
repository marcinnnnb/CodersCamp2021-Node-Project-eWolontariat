const express = require('express');
const router = express.Router();
const OrganizationController = require('../controllers/organizationController');
// const auth = require('../middleware/organizationMiddleware');

// Get one organization
router.get('/', OrganizationController.getOneOrganization);

// Get all organizations
router.get('/', OrganizationController.getAllOrganizations);

// Update organization
// router.patch('/', OrganizationController.updateOrganization);

// Create organization
// router.post('/', auth.Userdata, OrganizationController.createOrganization);

//

module.exports = router;
