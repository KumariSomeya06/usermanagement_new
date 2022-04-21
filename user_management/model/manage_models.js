import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const manageSchema = new Schema({
    name: { type: String, },
    email: { type: String, },
    phone: { type: String, },
    date: { type: Date, default: Date.now },
})


const ManageModel = mongoose.model('users', manageSchema);

export default ManageModel