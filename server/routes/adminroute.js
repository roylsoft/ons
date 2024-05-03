import express, { Router, query } from "express";
import connection from "../utils/db.js";
import jwt from "jsonwebtoken";
import moment from 'moment';
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";


const router = express.Router()

//handle images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }

})

//getting admin
router.get('/admin', (req, res) => {
    const com = "select * from admin";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})
router.get('/banker', (req, res) => {
    const com = "select * from bank";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})


const upload = multer({
    storage: storage
})
//end handle images

//getting student marks
router.get('/marksort/:data', (req, res) => {
    let tab = req.query.spec + req.query.session
    const com = "SELECT " + tab + ".* FROM " + tab + " INNER JOIN course ON " + tab + ".level = course.level WHERE course.semester = ? AND course.spec = ?  AND " + tab + ".level = ? ORDER BY mat1 ASC;";
    connection.query(com, [req.query.semester, req.query.spec, req.query.level], (err, result) => {
        if (err) {
            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {
            result = Array.from(new Set(result.map(JSON.stringify)), JSON.parse);
            return res.json({ result: result })
        }
    })
})


//getting studentlist
router.get('/timetable/:data', (req, res) => {

    const com = "select * from course where spec=? and level=? and semester=?";
    connection.query(com, [req.query.spec, req.query.level, req.query.semester], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })
})

//getting student marks/lecturer
router.get('/sortmark/:data', (req, res) => {
    let tab = req.query.spec + req.query.session

    const com = "SELECT code FROM course WHERE course.mat=? and course.semester=? and course.spec=? and course.level=?";
    connection.query(com, [req.query.mat, req.query.semester, req.query.spec, req.query.level], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {
            if (result.length > 0) {
                let colones
                let full = ['mat1', 'level']
                colones = result.map(result => result.code)

                for (let i = 0; i < colones.length; i++) {
                    full.push(colones[i])
                }

                const com1 = "SELECT mat1,level," + colones.join(', ') + " FROM " + tab + " where " + tab + ".level=?"
                connection.query(com1, [req.query.level], (err, result) => {
                    if (err) {

                        return res.json({ readingStatus: false, Error: 'Error' })
                    }
                    else {
                        return res.json({ result: result })
                    }
                })
            }

        }
    })

})

//getting result
router.post('/transcript1', (req, res) => {
    const student = "select spec, level from royalstudent where mat=?"
    const comn = "SELECT code,title,credit FROM course where spec=? and level=? and semester=?"
    let mat = req.body.mat

    connection.query(student, [mat], (err, result) => {
        let spec = result[0].spec
        let level = result[0].level
        let CA = spec + "CA"
        let EXAM = spec + "EXAM"

        //getting student courses

        connection.query(comn, [spec, level, 1], (err, result1) => {
            if (err) {

                return res.json({ readingStatus: false, Error: 'Error' })
            }
            else {
                if (result1.length > 0) {

                    let codes = result1.map(result1 => result1.code)


                    //getting CAs marks
                    const com = "SELECT " + codes.join(', ') + " FROM " + CA + " WHERE mat1 = ?";
                    connection.query(com, [mat], (err, resultca) => {
                        if (err) {

                            return res.json({ readingStatus: false, Error: 'Error' })
                        }
                        else {
                            if (resultca.length > 0) {
                                let colones
                                colones = Object.values(resultca[0])

                                resultca = colones.map((value) => ({ ca: value }))
                                for (let i = 0; i < resultca.length; i++) {
                                    if (resultca[i].ns === null) {
                                        resultca[i].ns = 0
                                    }
                                }

                                let result = result1.map((object, index) => {
                                    return {
                                        ...object, ...resultca[index]
                                    }
                                })
                                if (result[0].ca === null) {
                                    result[0].ca = 0
                                }

                                //getting EXAMs marks
                                const com1 = "SELECT " + codes.join(', ') + " FROM " + EXAM + " WHERE mat1 = ?";
                                connection.query(com1, [mat], (err, resultexam) => {
                                    if (err) {

                                        return res.json({ readingStatus: false, Error: 'Error' })
                                    }
                                    else {
                                        if (resultexam.length > 0) {
                                            let colones
                                            colones = Object.values(resultexam[0])

                                            resultexam = colones.map((value) => ({ ns: value }))

                                            for (let i = 0; i < resultexam.length; i++) {
                                                if (resultexam[i].ns === null) {
                                                    resultexam[i].ns = 0
                                                }
                                            }

                                            result = result.map((object, index) => {
                                                return {
                                                    ...object, ...resultexam[index]
                                                }
                                            })


                                            return res.json({ result: result })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    })

})

router.post('/transcript2', (req, res) => {
    const student = "select spec, level from royalstudent where mat=?"
    const comn = "SELECT code,title,credit FROM course where spec=? and level=? and semester=?"

    let mat = req.body.mat
    connection.query(student, [mat], (err, result) => {

        let spec = result[0].spec
        let level = result[0].level
        let CA = spec + "CA"
        let EXAM = spec + "EXAM"

        //getting student courses
        connection.query(comn, [spec, level, 2], (err, result1) => {
            if (err) {

                return res.json({ readingStatus: false, Error: 'Error' })
            }
            else {
                if (result1.length > 0) {

                    let codes = result1.map(result1 => result1.code)


                    //getting CAs marks
                    const com = "SELECT " + codes.join(', ') + " FROM " + CA + " WHERE mat1 = ?";
                    connection.query(com, [mat], (err, resultca) => {
                        if (err) {

                            return res.json({ readingStatus: false, Error: 'Error' })
                        }
                        else {
                            if (resultca.length > 0) {
                                let colones
                                colones = Object.values(resultca[0])

                                resultca = colones.map((value) => ({ ca: value }))
                                for (let i = 0; i < resultca.length; i++) {
                                    if (resultca[i].ns === null) {
                                        resultca[i].ns = 0
                                    }
                                }

                                let result = result1.map((object, index) => {
                                    return {
                                        ...object, ...resultca[index]
                                    }
                                })
                                console.log(result);
                                //getting EXAMs marks
                                const com1 = "SELECT " + codes.join(', ') + " FROM " + EXAM + " WHERE mat1 = ?";
                                connection.query(com1, [mat], (err, resultexam) => {
                                    if (err) {

                                        return res.json({ readingStatus: false, Error: 'Error' })
                                    }
                                    else {
                                        if (resultexam.length > 0) {
                                            let colones
                                            colones = Object.values(resultexam[0])

                                            resultexam = colones.map((value) => ({ ns: value }))
                                            for (let i = 0; i < resultexam.length; i++) {
                                                if (resultexam[i].ns === null) {
                                                    resultexam[i].ns = 0
                                                }
                                            }

                                            result = result.map((object, index) => {
                                                return {
                                                    ...object, ...resultexam[index]
                                                }
                                            })

                                            return res.json({ result: result })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    })

})



//update mark/lecturer
router.get('/lectupdatemark/:inf', (req, res) => {
    let requette = req.query
    let data = Object.values(requette)

    let tab = data[0] + data[1]
    let value = data[4]
    let mat = data[5]
    let level = data[6]
    let spec = data[0]
    let semester = data[7]
    let col = data[3]
    let etudiant = data[8]
    const com = "SELECT code FROM course WHERE course.mat=? and course.semester=? and course.spec=? and course.level=?";
    connection.query(com, [mat, semester, spec, level], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {
            let colones
            let full = ['mat1', 'level']
            colones = result.map(result => result.code)

            for (let i = 0; i < colones.length; i++) {
                full.push(colones[i])
            }

            let colone = full[col]

            const com = 'UPDATE ' + tab + ' SET ' + colone + '=? where mat1=?';
            connection.query(com, [value, etudiant], (err, result) => {
                if (err) {
                    return res.json({ Error: 'Error' })
                }
                else {

                    return res.json({ result: result, createStatus: true })
                }
            })
        }
    })
})

//update mark
router.get('/updatemark/:inf', (req, res) => {
    let requette = req.query
    let data = Object.values(requette)

    let tab = data[0] + data[1]
    let value = data[4]
    let col = data[3]
    let matri = data[5]

    let colones
    const comcol = 'select COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME=?'
    connection.query(comcol, [tab], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            colones = result.map(result => result.COLUMN_NAME)

            let colone = colones[col]

            const com = 'UPDATE ' + tab + ' SET ' + colone + '=? where mat1=?';
            connection.query(com, [value, matri], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {

                    return res.json({ result: result, createStatus: true })
                }
            })
        }
    })

})

//login
router.post('/adminlogin', (req, res) => {
    const com = "select * from admin where mat=?";
    connection.query(com, [req.body.matricule], (err, result) => {
        if (err) {

            return res.json({ loginStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].pass, (err, hash) => {
                if (err) {

                    return res.json({ loginStatus: false, Error: 'Password compare Error' })
                }
                if (hash) {
                    const matricule = result[0].mat
                    const token = jwt.sign({
                        role: "admin",
                        matricule: req.body.matricule
                    },
                        "jwt_secretmysecret_key",
                        { expiresIn: '1d' }
                    )
                    res.cookie('token', token)

                    return res.json({ loginStatus: true, mat: result[0].mat })
                } else {

                    return res.json({ loginStatus: false, Error: 'Wrong matricule or password' })
                }

            })
        } else {

            return res.json({ loginStatus: false, Error: 'Wrong matricule or password' })
        }
    })

})

router.post('/loginbank', (req, res) => {

    const com = "select * from bank where caisse=?";
    connection.query(com, [req.body.caisse], (err, result) => {
        if (err) {

            return res.json({ loginStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].mat, (err, hash) => {
                if (err) {

                    return res.json({ loginStatus: false, Error: 'Password compare Error' })
                } else
                    if (hash) {

                        const token = jwt.sign({
                            role: "bank",
                            caisse: req.body.caisse
                        },
                            "jwt_secretmysecret_key",
                            { expiresIn: '1d' }
                        )
                        res.cookie('token', token)

                        return res.json({ loginStatus: true, result: result })

                    } else {
                        return res.json({ loginStatus: false, Error: 'Wrong checkout or password' })
                    }

            })
        } else {

            return res.json({ loginStatus: false, Error: 'Wrong checkout or password' })
        }
    })

})

//logout
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

//create department
router.post('/adddepartment', (req, res) => {

    const com = "select * from department where codep=? and title=?";
    connection.query(com, [req.body.codep, req.body.title], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {
            const codesp = result[0].codep

            return res.json({ createStatus: false, Error: 'This department already exist' })
        } else {
            const com = "INSERT INTO department (codep,title) VALUES (?,?)";
            connection.query(com, [req.body.codep, req.body.title], (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }
                else {

                    return res.json({ createStatus: true })
                }
            })
        }
    })

})

//create speciality
router.post('/addspeciality', (req, res) => {

    const com = "select * from specialities where codesp=? and title=?";
    connection.query(com, [req.body.codesp, req.body.title], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {
            const codesp = result[0].codesp

            return res.json({ createStatus: false, Error: 'This speciality already exist' })
        } else {
            let tab = req.body.codesp + "EXAM"
            let tab1 = req.body.codesp + "CA"
            const com = "INSERT INTO specialities (codesp,title,codep) VALUES (?,?,?)";
            const ex = "CREATE TABLE " + tab + " (`mat1` VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,`level` int NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
            const ca = "CREATE TABLE " + tab1 + " (`mat1` VARCHAR(15) NOT NULL,`level` int NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;"
            const setca = "ALTER TABLE " + tab1 + " ADD PRIMARY KEY (`mat`);"
            const setex = "ALTER TABLE " + tab + " ADD PRIMARY KEY (`mat`);"

            connection.query(com, [req.body.codesp, req.body.title, req.body.codep], (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }
                else {

                    return res.json({ createStatus: true })
                }
            })
            connection.query(ex, (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }

            })
            connection.query(ca, (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }

            })
            connection.query(setex, (err, result) => {
                if (err) {

                    return res.json({ Error: 'Error' })
                }

            })
            connection.query(setca, (err, result) => {
                if (err) {

                    return res.json({ Error: 'Error' })
                }

            })
        }
    })

})

//create course
router.post('/addcourse', (req, res) => {

    const com = "select * from course where code=? and title=?";
    connection.query(com, [req.body.code, req.body.title], (err, result) => {
        if (err) {

            return res.json({ Error: 'Error' })

        }
        if (result.length > 0) {
            const codesp = result[0].codesp

            return res.json({ createStatus: false, Error: 'This course already exist' })
        } else {
            const com = "INSERT INTO course (code,title,credit,spec,level,type) VALUES (?,?,?,?,?,?)";
            connection.query(com, [req.body.code, req.body.title, req.body.credit, req.body.speciality, req.body.level, req.body.type], (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }
                else {

                    return res.json({ createStatus: true })
                }
            })
            let tab = req.body.speciality + "EXAM"
            let tab1 = req.body.speciality + "CA"
            const setca = 'ALTER TABLE ' + tab1 + ' ADD COLUMN ' + req.body.code + ' VARCHAR(255)'
            connection.query(setca, (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }

            })
            const setex = 'ALTER TABLE ' + tab + ' ADD COLUMN ' + req.body.code + ' VARCHAR(255)'
            connection.query(setex, (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }

            })

        }
    })

})

router.put('/editadmin/:mat', (req, res) => {

    const com = "select * from admin where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length == 0) {

            return res.json({ updatingStatus: false, Error: 'This member doesn\'t exist' })
        } else {
            let birth = moment(req.body.birth).format("YYYY-MM-DD")
            const values = [req.body.name, req.body.email, req.body.phone, req.body.role, req.body.grade, req.body.idcard, birth, req.body.place, req.body.sex]
            const com = 'UPDATE admin SET name=?,email=?,phone=?,role=?,grade=?,idcard=?,birth=?,place=?,sex=? where mat=?';
            connection.query(com, [...values, req.params.mat], (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }
                else {

                    return res.json({ createStatus: true, Matricule: 'Your unique ID is:' + req.params.mat })
                }
            })

        }
    });
});
router.put('/editbanker/:caisse', (req, res) => {

    const com = "select * from bank where caisse=?";
    connection.query(com, [req.params.caisse], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length == 0) {

            return res.json({ updatingStatus: false, Error: 'This member doesn\'t exist' })
        } else {

            const values = [req.body.password]
            const com = 'UPDATE bank SET mat=? where caisse=?';
            connection.query(com, [...values, req.params.caisse], (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }
                else {
                    return res.json({ createStatus: true, result: result })
                }
            })

        }
    });
});

//create admin
router.post('/addbanker', (req, res) => {

    const com = "INSERT INTO bank (mat,caisse) VALUES (?,?)";
    bcrypt.hash(req.body.password, 13, (err, hash) => {
        connection.query(com, [hash, req.body.caisse], (err, result) => {
            if (err) {

                return res.json({ createStatus: false, Error: 'Error' })
            }
            else {

                return res.json({ createStatus: true })
            }
        });
    })
})
//create admin
router.post('/key', (req, res) => {

    const com = "INSERT INTO cle (cle) VALUES (?)";
    connection.query(com, [req.body.randomNumber], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ createStatus: true })
        }
    });
})

router.post('/addadmin', upload.single('pic'), (req, res) => {

    const com = "select * from admin where mat=?";
    connection.query(com, [req.body.mat], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {
            const codesp = result[0].email

            return res.json({ createStatus: false, Error: 'This member already exist' })
        } else {
            let date = new Date();
            const yaer = moment(date).format('YY');
            let st_numb
            var sql = 'SELECT COUNT(mat) AS st_numb FROM admin'
            connection.query(sql, (err, result) => {
                if (err) throw err;
                if (req.body.pass != req.body.cpass) {
                    return res.json({ Status: false, Error: 'Password doesn\'t match' })
                } else {
                    bcrypt.hash(req.body.pass, 13, (err, hash) => {
                        if (err) {

                            return res.json({ Status: false, Error: 'Error hashing' })
                        }
                        let birth = moment(req.body.birth).format("YYYY-MM-DD")
                        st_numb = result[0].st_numb
                        st_numb++
                        const mat = 'NFONAP-0' + st_numb + yaer
                        const com = "INSERT INTO admin (mat,name,email,phone,role,grade,birth,place,idcard,pic,pass,sex) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
                        connection.query(com, [mat, req.body.name, req.body.email, req.body.phone, req.body.role, req.body.grade, birth, req.body.place, req.body.idcard, req.file.filename, hash, req.body.sex], (err, result) => {
                            if (err) {

                                return res.json({ createStatus: false, Error: 'Error' })
                            }
                            else {

                                return res.json({ createStatus: true, Matricule: result[0].mat })
                            }
                        });
                    })
                }

            });
        }
    });
});

router.put('/editcourse/:codec', (req, res) => {

    const com = "select * from course where code=?";
    connection.query(com, [req.params.codec], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length == 0) {

            return res.json({ updatingStatus: false, Error: 'This course doesn\'t exist' })
        } else {


            const values = [req.body.code, req.body.title, req.body.credit, req.body.spec, req.body.level, req.body.semester, req.body.mat, req.body.name, req.body.phone]
            const com = 'UPDATE course SET code=?,title=?,credit=?,spec=?,level=?,semester=?,mat=?,name=?,phone=? where code=?';
            connection.query(com, [...values, req.params.codec], (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }
                else {

                    return res.json({ createStatus: true })
                }
            });
        }
    });
});

router.put('/updatecourse/:code', (req, res) => {
    const code = req.params.code;
    const colone = req.body.colone;
    const value = req.body.valeur;
    // Update the record in the database
    const query = `UPDATE course SET ${colone} = ? WHERE code = ?`;
    connection.query(query, [value, code], (error, result) => {
        if (error) {

            res.status(500).json({ error: 'Failed to update record' });
        } else {

            res.status(200).json({ success: true, result: result });
        }
    });
});

router.put('/editdep/:code', (req, res) => {

    const com = "select * from department where codep=?";
    connection.query(com, [req.params.code], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length === 0) {

            return res.json({ updatingStatus: false, Error: 'This department doesn\'t exist' })
        } else {

            const values = [req.body.codep, req.body.title]
            const com = 'UPDATE department SET codep=?,title=? where codep=?';
            connection.query(com, [...values, req.params.code], (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }
                else {

                    return res.json({ createStatus: true, Matricule: 'Your unique ID is:' })
                }
            });
        }
    });
});
router.put('/editspec/:code', (req, res) => {

    const com = "select * from specialities where codesp=?";
    connection.query(com, [req.params.code], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length === 0) {

            return res.json({ updatingStatus: false, Error: 'This student doesn\'t exist' })
        } else {

            const values = [req.body.codesp, req.body.title, req.body.codep]
            const com = 'UPDATE specialities SET codesp=?,title=?,codep=? where codesp=?';
            connection.query(com, [...values, req.params.code], (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }
                else {

                    return res.json({ createStatus: true, Matricule: 'Your unique ID is:' })
                }
            });
        }
    });
});
router.put('/editstudent/:mat', (req, res) => {

    const com = "select * from royalstudent where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length == 0) {

            return res.json({ updatingStatus: false, Error: 'This student doesn\'t exist' })
        } else {

            let dep
            var sql = 'SELECT * FROM specialities where codesp=?'
            connection.query(sql, [req.body.spec], (err, result) => {
                if (err) throw err;
                dep = result[0].codep

                let birth = moment(req.body.birth).format("YYYY-MM-DD")
                const values = [req.body.name, req.body.email, req.body.phone, req.body.spec, dep, req.body.level, birth, req.body.place, req.body.sex]
                const com = 'UPDATE royalstudent SET name=?,email=?,phone=?,spec=?,dep=?,level=?,birth=?,place=?,sex=? where mat=?';
                connection.query(com, [...values, req.params.mat], (err, result) => {
                    if (err) {

                        return res.json({ createStatus: false, Error: 'Error' })
                    }
                    else {

                        return res.json({ createStatus: true, Matricule: 'Your unique ID is:' + req.params.mat })
                    }
                });
            });

        }
    });
});

router.put('/editstaff/:mat', (req, res) => {

    const com = "select * from staff where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length == 0) {

            return res.json({ updatingStatus: false, Error: 'This student doesn\'t exist' })
        } else {
            let birth = moment(req.body.birth).format("YYYY-MM-DD")
            const values = [req.body.name, req.body.email, req.body.codep, req.body.phone, req.body.grade, req.body.idcard, birth, req.body.place, req.body.sex, req.body.coasthour]
            const com = 'UPDATE staff SET name=?,email=?,codep=?,phone=?,grade=?,idcard=?,birth=?,place=?,sex=?,coasthour=? where mat=?';
            connection.query(com, [...values, req.params.mat], (err, result) => {
                if (err) {

                    return res.json({ createStatus: false, Error: 'Error' })
                }
                else {

                    return res.json({ createStatus: true, Matricule: 'Your unique ID is:' + req.params.mat })
                }
            })

        }
    });
});


//getting course
router.get('/course/:codec', (req, res) => {
    const com = "select * from course where code=?";
    connection.query(com, [req.params.codec], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})

router.get('/courselist/:mat', (req, res) => {
    const com = "select * from course where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})
router.get('/courselist', (req, res) => {
    const com = "select * from course";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})

//getting single speciality
router.get('/specialities/:code', (req, res) => {
    const com = "select * from specialities where codesp=?";
    connection.query(com, [req.params.code], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})

//getting specialities
router.get('/specialities', (req, res) => {
    const com = "select * from specialities";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})

//getting single department
router.get('/department/:code', (req, res) => {
    const com = "select * from department where codep=?";
    connection.query(com, [req.params.code], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})
//getting department
router.get('/department', (req, res) => {
    const com = "select * from department";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})

//getting a single admin
router.get('/adminlist/:mat', (req, res) => {

    const com = "select * from admin where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})

// //counting admins
router.get('/countadmin', (req, res) => {
    const com = "select COUNT(mat) as admin from admin";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ Status: false, Error: 'Error' })
        }
        else {
            return res.json({ Status: true, Result: result })
        }
    })

})

//counting specialities
router.get('/countspeciality', (req, res) => {
    const com = "select COUNT(codesp) as speciality from specialities";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ Status: false, Error: 'Error' })
        }
        else {
            return res.json({ Status: true, Result: result })
        }
    })

})

//counting courses
router.get('/countcourse', (req, res) => {
    const com = "select COUNT(code) as course from course";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ Status: false, Error: 'Error' })
        }
        else {
            return res.json({ Status: true, Result: result })
        }
    })

})


//deleting a single admin
router.delete('/deletecourse/:code', (req, res) => {

    const com = "delete from course where code=?";
    connection.query(com, [req.params.code], (err, result) => {
        if (err) {

            return res.json({ deleteStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ deleteStatus: true, Result: result })
        }
    })

})
router.delete('/deleteadmin/:mat', (req, res) => {

    const com = "delete from admin where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {

            return res.json({ deleteStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ deleteStatus: true, Result: result })
        }
    })

})
router.delete('/deletespeciality/:codesp', (req, res) => {

    const com = "delete from specialities where codesp=?";
    connection.query(com, [req.params.codesp], (err, result) => {
        if (err) {

            return res.json({ deleteStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ deleteStatus: true, Result: result })
        }
    })

})

//getting admin
router.get('/adminlist', (req, res) => {
    const com = "select * from admin";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})

export { router as adminrouter }