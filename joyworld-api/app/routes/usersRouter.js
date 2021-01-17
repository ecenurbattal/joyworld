import express from 'express';
const router = express.Router();

import { getUsers,getUserByUsername,addUser, deleteUser, updateUser } from '../controllers/usersController.js';

router.get('/',getUsers);
router.get('/:username',getUserByUsername);
router.post('/',addUser);
router.put('/:username',updateUser)
router.delete('/:username',deleteUser)


export default router;