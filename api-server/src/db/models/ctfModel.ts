import mongoose from 'mongoose';

import ctfSchema from '../../db/schemas/ctfSchema';

const CtfModel = mongoose.model('Ctf', ctfSchema);
export default CtfModel;