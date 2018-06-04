import mongoose from 'mongoose'
const { ObjectID } = mongoose.Schema.Types;

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  _institutionId: {
    type: ObjectId,
    required: true
  }
});

const Event = mongoose.model('Event', EventSchema);

export default Event;