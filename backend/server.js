// const express = require("express");
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Thought Model
const ThoughtSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Thought content is required"],
    minlength: [1, "Thought must have at least 1 character"],
    maxlength: [500, "Thought cannot exceed 500 characters"],
  },
  createdAt: { type: Date, default: Date.now },
});

const Thought = mongoose.model("Thought", ThoughtSchema);

// Routes

// POST /thoughts - Create a new thought
app.post("/thoughts", async (req, res) => {
  try {
    const newThought = new Thought(req.body);
    const savedThought = await newThought.save();
    res.status(201).json(savedThought);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /thoughts - Fetch all thoughts with pagination and sorting
app.get("/thoughts", async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "desc" } = req.query;

    const thoughts = await Thought.find()
      .sort({ createdAt: sort === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalThoughts = await Thought.countDocuments();

    res.status(200).json({
      totalThoughts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalThoughts / limit),
      thoughts,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch thoughts" });
  }
});

// DELETE /thoughts/:id - Delete a thought by ID
app.delete("/thoughts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedThought = await Thought.findByIdAndDelete(id);

    if (!deletedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.status(200).json({ message: "Thought deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete thought" });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Advanced Thought Space Backend API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
