import mongoose from 'mongoose';

const { Schema } = mongoose;

const portfolioSchema = new Schema({
  naslov: { type: 'String', required: true },
  opis: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  klijent: { type: 'String', required: true },
  datProjekta: { type: 'Date', default: Date.now, requred: true },
  previewSlika: { type: 'String', required: true },
  slike: ['String'],
  tagovi: ['String'],
});

export default mongoose.model('Portfolio', portfolioSchema);
