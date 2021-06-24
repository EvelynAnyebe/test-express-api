import express from 'express';
const router = express.Router();

import { getNotes, getNote, createNote } from '../controllers/note.js';

router.get('/', getNotes);

router.get('/:id', getNote);

router.post('/', createNote);

export default router;
