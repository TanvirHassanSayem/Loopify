import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Messages = mongoose.model("Messages", postSchema);

export default Messages;
