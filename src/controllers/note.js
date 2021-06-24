import Note from '../models/note.js';
import { Response } from 'http-status-codez';
import { ErrorResponse, SuccessResponse } from './../utils/appResponse.js';


// GET ALL USERS
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


// GET A SINGLE USER BY ID
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

// CREATE A USER - SIGNUP USING LOGIN FORM
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
