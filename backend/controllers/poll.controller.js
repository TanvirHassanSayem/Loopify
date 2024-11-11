import Poll from '../models/poll.model.js';

export const createPoll = async (req, res) => {
    try {
        const { question, options } = req.body;
        const newPoll = new Poll({
            question,
            options,
            author: req.user._id,
        });
        await newPoll.save();
        res.status(201).json(newPoll);
    } catch (error) {
        console.error("Error creating poll:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPolls = async (req, res) => {
    try {
        const polls = await Poll.find().populate('author', 'name username profilePicture').sort({ createdAt: -1 });
        res.status(200).json(polls);
    } catch (error) {
        console.error("Error fetching polls:", error);
        res.status(500).json({ message: "Server error" });
    }
};