import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";
import { validationResult, check } from "express-validator";

// Initialize Express and Prisma
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// PORT for the server
const PORT = process.env.PORT || 5000;

// Validation middleware
const validateStudent = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("cohort").not().isEmpty().withMessage("Cohort is required"),
  check("courses").isArray().withMessage("Courses must be an array"),
  check("status").isIn(["Active", "Inactive"]).withMessage("Invalid status"),
];

// Create a new student
app.post("/students", validateStudent, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, cohort, courses, dateJoined, lastLogin, status } = req.body;
  try {
    const newStudent = await prisma.student.create({
      data: {
        name,
        cohort,
        courses,  // Store courses as an array
        dateJoined: new Date(dateJoined),
        lastLogin: lastLogin ? new Date(lastLogin) : null,
        status,
      },
    });
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Error creating student" });
  }
});

// Get all students
app.get("/students", async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students); // Courses will automatically be an array if stored as Json in Prisma
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Error fetching students" });
  }
});

// Get a single student by ID
app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.status(200).json(student); // Courses will automatically be an array if stored as Json
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Error fetching student" });
  }
});

// Update a student
app.put("/students/:id", validateStudent, async (req, res) => {
  const { id } = req.params;
  const { name, cohort, courses, dateJoined, lastLogin, status } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: {
        name,
        cohort,
        courses,  // Store courses as an array
        dateJoined: dateJoined ? new Date(dateJoined) : undefined,
        lastLogin: lastLogin ? new Date(lastLogin) : undefined,
        status,
      },
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Error updating student" });
  }
});

// Delete a student
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.student.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Error deleting student" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
