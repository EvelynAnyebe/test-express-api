import Note from '../models/note.js';
import { Response } from 'http-status-codez';
import { ErrorResponse, SuccessResponse } from './../utils/appResponse.js';

// GET ALL NOTE
export async function getNotes(req, res) {
  try {
    const notes = await Note.find();
    return res.send(new SuccessResponse(notes));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

// GET A SINGLE NOTE BY ID
export async function getNote(req, res) {
  try {
    const note = await Note.findById(req.params.id);

    res.send(new SuccessResponse(note));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

// CREATE A NOTE
export async function createNote(req, res) {
  try {
    const newNoteObj = new Note(req.body);
    const newNote = await newNoteObj.save();
    res
      .status(Response.HTTP_CREATED)
      .send(new SuccessResponse(newNote, 'Note created successfully'));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

// GET A SINGLE NOTE BY user ID
export async function getUserNote(req, res) {
  try {
    const note = await Note.find({ userid: req.params.userid });

    res.send(new SuccessResponse(note));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

function handleNoteUpdateValues(note, req) {
  if (req.body.topic) {
    note.topic = req.body.topic;
  }
  if (req.body.title) {
    note.title = req.body.title;
  }
  if (req.body.note) {
    note.note = req.body.note;
  }
  note.useremail = req.body.useremail;
  return note;
}

// UPDATE A NOTE
export async function updateNote(req, res) {
  try {
    const note = await Note.findById(req.body.id);
    if (!note) {
      return res.send(new ErrorResponse('Not-Found'));
    }
    const noteDoc = handleNoteUpdateValues(note, req);
    const updatedNote = await noteDoc.save();

    res.send(new SuccessResponse(updatedNote));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

// SEARCH NOTES
export async function searchNote(req, res) {
  try {
    const regex = new RegExp(req.params.searchValue, 'gi');
    const notes = await Note.find({
      $and: [
        { $or: [
        { title: regex },
        { topic: regex }
      ] }
    ],
    });
    if (!notes) {
      return res.send(new ErrorResponse('Not Note Found'));
    }

    res.send(new SuccessResponse(notes));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

// DELETE A NOTE
export async function deleteNote(req, res) {
  try {
    await Note.findByIdAndRemove(req.body.id);

    res.send(new SuccessResponse('Note deleted'));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}
