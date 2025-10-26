import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import userRouter from "./routes/userRouter.js";
import bookRouter from "./routes/bookRouter.js";
import path from "path";
import userModel from "./models/userModel.js";
import bookModel from "./models/bookModel.js";
import favoriteModel from "./models/favoriteModel.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// // configurer la session
app.use(session({
    secret: 'express-ejs',
    resave: false,
    saveUninitialized: false

}))



// servir les fichiers statiques depuis le dossier "public"
app.use(express.static('public'))

// app.use((req, res, next) => {
//   res.locals.user = req.session.user || null;
//   next();
// });


// // Mapping entre routes et le routeur

app.use('/', bookRouter);
app.use('/', userRouter);

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));


app.get(['/access'], (req, res) => {
    res.render('access')
})
app.get(['/account'], (req, res) => {
    res.render('account')
})

app.get(['/favorites'], async (req, res) => {
    res.render('favorites')
})




// Configuration du moteur de template
app.set('view engine', 'ejs')

// modifier le delimiter
// app.set('view options', { delimiter: '?' })


// Basit test endpoint
app.get("/", (req, res) => {
  res.send("Ayemnet API working 🚀");
});


app.all("/*splat", (req, res) => {
    res
        .status(404)
        .end("Page introuvable")
})

userModel.createUserTable();
bookModel.createBookTable();
favoriteModel.createFavoriteBookTable();
// Sunucu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
