import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [{
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

const Survey = mongoose.model('Survey', surveySchema);
export default Survey;