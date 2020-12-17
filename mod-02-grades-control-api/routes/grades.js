import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;
const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    res.send(data);

    global.logger.info("GET /grade");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const grade = data.grades.find(
      grade => grade.id === parseInt(req.params.id));
    res.send(grade);

    global.logger.info("GET /grade/:id");
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let grade = req.body;

    if (!grade.student || !grade.subject
      || !grade.type || grade.value == null) {
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

    global.logger.info("POST /grade");
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const grade = req.body;

    if (!grade.id || !grade.student || !grade.subject
      || !grade.type || grade.value == null) {
      throw new Error("Preencha todos os campos.");
    }

    const data = JSON.parse(await readFile("grades.json"));
    const index = data.grades.findIndex(g => g.id === grade.id);

    if (index === -1) {
      throw new Error("Registro não encontrado.");
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;

    await writeFile("grades.json", JSON.stringify(data, null, 2));
    res.send(grade);

    global.logger.info("PUT /grade");
  } catch (err) {
    next(err);
  }
});

router.patch("/update", async (req, res, next) => {
  try {
    const grade = req.body;

    if (!grade.id || !grade.student || !grade.subject
      || !grade.type || grade.value == null) {
      throw new Error("Preencha todos os campos.");
    }

    const data = JSON.parse(await readFile("grades.json"));
    const index = data.grades.findIndex(g => g.id === grade.id);

    if (index === -1) {
      throw new Error("Registro não encontrado.");
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;

    await writeFile("grades.json", JSON.stringify(data, null, 2));
    res.send(data.grades[index]);

    global.logger.info("PATCH /grade/update");
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    data.grades = data.grades.filter(
      grade => grade.id !== parseInt(req.params.id));

    await writeFile("grades.json", JSON.stringify(data, null, 2));
    res.end();

    global.logger.info("DELETE /grade/:id");
  } catch (err) {
    next(err);
  }
});

router.get("/:student/:subject", async (req, res, next) => {
  try {
    const { student, subject } = req.params;
    const data = JSON.parse(await readFile("grades.json"));

    const filteredValues = data.grades.filter(
      grade => grade.student === student && grade.subject === subject
    );

    const sum = filteredValues.reduce((acc, val) => {
      return acc += val.value
    }, 0);

    res.send({ totalSum: sum });

    global.logger.info("/:student/:subject");
  } catch (err) {
    next(err);
  }
});

router.post("/consultarMedia", async (req, res, next) => {
  try {
    const { subject, type } = req.body;
    const data = JSON.parse(await readFile("grades.json"));

    const filteredValues = data.grades.filter(
      grade => grade.subject === subject && grade.type === type
    );
    
    let cont = 0;
    let sum = 0;
    
    filteredValues.forEach(grade => {
      cont++;
      return sum += grade.value
    });

    const mediaFinal = sum / cont;
    res.send({ media: mediaFinal });

    global.logger.info("/consultarMedia");
  } catch (err) {
    next(err);
  }
});

router.post("/bigGrades", async (req, res, next) => {
  try {
    const { subject, type } = req.body;

    const data = JSON.parse(await readFile("grades.json"));

    const filteredValues = data.grades.filter(
      grade => grade.subject === subject && grade.type === type
    );
    
    filteredValues.sort((a, b) => {
      return b.value - a.value;
    });

    const bigGrades = filteredValues.slice(0, 3);

    res.send(bigGrades);

    global.logger.info("/bigGrades");
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;