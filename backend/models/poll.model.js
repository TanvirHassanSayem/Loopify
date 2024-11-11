import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: [{
        text: {
            type: String,
            required: true,
        },
        votes: {
            type: Number,
            default: 0,
        },
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Poll = mongoose.model('Poll', pollSchema);
export default Poll;