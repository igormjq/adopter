import mongoose from 'mongoose'
const { ObjectID } = mongoose.Schema.Types;

const ReportSchema = new mongoose.Schema({
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
  accepted: {
    type: Boolean,
    default: false
  },
  _creator: {
    type: ObjectId,
    required: true
  },
  _institutionId: {
    type: ObjectId,
    required: true
  }
});

const Report = mongoose.model('report', ReportSchema);

export default Report;