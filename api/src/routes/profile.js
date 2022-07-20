import express from 'express';

import ProfileController from '../controllers/ProfileController.js'
import { verifyUser } from '../utils/verifyToken.js'
import { profileItemValidator } from '../utils/dataValidator.js';

const router = express.Router();

router.post('/:id', verifyUser, ...profileItemValidator, ProfileController.createProfileItem)
router.get('/:id/:profileId', verifyUser, ProfileController.getProfileItem)
router.put('/:id/:profileId', verifyUser, ...profileItemValidator, ProfileController.updateProfileItem)
router.delete('/:id/:profileId', verifyUser, ProfileController.deleteProfileItem)
router.get('/:id', verifyUser, ProfileController.getAllProfileItems)

export default router