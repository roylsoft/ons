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
        cb(null, '../public/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }

})
const upload = multer({
    storage: storage
})
//end handle images

//login
router.post('/commun', (req, res) => {
    const com = "select * from delegate where mat=?";
    const comm = "select * from royalstudent where mat=?";

    connection.query(com, [req.body.matricule], (err, result) => {
        if (err) {

            return res.json({ loginStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {
            connection.query(comm, [req.body.matricule], (err, result) => {
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
                                role: "student",
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
                }
            })
        } else {

            return res.json({ loginStatus: false, Error: 'Wrong matricule or password' })
        }
    })


})

//login
router.post('/login', (req, res) => {
    const com = "select * from royalstudent where mat=?";

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
                        role: "student",
                        matricule: req.body.matricule
                    },
                        "jwt_secretmysecret_key",
                        { expiresIn: '1d' }
                    )
                    res.cookie('token', token)
                    console.log('login succesfully');
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

//logout
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

//create attendance
router.post('/addattendance', (req, res) => {
    let date = req.body.day;
    const month = moment(date).format('MM');
    const com1 = "select coasthour from staff where mat=?";
    const com2 = "select totalhour, total from payement where lecturer=? and code=? and month=?";
    const com3 = "select totalhour from payement where lecturer=? and code=?";
    const com = "select * from attendance where lecturer=? and code=? and day=? and codesp=? and period=?";
    connection.query(com, [req.body.lecturer, req.body.code, req.body.day, req.body.spec, req.body.period], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {

            return res.json({ createStatus: false, Error: 'This period already exist' })
        } else {
            bcrypt.hash(req.body.pass.toString(), 4, (err, hash) => {
                if (err) {

                    return res.json({ Status: false, Error: 'Error hashing' })
                }
                const com = "INSERT INTO attendance (lecturer,month,day,codesp,level,period,code,hour,pass,sign) VALUES (?,?,?,?,?,?,?,?,?,?)";
                connection.query(com, [req.body.lecturer, month, req.body.day, req.body.spec,
                req.body.level, req.body.period, req.body.code,
                req.body.hour, hash, req.body.sign], (err, result) => {
                    if (err) {

                        return res.json({ createStatus: false, Error: 'Error' })
                    }

                });
                connection.query(com1, [req.body.lecturer], (err, result) => {
                    if (err) {
                        return res.json({ Error: 'Error' })
                    } else {
                        let coasthour = result[0].coasthour
                        connection.query(com2, [req.body.lecturer, req.body.code, month], (err, result) => {
                            if (err) {

                                return res.json({ createStatus: false, Error: 'Error' })
                            }
                            if (result.length > 0) {
                                let total = result[0].total + coasthour * req.body.hour
                                let totalh = result[0].totalhour
                                parseInt(totalh)
                                let hour = parseInt(req.body.hour)
                                let totalhour = hour + totalh
                                let lecturer = req.body.lecturer
                                let code = req.body.code
                                const comand = 'UPDATE payement SET totalhour=?, total=? where lecturer=? and month=? and code=?';
                                connection.query(comand, [totalhour, total, lecturer, month, code], (err, result) => {
                                    if (err) {

                                        return res.json({ createStatus: false, Error: 'Error' })
                                    }

                                });
                            } else {
                                const com1 = "select * from staff where mat=?";
                                connection.query(com1, [req.body.lecturer], (err, result) => {
                                    if (err) {

                                        return res.json({ readingStatus: false, Error: 'Error' })
                                    }
                                    else {
                                        let name = result[0].name
                                        let phone = result[0].phone

                                        connection.query(com3, [req.body.lecturer, req.body.code], (err, result) => {
                                            const comm = "INSERT INTO payement (lecturer,name,phone,code,level,codesp,month,coasthour,totalhour,total) VALUES (?,?,?,?,?,?,?,?)";
                                            let totalhour = req.body.hour
                                            let total = coasthour * totalhour;
                                            connection.query(comm, [req.body.lecturer, name, phone, req.body.code, req.body.level,
                                            req.body.spec, month, coasthour, totalhour, total], (err, result) => {
                                                if (err) {

                                                    return res.json({ createStatus: false, Error: 'Error' })
                                                }

                                            });
                                        });
                                    }
                                })
                            }

                        });
                    }
                });
            });
        }
    })
})


//sign money
router.put('/solvability/:mat', (req, res) => {
    const mat = req.params.mat;
    const colone = req.body.colone;
    const value = req.body.valeur;

    const query1 = `select ${colone} from solvability WHERE mat = ?`;
    const query = `UPDATE solvability SET ${colone} = ? WHERE mat = ?`;
    connection.query(query1, [mat], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            let fvalue = parseInt(value) + parseInt(parseInt(result.map(row => row[colone])))

            connection.query(query, [fvalue, mat], (error, result) => {
                if (error) {

                    res.status(500).json({ error: 'Failed to update record' });
                } else {

                    res.status(200).json({ success: true, result: result });
                }
            });
        }
    })
});
//sign money
router.put('/sign/:code', (req, res) => {
    const code = req.params.code;
    const colone = req.body.colone;
    const value = req.body.valeur;
    const month = req.body.month;
    // Update the record in the database
    const query = `UPDATE payement SET ${colone} = ? WHERE code = ? and month=?`;
    connection.query(query, [value, code, month], (error, result) => {
        if (error) {

            res.status(500).json({ error: 'Failed to update record' });
        } else {

            res.status(200).json({ success: true, result: result });
        }
    });
});

//create student
router.post('/addstudent', upload.single('pic'), (req, res) => {
    const com = "select * from royalstudent where email=? and name=?";
    connection.query(com, [req.body.email, req.body.name], (err, result) => {
        if (err) {

            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {
            console.log('This student already exist');
            return res.json({ createStatus: false, Error: 'This student already exist' })
        } else {
            let date = new Date();
            const yaer = moment(date).format('YY');
            const regdate = moment(date).format('DD/MM/YYYY');
            let st_numb
            let dep
            var sql = 'SELECT * FROM specialities where codesp=?'
            connection.query(sql, [req.body.spec], (err, result) => {
                if (err) { return res.json({ Status: false, Error: 'connection error' }) };
                dep = result[0].codep

                var sql = 'SELECT COUNT(mat) AS st_numb FROM royalstudent'
                connection.query(sql, (err, result) => {
                    if (err) { return res.json({ Status: false, Error: 'connection error' }) };
                    if (req.body.pass != req.body.cpass) {
                        return res.json({ Status: false, Error: 'Password doesn\'t match' })
                    } else {
                        bcrypt.hash(req.body.pass.toString(), 13, (err, hash) => {
                            if (err) {

                                return res.json({ Status: false, Error: 'Error hashing' })
                            }
                            st_numb = result[0].st_numb
                            st_numb++
                            const mat = 'NH-0' + st_numb + req.body.spec + yaer
                            const com = "INSERT INTO royalstudent (mat,name,email,phone,spec,dep,level,birth,place,sex,pic,pass,regdate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
                            connection.query(com, [mat, req.body.name, req.body.email, req.body.phone, req.body.spec, dep, req.body.level, req.body.birth, req.body.place, req.body.sex, req.file.filename, hash, regdate], (err, result) => {
                                if (err) {

                                    return res.json({ createStatus: false, Error: 'Error' })
                                }
                                else {
                                    console.log('student created successfully ' + mat);
                                    return res.json({ createStatus: true, Matricule: mat })
                                }
                            });
                            let tab1 = req.body.spec + "CA"
                            let tab = req.body.spec + "EXAM"
                            const setca = "INSERT INTO " + tab1 + " (mat1,name,level) VALUES (?,?,?)";
                            connection.query(setca, [mat, req.body.name, req.body.level], (err, result) => {
                                if (err) {
                                    return res.json({ Error: 'Error' })

                                }
                            });
                            const setex = "INSERT INTO " + tab + " (mat1,name,level) VALUES (?,?,?)";
                            connection.query(setex, [mat, req.body.name, req.body.level], (err, result) => {
                                if (err) {
                                    return res.json({ Error: 'Error' })

                                }
                            });
                            const solv = "INSERT INTO solvability (mat,name,level,codesp) VALUES (?,?,?,?)";
                            connection.query(solv, [mat, req.body.name, req.body.level, req.body.spec], (err, result) => {
                                if (err) {

                                    return res.json({ createStatus: false, Error: 'Error' })
                                }
                            });

                        })
                    }

                });
            });
        }
    });
});

//getting a single student
router.get('/student/:mat', (req, res) => {


    const com = "select * from royalstudent where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})

//counting students
router.get('/countstudent', (req, res) => {
    const com = "select COUNT(mat) as student from royalstudent";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ Status: false, Error: 'Error' })
        }
        else {
            return res.json({ Status: true, Result: result })
        }
    })

})


//deleting a single student
router.delete('/deletestudent/:mat', (req, res) => {

    const com = "delete from royalstudent where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {

            return res.json({ deleteStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ deleteStatus: true, Result: result })
        }
    })

})

//getting studentlist
router.get('/studentlist', (req, res) => {

    const com = "select * from royalstudent";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})
//getting number
router.get('/number', (req, res) => {
    const com = "select * from nom";
    connection.query(com, (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})
router.put('/uprec', (req, res) => {
    const value = req.body.valeur;


    // Update the record in the database
    const query = `UPDATE nom SET rec= ?`;
    connection.query(query, [value], (error, result) => {
        if (error) {

            return res.status(500).json({ error: 'Failed to update record' });
        } else {

            return res.status(200).json({ success: true, result: result });
        }
    });
});
router.put('/uptrans', (req, res) => {
    const value = req.body.valeur;

    // Update the record in the database
    const query = `UPDATE nom SET trans= ?`;
    connection.query(query, [value], (error, result) => {
        if (error) {

            return res.status(500).json({ error: 'Failed to update record' });
        } else {

            return res.status(200).json({ success: true, result: result });
        }
    });
});

//getting studentlist
router.get('/studentsort/:data', (req, res) => {

    const com = "select * from royalstudent where spec=? and level=?";
    connection.query(com, [req.query.spec, req.query.level], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {
            return res.json({ readingStatus: true, Result: result })
        }
    })

})

//getting solvability
router.get('/solvability/:data', (req, res) => {

    const com = "select * from solvability where mat=?";
    connection.query(com, [req.query.mat], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {
            return res.json({ readingStatus: true, Result: result })
        }
    })

})
//getting feesboard
router.get('/feesboard/:data', (req, res) => {

    const com = "select * from solvability where codesp=? and level=?";
    connection.query(com, [req.query.codesp, req.query.level], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {
            if (result.length > 0) {
                return res.json({ readingStatus: true, Result: result })
            } else {

                return res.json({ readingStatus: false, Result: 'No reccords' })
            }

        }
    })

})
//getting payement
router.get('/payement/:data', (req, res) => {

    const com = "select * from payement where month=?";
    connection.query(com, [req.query.month], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {
            return res.json({ readingStatus: true, Result: result })
        }
    })

})
//getting attendancelist
router.get('/attendance/:data', (req, res) => {

    const com = "select * from attendance where codesp=? and month=?";
    connection.query(com, [req.query.spec, req.query.month], (err, result) => {
        if (err) {

            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {
            return res.json({ readingStatus: true, Result: result })
        }
    })

})



export { router as userrouter }
