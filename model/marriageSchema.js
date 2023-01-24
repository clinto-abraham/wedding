import { Schema, models, model } from "mongoose";

const filesMarriageSchema = new Schema({
    base64: String,
});

const FilesMarriage = models.marriage || model('marriage', filesMarriageSchema)

export default FilesMarriage;