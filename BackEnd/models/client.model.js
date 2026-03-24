import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Provide date"],
    },
    hour: {
        type: String,
        required: [true, "Provide hour"],
    },
    client: {
        type: String,
        required: [true, "Provide client"],
    },
    details: {
        type: String,
        default: "",
    },
    hand: {
        type: Number,
        default: 0,
    },
    foot: {
        type: Number,
        default: 0,
    },
    busso: {
        type: Number,
        default: 0,
    },
    eyebrow: {
        type: Number,
        default: 0,
    },
    userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
}, {
    timestamps: true,
});

const ClientModel = mongoose.model("Client", clientSchema)

export default ClientModel