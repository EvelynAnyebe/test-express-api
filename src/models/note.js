import mongoose from 'mongoose';


const { Schema, model } = mongoose;

const NoteSchema = Schema(
  {
    id: {
      type: String,
    },
    userid: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
      minLength: 2,
    },
    title: {
      type: String,
      required: true,
      minLength: 4,
    },
    note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export default model('User', NoteSchema);
