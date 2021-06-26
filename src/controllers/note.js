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
    const newNoteObj= new Note(req.body);
    const newNote = await newNoteObj.save();
    res
      .status(Response.HTTP_CREATED)
      .send(
        new SuccessResponse(newNote, 'Note created successfully')
      );
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

// GET A SINGLE NOTE BY user ID
export async function getUserNote(req, res) {
  try {
    const note = await Note.find({userid: req.params.userid});

    res.send(new SuccessResponse(note));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

function handleNoteUpdateValues(note,req) {
  if (req.body.topic) {
    note.topic=req.body.topic;
  }
  if (req.body.title) {
    note.title=req.body.title;
  }
  if (req.body.note) {
    note.note=req.body.note;
  }
  return note
}

// UPDATE A NOTE
export async function updateNote(req, res) {
  try {
    const note = await Note.findById(req.body.id);
    if (!note) {
      res
      .send(new ErrorResponse("Not-Found"));
    }
    const noteDoc=handleNoteUpdateValues(note,req);
    const updatedNote = await noteDoc.save();

    res.send(new SuccessResponse(updatedNote));
  } catch (err) {
    res
      .status(Response.HTTP_INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(err));
  }
}

