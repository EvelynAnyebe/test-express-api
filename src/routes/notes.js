import express from 'express';
const router = express.Router();

import {
  getNotes,
  getNote,
  createNote,
  getUserNote,
  updateNote,
} from '../controllers/note.js';

router.get('/', getNotes);
router.get('/:id', getNote);
router.get('/user/:userid', getUserNote);

router.post('/', createNote);

router.put('/:id', updateNote);

export default router;
