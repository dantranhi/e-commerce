import express from 'express';

import AuthController from '../controllers/AuthController.js'
import {userValidator} from '../utils/dataValidator.js'


const router = express.Router();

router.post('/login', AuthController.login)
router.post('/register',...userValidator, AuthController.register)



router.post('/logout', AuthController.logout)
router.get('/', AuthController.getAll)

export default router