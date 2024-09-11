//app.cjs
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const winston = require("winston");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const { adminrouter } = require("./routes/adminroute.cjs");
const connection = require("./utils/db.cjs");
const app = express();
// Connexion à la base de données


// Journalisation
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

// Middleware de journalisation des requêtes
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

// Middleware CORS
app.use(
  cors({
    origin: ["http://localhost:3001","http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("public/image"));

// Vérification de l'utilisateur
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        logger.error("Erreur de vérification du jeton JWT :", err);
        return res.status(401).json({ Status: false, Error: "Jeton invalide" });
      }
      req.mat = decoded.matricule;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.status(401).json({ Status: false, Error: "Non authentifié" });
  }
};

app.use("/auth", adminrouter);
app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, mat: req.mat });
});

app.use((err, req, res, next) => {
  logger.error("Erreur interne :", err);
  return res.status(500).json({ Status: false, Error: "Erreur interne du serveur" });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  logger.info(`Le serveur est en cours d'exécution sur le port ${port}`);
});
