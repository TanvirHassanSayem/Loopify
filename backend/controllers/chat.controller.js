import Messages from "../models/messages.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const sendMessage = async (req, res) => {

    const to = req.body.to
    const message = req.body.message
    try {
        const messages = new Messages({
            from: req.user.username,
            to: to,
            message: message

        });

        await messages.save();
        res.json(req.user);
    } catch (error) {
        console.error("Error in getCurrentUser controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const getCurrentUser = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error("Error in getCurrentUser controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const getMessages = async (req, res) => {
    const { username } = req.params;
    let user = req.user

    try {
        let message = await Messages.find({
            $or: [
                { from: username, to: user.username },
                { from: user.username, to: username }
            ]
        });

        res.send(message)
    } catch (error) {
        console.error("Error in getCurrentUser controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};
