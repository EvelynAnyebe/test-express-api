import express from 'express';
const router = express.Router();

import {
  getNotes,
  getNote,
  createNote,
  getUserNote,
  updateNote,
  deleteNote,
  searchNote
} from '../controllers/note.js';

router.get('/', getNotes);
router.get('/:id', getNote);
router.get('/user/:userid', getUserNote);
router.get('/search/:searchValue', searchNote);

router.post('/', createNote);

router.put('/', updateNote);
router.delete('/', deleteNote);

export default router;
