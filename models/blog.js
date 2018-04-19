import mongoose from 'mongoose';

const Schema = mongoose.Schema();

const blogSchema = new Schema({
  naslov: { type: 'String', required: true },
  sadrzaj: { type: 'String', required: true },
  datKreiranja: { type: 'Date', default: Date.now(), required: true },
  tagovi: ['String'],
  cuid: { type: 'String', required: true },
  slug: { type: 'String', required: true },
});

export default mongoose.model('BlogPost', blogSchema);
