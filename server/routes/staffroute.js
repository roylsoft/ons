import express, { Router } from "express";
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
const upload = multer({
    storage: storage
})
//end handle images


//verify the key
router.post('/verifkey', (req, res) => {
    const com = "select * from cle where cle=?";
    connection.query(com, [req.body.key], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ Error: 'Error' })
        }
        if (result.length > 0) {
            console.log('Key success');
            return res.json({ loginStatus: true })
        } else {
            console.log('Wrong key ! contact an admin');
            return res.json({ Error: 'Wrong key ! contact an admin' })
        }
    })
})
router.post('/logintostaff', (req, res) => {
    console.log(req.body)
    const com = "select * from staff where mat=?";
    connection.query(com, [req.body.matricule], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ loginStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password.toString(), result[0].pass, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.json({ loginStatus: false, Error: 'Password compare Error' })
                }
                if (hash) {
                    const matricule = req.body.matricule
                    console.log(matricule);
                    const token = jwt.sign({
                        role: "staff",
                        matricule: req.body.matricule
                    },
                        "jwt_secretmysecret_key",
                        { expiresIn: '1d' }
                    )
                    res.cookie('token', token)
                    console.log('login succesfully');
                    return res.json({ loginStatus: true, mat: result[0].mat })
                } else {
                    console.log('Wrong password or matricule');
                    return res.json({ loginStatus: false, Error: 'Wrong matricule or password' })
                }


            })
        } else {
            console.log('Wrong password or matricule');
            return res.json({ loginStatus: false, Error: 'Wrong matricule or password' })
        }
    })

})

//logout
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})


//create staff
router.post('/addstaff', upload.single('pic'), (req, res) => {
    const com = "select * from staff where mat=?";
   
    connection.query(com, [req.body.mat], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ createStatus: false, Error: 'Error' })
        }
        if (result.length > 0) {
            console.log('This member already exist');
            return res.json({ createStatus: false, Error: 'This member already exist' })
        } else {
            let date = new Date();
            const yaer = moment(date).format('YY');
            let st_numb
            var sql = 'SELECT COUNT(mat) AS st_numb FROM staff'
            connection.query(sql, (err, result) => {
                if (err) throw err;
                if (req.body.pass != req.body.cpass) {
                    return res.json({ Status: false, Error: 'Password doesn\'t match' })
                } else {
                    bcrypt.hash(req.body.pass.toString(), 13, (err, hash) => {
                        if (err) {
                            console.log(err);
                            return res.json({ Status: false, Error: 'Error hashing' })
                        }
                        st_numb = result[0].st_numb
                        st_numb++
                        let birth = moment(req.body.birth).format("YYYY-MM-DD")
                        const mat = 'NHIEPS-0' + st_numb + yaer
                        const com = "INSERT INTO staff (mat,name,email,phone,grade,birth,place,sex,idcard,pic,pass) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                        connection.query(com, [mat, req.body.name, req.body.email, req.body.phone, req.body.grade, birth, req.body.place, req.body.sex, req.body.idcard, req.file.filename, hash], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.json({ createStatus: false, Error: 'Error' })
                            }
                            else {
                                console.log('staff created successfully ' + mat);
                                return res.json({ createStatus: true, Matricule: 'Your unique ID is:' + mat })
                            }
                        });
                        const pay = "INSERT INTO payement (lecturer,name,phone) VALUES (?,?,?)";
                        connection.query(pay, [mat, req.body.name, req.body.phone], (err, result) => {
                            if (err) {
                                console.log(err);
                                return res.json({ createStatus: false, Error: 'Error' })
                            }
                            else {
                                console.log('payement created successfully ' + mat);
                                return res.json({ createStatus: true, Matricule: 'payement created successfully:' + mat })
                            }
                        });

                    })
                }

            });
        }
    });
});

//getting a single staff
router.get('/staff/:mat', (req, res) => {

    const com = "select * from staff where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {

            return res.json({ readingStatus: true, Result: result })
        }
    })

})

//counting staff
router.get('/countstaff', (req, res) => {
    const com = "select COUNT(mat) as staff from staff";
    connection.query(com, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ Status: false, Error: 'Error' })
        }
        else {
            return res.json({ Status: true, Result: result })
        }
    })

})

//deleting a single staff
router.delete('/deletestaff/:mat', (req, res) => {

    const com = "delete from staff where mat=?";
    connection.query(com, [req.params.mat], (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ deleteStatus: false, Error: 'Error' })
        }
        else {
            console.log("member deleted successfully !");
            return res.json({ deleteStatus: true, Result: result })
        }
    })

})

//getting staff
router.get('/staff', (req, res) => {
    const com = "select * from staff";
    connection.query(com, (err, result) => {
        if (err) {
            console.log(err);
            return res.json({ readingStatus: false, Error: 'Error' })
        }
        else {
            console.log(result);
            return res.json({ readingStatus: true, Result: result })
        }
    })

})

export { router as staffrouter }