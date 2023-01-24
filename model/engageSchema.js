import { Schema, models, model } from "mongoose";

const filesEngageSchema = new Schema({
    base64: String,
});

const FilesEngage = models.engage || model('engage', filesEngageSchema)

export default FilesEngage;