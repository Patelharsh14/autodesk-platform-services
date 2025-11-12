const express = require('express');

// Import the necessary middleware and service functions
const { authRefreshMiddleware, getHubs, getProjects } = require('../services/aps.js');

let router = express.Router();

// Apply the auth refresh middleware to all /api/hubs routes
router.use('/api/hubs', authRefreshMiddleware);

// Get hubs list 
router.get('/api/hubs', async function (req, res, next) {
    try {
        const hubs = await getHubs(req.oAuthToken);
        res.json(hubs);
    } catch (err) {
        next(err);
    }
});


// Get projects for a specific hub
router.get('/api/hubs/:hub_id/projects', async function (req, res, next) {
    try {
        const projects = await getProjects(req.params.hub_id, req.oAuthToken);
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

// Export the router
module.exports = router;