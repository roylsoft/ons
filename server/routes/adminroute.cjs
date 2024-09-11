const express = require("express");
const connection = require("../utils/db.cjs");
const jwt = require("jsonwebtoken");
const moment = require('moment');
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const adminrouter = express.Router();

//handle images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

//getting admin
adminrouter.get('/admin', async (req, res) => {
    try {
        const result = await connection.query("select * from admin");
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err });
    }
});

adminrouter.get('/banker/:caisse', async (req, res) => {
    try {
        const com = "select * from bank where caisse= ?"
        const result = await connection.query(com, [req.params.caisse]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err });
    }
});

adminrouter.get('/banker', async (req, res) => {
    try {
        const result = await connection.query("select * from bank");
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err });
    }
});

adminrouter.get('/marksort/:data', async (req, res) => {
    try {

        let tab = req.query.spec + req.query.year + req.query.session;
        let branch = req.query.branch
        const com1 = `SELECT code 
                   FROM course 
                   WHERE level = ? AND semester = ? AND spec = ? AND branch= ?`;
        let result1 = await connection.query(com1, [req.query.level, req.query.semester, req.query.spec, branch]);

        const colones = result1.results.map(course => course.code);

        const com = `SELECT mat1,name,level,${colones.join(', ')} FROM ${tab} WHERE branch=? AND level = ? ORDER BY ${tab}.mat1 ASC;`;

        // Utilisation du pool de connexions pour exécuter la requête de manière asynchrone
        let result = await connection.query(com, [req.query.level, req.query.branch]);

        // Suppression des doublons
        result = Array.from(new Set(result.results.map(JSON.stringify)), JSON.parse);

        return res.json({ result: result });
    } catch (err) {

        return res.json({ readingStatus: false, Error: err });
    }
});

//getting student marks/lecturer
adminrouter.get('/sortmark/:data', async (req, res) => {
    try {

        let tab = req.query.spec + req.query.year + req.query.session;

        let colone = ['mat1', 'name', 'level']

        const com1 = `SELECT code 
                   FROM course 
                   WHERE level = ? AND semester = ? AND spec = ? AND mat = ?`;
        let result1 = await connection.query(com1, [req.query.level, req.query.semester, req.query.spec, req.query.mat]);
        const colones = result1.results.map(course => course.code);

        const com = `SELECT mat1,name,level,${colones.join(', ')}
                   FROM ${tab}
                   WHERE level = ?
                   ORDER BY ${tab}.mat1 ASC;`;

        // Utilisation du pool de connexions pour exécuter la requête de manière asynchrone
        let result = await connection.query(com, [req.query.level]);

        // Suppression des doublons
        result = Array.from(new Set(result.results.map(JSON.stringify)), JSON.parse);
        return res.json({ result: result });
    } catch (err) {
        console.error(err);
        return res.json({ readingStatus: false, Error: err });
    }
});


//getting studentlist
adminrouter.get('/timetable/:data', async (req, res) => {
    try {
        const result = await connection.query("select * from course where spec=? and level=? and semester=?", [req.query.spec, req.query.level, req.query.semester]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err });
    }
});

//getting result
adminrouter.post('/transcript1', async (req, res) => {

    try {
        let student = await connection.query("select spec, level from royalstudent where mat=?", [req.body.mat]);
        let spec = student.results[0].spec;
        let year = req.body.year;
        let level = student.results[0].level;
        specyear = spec + year
        const CA = `${specyear}CA`;
        const EXAM = `${specyear}EXAM`;

        const result1 = await connection.query("SELECT code,title,credit FROM course where spec=? and level=? and semester=?", [spec, level, 1]);
        const codes = result1.results.map(course => course.code);

        const resultca = await connection.query(`SELECT ${codes.join(', ')} FROM ${CA} WHERE mat1 = ?`, [req.body.mat]);
        const colones = Object.values(resultca.results[0]);
        const caResults = colones.map(value => ({ ca: value }));
        for (let i = 0; i < caResults.length; i++) {
            if (caResults[i].ca === null) {
                caResults[i].ca = 0;
            }
        }

        const result = result1.results.map((object, index) => ({
            ...object, ...caResults[index]
        }));

        const resultexam = await connection.query(`SELECT ${codes.join(', ')} FROM ${EXAM} WHERE mat1 = ?`, [req.body.mat]);
        const examResults = Object.values(resultexam.results[0]).map(value => ({ ns: value }));
        for (let i = 0; i < examResults.length; i++) {
            if (examResults[i].ns === null) {
                examResults[i].ns = 0;
            }
        }

        const finalResult = result.map((object, index) => ({
            ...object, ...examResults[index]
        }));

        return res.json({ result: finalResult });
    } catch (err) {

        return res.json({ readingStatus: false, Error: err.message });
    }
});

// adminrouter.post('/transcript2', ...)
adminrouter.post('/transcript2', async (req, res) => {
    console.log(req.body);

    try {
        const student = await connection.query("select spec, level from royalstudent where mat=?", [req.body.mat]);
        let spec = student.results[0].spec;
        let year = req.body.year;
        let level = student.results[0].level;
        specyear = spec + year
        const CA = `${specyear}CA`;
        const EXAM = `${specyear}EXAM`;

        const result1 = await connection.query("SELECT code,title,credit FROM course where spec=? and level=? and semester=?", [spec, level, 2]);
        const codes = result1.results.map(course => course.code);

        const resultca = await connection.query(`SELECT ${codes.join(', ')} FROM ${CA} WHERE mat1 = ?`, [req.body.mat]);
        const colones = Object.values(resultca.results[0]);
        const caResults = colones.map(value => ({ ca: value }));
        for (let i = 0; i < caResults.length; i++) {
            if (caResults[i].ca === null) {
                caResults[i].ca = 0;
            }
        }

        const result = result1.results.map((object, index) => ({
            ...object, ...caResults[index]
        }));

        const resultexam = await connection.query(`SELECT ${codes.join(', ')} FROM ${EXAM} WHERE mat1 = ?`, [req.body.mat]);
        const examResults = Object.values(resultexam.results[0]).map(value => ({ ns: value }));
        for (let i = 0; i < examResults.length; i++) {
            if (examResults[i].ns === null) {
                examResults[i].ns = 0;
            }
        }

        const finalResult = result.map((object, index) => ({
            ...object, ...examResults[index]
        }));

        return res.json({ result: finalResult });
    } catch (err) {
        console.error(err);
        return res.json({ readingStatus: false, Error: err.message });
    }
});


// adminrouter.get('/updatemark/:inf', ...)
adminrouter.get('/updatemark/:inf', async (req, res) => {
    try {
        let tab = req.query.spec + req.query.year + req.query.session;
        let value = req.query.newvalue;
        let col = req.query.colone
        let matri = req.query.etudiant

        const com = `UPDATE ${tab} SET ${col} = ? WHERE mat1 = ?`;
        const updateResult = await connection.query(com, [value, matri]);

        return res.json({ result: updateResult.results, createStatus: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Une erreur est survenue' });
    }
});


// adminrouter.post('/adminlogin', ...)
adminrouter.post('/logintobank', async (req, res) => {
    try {
        const result = await connection.query("select * from bank where caisse = ?", [req.body.caisse]);

        if (result.results.length > 0) {
            const hash = await bcrypt.compare(req.body.password.toString(), result.results[0].password);

            if (hash) {
                const token = jwt.sign({
                    role: "bank",
                    caisse: req.body.caisse
                },
                    "jwt_secretmysecret_key",
                    { expiresIn: '1d' }
                );
                res.cookie('token', token);
                return res.json({ loginStatus: true, caisse: result.results[0].caisse });
            } else {
                return res.json({ loginStatus: false, Error: 'Wrong checkout or password' });
            }
        } else {
            return res.json({ loginStatus: false, Error: 'Wrong checkout or password' });
        }
    } catch (err) {
        console.error(err);
        return res.json({ loginStatus: false, Error: err.message });
    }
});

// adminrouter.post('/transcript2', ...)
adminrouter.post('/transcript2', async (req, res) => {
    try {
        const student = await connection.query("select spec, level from royalstudent where mat=?", [req.body.mat]);
        const spec = student.results[0].spec;
        const year = student.results[0].year;
        const level = student.results[0].level;
        spec = spec + year
        const CA = `${spec}CA`;
        const EXAM = `${spec}EXAM`;

        const result1 = await connection.query("SELECT code,title,credit FROM course where spec=? and level=? and semester=?", [spec, level, 2]);
        const codes = result1.results.map(course => course.code);

        const resultca = await connection.query(`SELECT ${codes.join(', ')} FROM ${CA} WHERE mat1 = ?`, [req.body.mat]);
        const colones = Object.values(resultca.results[0]);
        const caResults = colones.map(value => ({ ca: value }));
        for (let i = 0; i < caResults.length; i++) {
            if (caResults[i].ca === null) {
                caResults[i].ca = 0;
            }
        }

        const result = result1.results.map((object, index) => ({
            ...object, ...caResults[index]
        }));

        const resultexam = await connection.query(`SELECT ${codes.join(', ')} FROM ${EXAM} WHERE mat1 = ?`, [req.body.mat]);
        const examResults = Object.values(resultexam.results[0]).map(value => ({ ns: value }));
        for (let i = 0; i < examResults.length; i++) {
            if (examResults[i].ns === null) {
                examResults[i].ns = 0;
            }
        }

        const finalResult = result.map((object, index) => ({
            ...object, ...examResults[index]
        }));

        return res.json({ result: finalResult });
    } catch (err) {
        console.error(err);
        return res.json({ readingStatus: false, Error: err.message });
    }
});


// adminrouter.get('/updatemark/:inf', ...)
adminrouter.get('/updatemark/:inf', async (req, res) => {
    try {
        let tab = req.query.spec + req.query.year + req.query.session;
        let value = req.query.newvalue;
        let col = req.query.colone
        let matri = req.query.etudiant

        const com = `UPDATE ${tab} SET ${col} = ? WHERE mat1 = ?`;
        const updateResult = await connection.query(com, [value, matri]);

        return res.json({ result: updateResult.results, createStatus: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Une erreur est survenue' });
    }
});


// adminrouter.post('/adminlogin', ...)
adminrouter.post('/adminlogin', async (req, res) => {
    try {
        const result = await connection.query("select * from admin where mat=?", [req.body.matricule]);

        if (result.results.length > 0) {
            const hash = await bcrypt.compare(req.body.password.toString(), result.results[0].pass);

            if (hash) {
                const token = jwt.sign({
                    role: "admin",
                    matricule: req.body.matricule
                },
                    "jwt_secretmysecret_key",
                    { expiresIn: '1d' }
                );
                res.cookie('token', token);
                return res.json({ loginStatus: true, mat: result.results[0].mat });
            } else {
                return res.json({ loginStatus: false, Error: 'Wrong matricule or password' });
            }
        } else {
            return res.json({ loginStatus: false, Error: 'Wrong matricule or password' });
        }
    } catch (err) {
        console.error(err);
        return res.json({ loginStatus: false, Error: err.message });
    }
});

// logout
adminrouter.get('/logout', async (req, res) => {
    try {
        res.clearCookie('token');
        return res.json({ Status: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Error: err });
    }
});

// create delegate
adminrouter.post('/adddelegate', async (req, res) => {
    try {

        const com = "select * from delegate where mat=?";
        const result = await connection.query(com, [req.body.mat]);
        if (result.results.length > 0) {

            return res.json({ createStatus: false, Error: 'This delegate already exist' });
        } else {
            const com = "INSERT INTO delegate (mat,name,speciality,level) VALUES (?,?,?,?)";
            const createResult = await connection.query(com, [req.body.mat, req.body.name, req.body.speciality, req.body.level]);

            return res.json({ createStatus: true });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ createStatus: false, Error: err });
    }
});

// create department
adminrouter.post('/adddepartment', async (req, res) => {
    try {
        const com = "select * from department where codep=? and title=?";
        const result = await connection.query(com, [req.body.codep, req.body.title]);
        if (result.results.length > 0) {
            return res.json({ createStatus: false, Error: 'This department already exist' });
        } else {
            const com = "INSERT INTO department (codep,title) VALUES (?,?)";
            const createResult = await connection.query(com, [req.body.codep, req.body.title]);
            return res.json({ createStatus: true });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ createStatus: false, Error: err });
    }
});

// create speciality
adminrouter.post('/addspeciality', async (req, res) => {
    try {

        const com = "select * from specialities where codesp=? and title=?";
        const result = await connection.query(com, [req.body.codesp, req.body.title]);
        if (result.results.length > 0) {

            return res.json({ createStatus: false, Error: 'This speciality already exist' });
        } else {
            let tab = req.body.codesp + "2024_2025EXAM";
            let tab1 = req.body.codesp + "2024_2025CA";
            let tab2 = req.body.codesp + "2025_2026EXAM";
            let tab3 = req.body.codesp + "2025_2026CA";
            let tab4 = req.body.codesp + "2026_2027EXAM";
            let tab5 = req.body.codesp + "2026_2027CA";
            let tab6 = req.body.codesp + "2027_2028EXAM";
            let tab7 = req.body.codesp + "2027_2028CA";
            let tab8 = req.body.codesp + "2028_2029EXAM";
            let tab9 = req.body.codesp + "2028_2029CA";

            const com = "INSERT INTO specialities (codesp,title,codep) VALUES (?,?,?)";
            const createResult = await connection.query(com, [req.body.codesp, req.body.title, req.body.codep]);
            const ex = `CREATE TABLE ${tab} (mat1 VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
            const ex1 = `CREATE TABLE ${tab2} (mat1 VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
            const ex2 = `CREATE TABLE ${tab4} (mat1 VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
            const ex3 = `CREATE TABLE ${tab6} (mat1 VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
            const ex4 = `CREATE TABLE ${tab8} (mat1 VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

            const ca = `CREATE TABLE ${tab1} (mat1 VARCHAR(45) NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
            const ca1 = `CREATE TABLE ${tab3} (mat1 VARCHAR(45) NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
            const ca2 = `CREATE TABLE ${tab5} (mat1 VARCHAR(45) NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
            const ca3 = `CREATE TABLE ${tab7} (mat1 VARCHAR(45) NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
            const ca4 = `CREATE TABLE ${tab9} (mat1 VARCHAR(45) NOT NULL,name VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,branch VARCHAR(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL, level INT NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;

            await connection.query(ex);
            await connection.query(ex1);
            await connection.query(ex2);
            await connection.query(ex3);
            await connection.query(ex4);

            await connection.query(ca);
            await connection.query(ca1);
            await connection.query(ca2);
            await connection.query(ca3);
            await connection.query(ca4);

            return res.json({ createStatus: true, result: createResult.results });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ createStatus: false, Error: err });
    }
});

// create course
adminrouter.post('/addcourse', async (req, res) => {
    try {
        const com = "select * from course where code=? and title=?";
        const result = await connection.query(com, [req.body.code, req.body.title]);
        if (result.results.length > 0) {
            return res.json({ createStatus: false, Error: 'This course already exist' });
        } else {
            const com = "INSERT INTO course (code,title,credit,spec,level,type,branch) VALUES (?,?,?,?,?,?,?)";
            const createResult = await connection.query(com, [req.body.code, req.body.title, req.body.credit, req.body.speciality, req.body.level, req.body.type, req.body.branch]);
            let tab = req.body.speciality + req.body.year + "EXAM";
            let tab1 = req.body.speciality + req.body.year + "CA";
            const setca = `ALTER TABLE ${tab1} ADD COLUMN ${req.body.code} VARCHAR(255) DEFAULT '0'`;
            const setex = `ALTER TABLE ${tab} ADD COLUMN ${req.body.code} VARCHAR(255) DEFAULT '0'`;
            await connection.query(setca);
            await connection.query(setex);
            return res.json({ createStatus: true });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ createStatus: false, Error: err });
    }
});

adminrouter.put('/editadmin/:mat', async (req, res) => {
    try {
        const result = await connection.query("SELECT * FROM admin WHERE mat = ?", [req.params.mat]);
        if (result.results.length === 0) {
            return res.json({ updatingStatus: false, Error: 'This member doesn\'t exist' });
        } else {
            const birth = moment(req.body.birth).format("YYYY-MM-DD");
            const values = [req.body.name, req.body.email, req.body.phone, req.body.role, req.body.grade, req.body.idcard, birth, req.body.place, req.body.sex];
            const updateResult = await connection.query('UPDATE admin SET name=?,email=?,phone=?,role=?,grade=?,idcard=?,birth=?,place=?,sex=? WHERE mat=?', [...values, req.params.mat]);
            return res.json({ createStatus: true, Matricule: 'Your unique ID is:' + req.params.mat });
        }
    } catch (err) {
        return res.json({ createStatus: false, Error: err.message });
    }
});

adminrouter.put('/editbanker/:caisse', async (req, res) => {
    try {

        const result = await connection.query("SELECT * FROM bank WHERE caisse = ?", [req.params.caisse]);
        if (result.results.length === 0) {
            return res.json({ updatingStatus: false, Error: 'This member doesn\'t exist' });
        } else {
            const values = [req.body.name, req.body.phone, req.body.branch, req.params.caisse, req.body.password];
            const updateResult = await connection.query('UPDATE bank SET name=?,phone=?,branch=?,caisse=?,password=? WHERE caisse=?', [...values, req.params.caisse]);

            return res.json({ createStatus: true, result: updateResult.results });
        }
    } catch (err) {


        return res.json({ createStatus: false, Error: err.message });
    }
});

adminrouter.put('/editregistrationkey', async (req, res) => {
    try {
        const values = [req.body.randomNumber];
        const updateResult = await connection.query('UPDATE cle SET code=? ', [...values]);
        return res.json({ createStatus: true, Result: values[0] });
    } catch (err) {
        return res.json({ createStatus: false, Error: err });
    }
});

adminrouter.post('/addbanker', async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 13);

        const result = await connection.query("INSERT INTO bank (name, phone,branch,caisse,password) VALUES (?,?,?,?,?)",
            [req.body.name, req.body.phone, req.body.branch, req.body.caisse, hash]);
        return res.json({ createStatus: true });
    } catch (err) {
        return res.json({ createStatus: false, Error: err.message });
    }
});

adminrouter.post('/addadmin', upload.single('pic'), async (req, res) => {

    try {
        let branch = req.body.branch;

        const result = await connection.query("SELECT * FROM admin WHERE mat = ?", [req.body.mat]);
        if (result.results.length > 0) {
            return res.json({ createStatus: false, Error: 'This member already exist' });
        } else {
            const date = new Date();
            const year = moment(date).format('YY');
            const countResult = await connection.query('SELECT COUNT(mat) AS st_numb FROM admin');
            if (req.body.pass !== req.body.cpass) {
                return res.json({ Status: false, Error: 'Password doesn\'t match' });
            }
            const hash = await bcrypt.hash(req.body.pass, 13);
            const birth = moment(req.body.birth).format("YYYY-MM-DD");
            const st_numb = countResult.results[0].st_numb + 1;
            const mat = 'NFONAP-0' + st_numb + year;

            const insertResult = await connection.query("INSERT INTO admin (mat,name,email,phone,role,grade,birth,place,idcard,pic,pass,sex,year,branch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
                mat, req.body.name, req.body.email, req.body.phone, req.body.role, req.body.grade, birth, req.body.place, req.body.idcard, req.file.filename, hash, req.body.sex, req.body.year, branch]);
            return res.json({ createStatus: true, Matricule: mat });
        }
    } catch (err) {

        return res.json({ createStatus: false, Error: err.message });
    }
});

adminrouter.put('/editdelegate/:mat', async (req, res) => {
    try {
        const result = await connection.query("select * from delegate where mat=?", [req.params.mat]);
        if (result.results.length === 0) {
            return res.json({ updatingStatus: false, Error: 'This delegate doesn\'t exist' });
        } else {
            const values = [req.body.mat, req.body.name, req.body.spec, req.body.level];
            const updateResult = await connection.query('UPDATE delegate SET mat=?,name=?,speciality=?,level=? where mat=?', [...values, req.params.mat]);
            return res.json({ createStatus: true });
        }
    } catch (err) {

        return res.json({ createStatus: false, Error: err });
    }
});

adminrouter.put('/editcourse/:codec', async (req, res) => {
    try {
        const result = await connection.query("select * from course where code=?", [req.params.codec]);
        if (result.results.length === 0) {
            return res.json({ updatingStatus: false, Error: 'This course doesn\'t exist' });
        } else {
            const values = [req.body.code, req.body.title, req.body.credit, req.body.spec, req.body.level, req.body.semester, req.body.name, req.body.phone];
            const [updateResult] = await connection.query('UPDATE course SET code=?,title=?,credit=?,spec=?,level=?,semester=?,name=?,phone=? where code=?', [...values, req.params.codec]);
            return res.json({ createStatus: true });
        }
    } catch (err) {

        return res.json({ createStatus: false, Error: err });
    }
});

adminrouter.put('/updatecourse/:code', async (req, res) => {
    try {
        const [updateResult] = await connection.query(`UPDATE course SET ${req.body.colone} = ? WHERE code = ?`, [req.body.valeur, req.params.code]);
        res.status(200).json({ success: true, result: updateResult });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update record' });
    }
});

adminrouter.put('/editdep/:code', async (req, res) => {
    try {
        const result = await connection.query("select * from department where codep=?", [req.params.code]);
        if (result.results.length === 0) {
            return res.json({ updatingStatus: false, Error: 'This department doesn\'t exist' });
        } else {
            const values = [req.body.codep, req.body.title];
            const [updateResult] = await connection.query('UPDATE department SET codep=?,title=? where codep=?', [...values, req.params.code]);
            return res.json({ createStatus: true, Matricule: 'Your unique ID is:' });
        }
    } catch (err) {
        return res.json({ createStatus: false, Error: err });
    }
});

adminrouter.put('/editspec/:code', async (req, res) => {
    try {
        const result = await connection.query("select * from specialities where codesp=?", [req.params.code]);
        if (result.results.length === 0) {
            return res.json({ updatingStatus: false, Error: 'This student doesn\'t exist' });
        } else {
            const values = [req.body.codesp, req.body.title, req.body.codep];
            const [updateResult] = await connection.query('UPDATE specialities SET codesp=?,title=?,codep=? where codesp=?', [...values, req.params.code]);
            return res.json({ createStatus: true, Matricule: 'Your unique ID is:' });
        }
    } catch (err) {
        return res.json({ createStatus: false, Error: err });
    }
});

adminrouter.put('/editstudent/:mat', async (req, res) => {
    try {
        const result = await connection.query("select * from royalstudent where mat=?", [req.params.mat]);
        if (result.results.length === 0) {
            return res.json({ updatingStatus: false, Error: 'This student doesn\'t exist' });
        } else {
            const specResult = await connection.query('SELECT * FROM specialities where codesp=?', [req.body.spec]);
            const dep = specResult.results[0].codep;

            // Convert the date format using the built-in Date object
            const birth = new Date(req.body.birth).toISOString().slice(0, 10);
            const values = [req.body.name, req.body.email, req.body.phone, req.body.spec, dep, req.body.level, birth, req.body.place, req.body.sex, req.params.mat];
            const updateResult = await connection.query('UPDATE royalstudent SET name=?,email=?,phone=?,spec=?,dep=?,level=?,birth=?,place=?,sex=? where mat=?', values);
            return res.json({ createStatus: true, Matricule: 'Your unique ID is:' + req.params.mat });
        }
    } catch (err) {
        return res.json({ createStatus: false, Error: err.message });
    }
});

adminrouter.put('/editstaff/:mat', async (req, res) => {

    try {
        let birth = moment(req.body.birth).format("YYYY-MM-DD")
        const result = await connection.query("select * from staff where mat=?", [req.params.mat]);
        if (result.results.length === 0) {
            return res.json({ updatingStatus: false, Error: 'This student doesn\'t exist' });
        } else {
            // const birth = new Date(req.body.birth).toISOString().slice(0, 10);
            const values = [req.body.name, req.body.email, req.body.codep, req.body.phone, req.body.grade, req.body.idcard, birth, req.body.place, req.body.sex, req.body.coasthour, req.body.branch, req.params.mat];
            const updateResult = await connection.query('UPDATE staff SET name=?,email=?,codep=?,phone=?,grade=?,idcard=?,birth=?,place=?,sex=?,coasthour=?, branch=? where mat=?', values);

            return res.json({ createStatus: true, Matricule: 'Your unique ID is:' + req.params.mat });
        }
    } catch (err) {

        return res.json({ createStatus: false, Error: err.message });
    }
});

//getting course
adminrouter.get('/course/:codec', async (req, res) => {
    try {
        const result = await connection.query("select * from course where code=?", [req.params.codec]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.message });
    }
});

adminrouter.get('/courselist/:mat', async (req, res) => {
    try {
        const result = await connection.query("select * from course where mat=?", [req.params.mat]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.message });
    }
});

adminrouter.get('/delegate', async (req, res) => {
    try {
        const result = await connection.query("select * from delegate");
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.message });
    }
});

adminrouter.get('/delegate/:mat', async (req, res) => {
    try {
        const result = await connection.query("select * from delegate where mat=?", [req.params.mat]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.message });
    }
});

adminrouter.get('/courselist', async (req, res) => {
    try {
        const result = await connection.query("select * from course");
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.message });
    }
});

//getting single speciality
adminrouter.get('/specialities/:code', async (req, res) => {
    try {
        const result = await connection.query('select * from specialities where codesp=?', [req.params.code]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.toString() });
    }
});

//getting specialities
adminrouter.get('/specialities', async (req, res) => {
    try {
        const result = await connection.query('select * from specialities');
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.toString() });
    }
});

//getting single department
adminrouter.get('/department/:code', async (req, res) => {
    try {
        const result = await connection.query('select * from department where codep=?', [req.params.code]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.toString() });
    }
});

//getting department
adminrouter.get('/department', async (req, res) => {
    try {
        const result = await connection.query('select * from department');

        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.toString() });
    }
});

// Getting a single admin
adminrouter.get('/adminlist/:mat', async (req, res) => {
    try {
        const result = await connection.query('SELECT * FROM admin WHERE mat = ?', [req.params.mat]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.message });
    }
});

// Counting admins
adminrouter.get('/countadmin', async (req, res) => {
    try {
        const result = await connection.query('SELECT COUNT(mat) AS admin FROM admin');
        return res.json({ Status: true, Result: result.results });
    } catch (err) {
        return res.json({ Status: false, Error: err.message });
    }
});

// Counting specialities
adminrouter.get('/countspeciality', async (req, res) => {
    try {
        const result = await connection.query('SELECT COUNT(codesp) AS speciality FROM specialities');
        return res.json({ Status: true, Result: result.results });
    } catch (err) {
        return res.json({ Status: false, Error: err.message });
    }
});

// Counting courses
adminrouter.get('/countcourse', async (req, res) => {
    try {
        const result = await connection.query('SELECT COUNT(code) AS course FROM course');
        return res.json({ Status: true, Result: result.results });
    } catch (err) {
        return res.json({ Status: false, Error: err.message });
    }
});

// deleting a single admin
adminrouter.delete('/deletecourse/:code', async (req, res) => {
    try {
        const result = await connection.query('delete from course where code=?', [req.params.code]);
        return res.json({ deleteStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ deleteStatus: false, Error: err.message });
    }
});

adminrouter.delete('/deleteadmin/:mat', async (req, res) => {
    try {
        const result = await connection.query('delete from admin where mat=?', [req.params.mat]);
        return res.json({ deleteStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ deleteStatus: false, Error: err.message });
    }
});

adminrouter.delete('/deletebanker/:mat', async (req, res) => {

    try {
        const result = await connection.query('delete from bank where caisse=?', [req.params.mat]);
        return res.json({ deleteStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ deleteStatus: false, Error: err.message });
    }
});

adminrouter.delete('/deletedelegate/:mat', async (req, res) => {

    try {
        const result = await connection.query('delete from delegate where mat=?', [req.params.mat]);
        return res.json({ deleteStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ deleteStatus: false, Error: err.message });
    }
});

adminrouter.delete('/deletedepartment/:codep', async (req, res) => {
    try {
        const result = await connection.query('delete from department where codep=?', [req.params.codep]);
        return res.json({ deleteStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ deleteStatus: false, Error: err.message });
    }
});

adminrouter.delete('/deletespeciality/:codesp', async (req, res) => {
    try {
        const result = await connection.query('delete from specialities where codesp=?', [req.params.codesp]);
        return res.json({ deleteStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ deleteStatus: false, Error: err.message });
    }
});

// getting admin
adminrouter.get('/adminlist', async (req, res) => {
    try {
        const result = await connection.query('select * from admin');
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err.message });
    }
});

// login
adminrouter.post('/commun', async (req, res) => {
    try {
        const result1 = await connection.query("select * from delegate where mat=?", [req.body.matricule]);
        if (result1.results.length > 0) {
            const result2 = await connection.query("select * from royalstudent where mat=?", [req.body.matricule]);
            if (result2.results.length > 0) {
                const hash = await bcrypt.compare(req.body.password.toString(), result2.results[0].pass);
                if (hash) {
                    const token = jwt.sign({
                        role: "student",
                        matricule: req.body.matricule
                    },
                        "jwt_secretmysecret_key",
                        { expiresIn: '1d' }
                    );
                    res.cookie('token', token);
                    return res.json({ loginStatus: true, mat: result2.results[0].mat });
                } else {
                    return res.json({ loginStatus: false, Error: 'Wrong matricule or password' });
                }
            } else {
                return res.json({ loginStatus: false, Error: 'Wrong matricule or password' });
            }
        } else {
            return res.json({ loginStatus: false, Error: 'Wrong matricule or password' });
        }
    } catch (err) {
        return res.json({ loginStatus: false, Error: err });
    }
});

adminrouter.post('/login', async (req, res) => {
    try {
        const result = await connection.query("select * from royalstudent where mat=?", [req.body.matricule]);
        if (result.results.length > 0) {
            const hash = await bcrypt.compare(req.body.password.toString(), result.results[0].pass);
            if (hash) {
                const token = jwt.sign({
                    role: "student",
                    matricule: req.body.matricule
                },
                    "jwt_secretmysecret_key",
                    { expiresIn: '1d' }
                );
                res.cookie('token', token);

                return res.json({ role: 'student', loginStatus: true, mat: result.results[0].mat });
            } else {
                return res.json({ loginStatus: false, Error: 'Wrong matricule or password' });
            }
        } else {
            return res.json({ loginStatus: false, Error: 'Wrong matricule or password' });
        }
    } catch (err) {
        return res.json({ loginStatus: false, Error: err });
    }
});

//logout
adminrouter.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

//sign money
adminrouter.put('/solvability/:mat', async (req, res) => {
    console.log(req.body);
    const mat = req.body.mat;
    const year = req.body.year;
    const colone = req.body.colone;
    const value = req.body.valeur;
    console.log(value);

    try {

        const result1 = await connection.query(`select ${colone} from solvability WHERE mat = ? AND year = ?`, [mat, year]);
        console.log(result1.results.map(row => row[colone])); 
        let fvalue = parseInt(value) + parseInt(result1.results.map(row => row[colone]));
        console.log(parseInt(fvalue));
        const result2 = await connection.query(`UPDATE solvability SET ${colone} = ? WHERE mat = ? AND year = ?`, [value, mat, year]);
        console.log(result2.results);
        res.status(200).json({ success: true, Result: result2.results });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to update record' });
    }
});

//sign money
adminrouter.put('/sign/:code', async (req, res) => {
    const code = req.params.code;
    const colone = req.body.colone;
    const value = req.body.valeur;
    const month = req.body.month;

    try {
        const result = await connection.query(`UPDATE payement SET ${colone} = ? WHERE code = ? and month=?`, [value, code, month]);
        res.status(200).json({ success: true, Result: result.results });
    } catch (error) {

        res.status(500).json({ error: 'Failed to update record' });
    }
});

//create student
adminrouter.post('/addstudent', upload.single('pic'), async (req, res) => {
    try {

        console.log(req.body);
        let branch = req.body.branch

        const result1 = await connection.query("select * from royalstudent where email=? and name=?", [req.body.email, req.body.name]);
        if (result1.results.length > 0) {
            console.log("exsist");
            return res.json({ createStatus: false, Error: 'This student already exist' });
        }

        let date = new Date();
        const year = moment(date).format('YY');
        const regdate = moment(date).format('YYYY-MM-DD');
        let st_numb;
        let dep;

        const result2 = await connection.query('SELECT * FROM specialities where codesp=?', [req.body.spec]);
        dep = result2.results[0].codep;

        const result3 = await connection.query('SELECT COUNT(mat) AS st_numb FROM royalstudent');
        st_numb = result3.results[0].st_numb + 1;
        const mat = 'NH-0' + st_numb + req.body.spec + year;

        const hash = await bcrypt.hash(req.body.pass.toString(), 13);

        const result4 = await connection.query("INSERT INTO royalstudent (mat,name,email,phone,perentphone,spec,dep,level,birth,place,sex,pic,pass,regdate,year,branch) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [mat, req.body.name, req.body.email, req.body.phone, req.body.perentphone, req.body.spec, dep, req.body.level, req.body.birth, req.body.place, req.body.sex, req.body.name, hash, regdate, req.body.year, branch]);

        let tab1 = req.body.spec + req.body.year + "CA";
        let tab = req.body.spec + req.body.year + "EXAM";
        await connection.query("INSERT INTO " + tab1 + " (mat1,name,level) VALUES (?,?,?)", [mat, req.body.name, req.body.level]);
        await connection.query("INSERT INTO " + tab + " (mat1,name,level) VALUES (?,?,?)", [mat, req.body.name, req.body.level]);
        await connection.query("INSERT INTO solvability (mat,name,level,codesp,year,branch) VALUES (?,?,?,?,?,?)", [mat, req.body.name, req.body.level, req.body.spec, req.body.year, branch]);
        console.log(mat);
        return res.json({ createStatus: true, result: mat });
    } catch (error) {
        console.log(error);
        return res.json({ createStatus: false, Error: error });
    }
});

//getting a single student
adminrouter.get('/student/:mat', async (req, res) => {
    try {
        const result = await connection.query("select * from royalstudent where mat=?", [req.params.mat]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (error) {
        return res.json({ readingStatus: false, Error: error });
    }
});

//counting students
adminrouter.get('/countstudent', async (req, res) => {
    try {
        const result = await connection.query("select COUNT(mat) as student from royalstudent");
        return res.json({ Status: true, Result: result.results });
    } catch (error) {
        return res.json({ Status: false, Error: error });
    }
});

//deleting a single student
adminrouter.delete('/deletestudent/:mat', async (req, res) => {
    try {
        const result = await connection.query("delete from royalstudent where mat=?", [req.params.mat]);
        return res.json({ deleteStatus: true, Result: result.results });
    } catch (error) {
        return res.json({ deleteStatus: false, Error: error });
    }
});

// getting studentlist
adminrouter.get('/studentlist', async (req, res) => {
    try {
        const result = await connection.query("SELECT * FROM royalstudent");
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err });
    }
});

// getting number
adminrouter.get('/number', async (req, res) => {
    try {
        const result = await connection.query("SELECT * FROM nom");
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err });
    }
});

// getting studentlist
adminrouter.get('/studentsort/:data', async (req, res) => {

    try {
        const result = await connection.query(
            "SELECT * FROM royalstudent WHERE spec = ? AND level = ? AND branch = ? AND year = ?",
            [req.query.spec, req.query.level, req.query.branch, req.query.year]
        );

        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {

        return res.json({ readingStatus: false, Error: err });
    }
});

// getting solvability
adminrouter.get('/solvability/:data', async (req, res) => {
    try {
        const result = await connection.query(
            "SELECT * FROM solvability WHERE mat = ?",
            [req.query.mat]
        );
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err });
    }
});

//getting feesboard
adminrouter.get('/feesboard/:data', async (req, res) => {
    try {
        const result = await connection.query(
            "SELECT * FROM solvability WHERE codesp = ? AND level = ? AND branch = ?",
            [req.query.codesp, req.query.level, req.query.branch]
        );
        if (result.results.length > 0) {
            return res.json({ readingStatus: true, Result: result.results });
        } else {
            return res.json({ readingStatus: false, Result: 'No records' });
        }
    } catch (err) {

        return res.json({ readingStatus: false, Error: err });
    }
});

// getting payement
adminrouter.get('/payement/:data', async (req, res) => {

    try {
        const result = await connection.query(
            "SELECT * FROM payement WHERE month = ? AND branch = ?",
            [req.query.month, req.query.branch]
        );

        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {

        return res.json({ readingStatus: false, Error: err });
    }
});

// getting attendancelist
adminrouter.get('/attendance/:data', async (req, res) => {
    try {
        const result = await connection.query(
            "SELECT * FROM attendance WHERE codesp = ? AND month = ? AND branch = ?",
            [req.query.spec, req.query.month, req.query.branch]
        );
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {

        return res.json({ readingStatus: false, Error: err });
    }
});

adminrouter.put('/uprec', async (req, res) => {

    try {
        const { value } = req.body;
        const result = await connection.query(
            "UPDATE nom SET rec = ?",
            [value]
        );

        return res.status(200).json({ success: true, Result: result.results });
    } catch (error) {

        return res.status(500).json({ error: 'Failed to update record' });
    }
});

adminrouter.put('/uptrans', async (req, res) => {
    try {
        const { value } = req.body;
        const result = await connection.query(
            "UPDATE nom SET trans = ?",
            [value]
        );
        return res.status(200).json({ success: true, Result: result.results });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update record' });
    }
});

//create attendance
adminrouter.post('/addattendance', async (req, res) => {

    let date = req.body.day;
    const month = moment(date).format('MM');

    try {

        const result = await connection.query("select * from attendance where lecturer=? and code=? and day=? and codesp=? and period=?", [req.body.lecturer, req.body.code, req.body.day, req.body.spec, req.body.period]);

        if (result.results.length > 0) {

            return res.json({ createStatus: false, Error: 'This period already exist' })
        } else {
            const hash = await bcrypt.hash(req.body.pass.toString(), 4);
            await connection.query("INSERT INTO attendance (lecturer,month,day,codesp,level,period,code,hour,pass,sign,branch) VALUES (?,?,?,?,?,?,?,?,?,?,?)", [req.body.lecturer, month, req.body.day, req.body.spec, req.body.level, req.body.period, req.body.code, req.body.hour, hash, req.body.sign, req.body.branch]);
            const result1 = await connection.query(
                "select coasthour from staff where mat=?",
                [req.body.lecturer]
            );
            const coasthour = result1.results[0].coasthour;
            const result2 = await connection.query(
                "select totalhour, total from payement where lecturer=? and code=? and month=?",
                [req.body.lecturer, req.body.code, month]
            );
            if (result2.results.length > 0) {
                let total = result2.results[0].total + coasthour * req.body.hour;
                let totalh = result2.results[0].totalhour;
                totalh = parseInt(totalh);
                let hour = parseInt(req.body.hour);
                let totalhour = hour + totalh;
                let lecturer = req.body.lecturer;
                let code = req.body.code;
                await connection.query(
                    "UPDATE payement SET totalhour=?, total=? where lecturer=? and month=? and code=?",
                    [totalhour, total, lecturer, month, code]
                );
            } else {
                const result1 = await connection.query(
                    "select * from staff where mat=?",
                    [req.body.lecturer]
                );
                const name = result1.results[0].name;
                const phone = result1.results[0].phone;
                const result3 = await connection.query(
                    "select totalhour from payement where lecturer=? and code=?",
                    [req.body.lecturer, req.body.code]
                );
                const totalhour = req.body.hour;
                const total = coasthour * totalhour;
                await connection.query(
                    "INSERT INTO payement (lecturer,name,phone,code,level,codesp,month,coasthour,totalhour,total,branch) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                    [req.body.lecturer, name, phone, req.body.code, req.body.level, req.body.spec, month, coasthour, totalhour, total, req.body.branch]
                );
            }
            return res.json({ createStatus: true, success: 'success' });
        }
    } catch (err) {

        return res.json({ createStatus: false, Error: 'Error connecting' });
    }
})

adminrouter.post('/loginbank', async (req, res) => {

    try {
        const com = "select * from bank where caisse=?";
        const result = await connection.query(com, [req.body.caisse]);

        if (result.results.length > 0) {
            const hash = await bcrypt.compare(req.body.password.toString(), result.results[0].password);

            if (hash) {
                const token = jwt.sign({
                    role: "bank",
                    matricule: req.body.caisse
                },
                    "jwt_secretmysecret_key",
                    { expiresIn: '1d' });
                res.cookie('token', token);
                return res.json({ loginStatus: true });
            } else {
                return res.json({ loginStatus: false, Error: 'Wrong checkout or password' });
            }
        } else {
            return res.json({ loginStatus: false, Error: 'Wrong checkout or password' });
        }
    } catch (err) {
        console.error(err);
        return res.json({ loginStatus: false, Error: err });
    }
});
adminrouter.post('/logintostaff', async (req, res) => {
    try {
        const com = "select * from staff where mat=?";
        const result = await connection.query(com, [req.body.matricule]);
        if (result.results.length > 0) {
            const hash = await bcrypt.compare(req.body.password.toString(), result.results[0].pass);
            if (hash) {
                const token = jwt.sign({
                    role: "staff",
                    matricule: req.body.matricule
                },
                    "jwt_secretmysecret_key",
                    { expiresIn: '1d' });
                res.cookie('token', token);
                return res.json({ loginStatus: true, mat: result.results[0].mat });
            } else {
                return res.json({ loginStatus: false, Error: 'Wrong matricule or password' });
            }
        } else {
            return res.json({ loginStatus: false, Error: 'Wrong matricule or password' });
        }
    } catch (err) {
        console.error(err);
        return res.json({ loginStatus: false, Error: err });
    }
});

// logout
adminrouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
});

// create staff
adminrouter.post('/addstaff', upload.single('pic'), async (req, res) => {
    try {
        const date = new Date();
        const year = moment(date).format('YY');
        const countResult = await connection.query('SELECT COUNT(mat) AS st_numb FROM staff')
        const st_numb = countResult.results[0].st_numb + 5;
        const mat = 'NHIEPS-0' + st_numb + year;
        const com = ("select * from staff where mat=?");
        const result = await connection.query(com, [mat]);
        if (result.results.length > 0) {
            return res.json({ createStatus: false, Error: 'This member already exist' });
        }
        if (req.body.pass !== req.body.cpass) {
            return res.json({ Status: false, Error: 'Password doesn\'t match' });
        }
        const hash = await bcrypt.hash(req.body.pass.toString(), 13);
        const birth = moment(req.body.birth).format("YYYY-MM-DD");
        const com2 = "INSERT INTO staff (mat,name,codep,email,phone,grade,birth,place,sex,idcard,pic,pass,year,branch) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const countResulta = await connection.query(com2, [mat, req.body.name, req.body.codep, req.body.email, req.body.phone, req.body.grade, birth, req.body.place, req.body.sex, req.body.idcard, req.file.filename, hash, req.body.year, req.body.branch]);
        const pay = "INSERT INTO payement (lecturer,name,phone,branch) VALUES (?,?,?,?)";
        const countResultz = await connection.query(pay, [mat, req.body.name, req.body.phone, req.body.branch]);

        return res.json({ createStatus: true, result: mat });
    } catch (err) {

        return res.json({ createStatus: false, Error: err });
    }
});

//getting a single staff
adminrouter.get('/staff/:mat', async (req, res) => {
    try {
        const result = await connection.query("select * from staff where mat=?", [req.params.mat]);
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err });
    }
});

//counting staff
adminrouter.get('/countstaff', async (req, res) => {
    try {
        const result = await connection.query("select COUNT(mat) as staff from staff");
        return res.json({ Status: true, Result: result.results });
    } catch (err) {
        return res.json({ Status: false, Error: err });
    }
});

//deleting a single staff
adminrouter.delete('/deletestaff/:mat', async (req, res) => {
    try {
        const result = await connection.query("delete from staff where mat=?", [req.params.mat]);
        return res.json({ deleteStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ deleteStatus: false, Error: err });
    }
});

//getting staff 
adminrouter.get('/staff', async (req, res) => {
    try {
        const result = await connection.query("select * from staff");
        return res.json({ readingStatus: true, Result: result.results });
    } catch (err) {
        return res.json({ readingStatus: false, Error: err });
    }
});
module.exports = { adminrouter };
