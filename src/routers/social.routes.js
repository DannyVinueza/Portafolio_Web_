const { Router } = require('express')

const router = Router()
const { isAuthenticated } = require('../helpers/validate-auth')

const { renderSocialForm,
        renderAllSocial,
        createNewProfileSocial
} = require('../controllers/social.controller.js')

router.get('/social', isAuthenticated, renderAllSocial)

router.get('/social/add', isAuthenticated, renderSocialForm)
router.post('/social/add', isAuthenticated, createNewProfileSocial)

module.exports = router