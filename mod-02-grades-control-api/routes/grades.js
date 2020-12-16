import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    res.send(data);

  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const grade = data.grades.find(
      grade => grade.id === parseInt(req.params.id));
    res.send(grade);

  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    let grade = req.body;

    if (!grade.student || !grade.subject 
        || !grade.type || grade.value == null) {
          console.log("Testeee")
          throw new Error("Preencha todos os campos.");
    }

    const data = JSON.parse(await readFile("grades.json"));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date()
    };

    data.grades.push(grade);

    await writeFile("grades.json", JSON.stringify(data, null, 2));
    res.send(grade);

  } catch (err) {
    console.log(err)
  }
});

export default router;