const express = require ("express");
const app = express();
const path = require ("path");
const port = 3030;

app.get("/",(req, res)=> res.sendFile(path.join(__dirname,"views","home.html")))
app.use(express.static("public"))

app.listen(port, ()=> console.log("servidor corriendo en http://localhost:3030"))
