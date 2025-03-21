import mongoose, { Schema, Document, Model } from "mongoose";


interface IUser extends Document {
  phone: string;
  name: string;
  email:string;
  password: string;
  approve:boolean;
}

// Mongoose Schema
const UserSchema = new Schema<IUser>(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/, 
    },
    name: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    approve: {
      type: Boolean,
      default:false
    },
  },
  { timestamps: true }
);


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
