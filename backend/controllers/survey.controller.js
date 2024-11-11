import Survey from '../models/survey.model.js';

export const createSurvey = async (req, res) => {
    try {
        const { title, questions } = req.body;
        const newSurvey = new Survey({
            title,
            questions,
            author: req.user._id,
        });
        await newSurvey.save();
        res.status(201).json(newSurvey);
    } catch (error) {
        console.error("Error creating survey:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getSurveys = async (req, res) => {
    try {
        const surveys = await Survey.find().populate('author', 'name username profilePicture').sort({ createdAt: -1 });
        res.status(200).json(surveys);
    } catch (error) {
        console.error("Error fetching surveys:", error);
        res.status(500).json({ message: "Server error" });
    }
};