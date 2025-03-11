import mongoose, { Schema, Document, Model } from "mongoose";

// Categories
const CATEGORY_OPTIONS = [
  "Administration",
  "Legal",
  "Business",
  "Others",
  "Education",
  "Finance",
  "Disaster Relief",
] as const;

const STATUS_OPTIONS = ["Pending", "Approved", "Rejected"] as const;

type CategoryType = (typeof CATEGORY_OPTIONS)[number];
type StatusType = (typeof STATUS_OPTIONS)[number];

type AreaType = "Village" | "Town" | "Tehsil" | "Development Block";
type GenderType = "Male" | "Female" | "Other";

interface IApplication extends Document {
  fullName: string;
  age: number;
  phoneNo: string;
  gender: GenderType;
  occupation: string;
  address: string;
  category: CategoryType;
  area: AreaType;
  remarks?: string;
  documenturl?: string;
  status: StatusType;
  uploaded_by:String;
  refid:String
}

// Mongoose Schema
const ApplicationSchema = new Schema<IApplication>(
  {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNo: { 
      type: String, 
      required: true, 
      match: [/^\d{10}$/, "Invalid phone number format (must be 10 digits)"] 
    },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
    category: { type: String, required: true, enum: CATEGORY_OPTIONS },
    area: { type: String, required: true, enum: ["Village", "Town", "Tehsil", "Development Block"] },
    remarks: { type: String, required: false },  // Explicitly set as optional
    documenturl: { 
      type: String,
      required: false, // Explicitly set as optional
      validate: {
        validator: function (v: string) {
          return !v || /^(https?:\/\/.*\.(?:png|jpg|jpeg|pdf|docx?))$/i.test(v); 
        },
        message: "Invalid document URL format",
      },
      default: "",
    },
    status: { type: String, enum: STATUS_OPTIONS, default: "Pending" },
    uploaded_by:{type:String},
    refid:{type:String}

  },
  { timestamps: true }
);

// Model
const Application: Model<IApplication> =
  mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;
