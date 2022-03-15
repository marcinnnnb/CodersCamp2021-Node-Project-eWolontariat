const express = require('express');
const router = express.Router();
const OrganizationController = require('../controllers/organizationController');
const auth = require('../middleware/organizationMiddleware');

// Get one organization
router.get('/:id', OrganizationController.getOneOrganization);

// Get all organizations
router.get('/', OrganizationController.getAllOrganizations);

// Create organization
router.post('/', OrganizationController.createOrganization);

// Update organization
router.patch('/:id', auth.loggedOrganization, OrganizationController.updateOrganization);

// Get events
router.get('/:id/events', OrganizationController.getOneOrganizationEvents);

module.exports = router;
