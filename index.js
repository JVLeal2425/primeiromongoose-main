import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';

const app = express();
const PORT = 3001;



// Configura o EJS como motor de views
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// pasta onde ficam os arquivos .ejs
app.set("views", "./views");
//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
  res.render("index");
});

// Rotas do Gênero
app.get("/genero", async (req, res) => {
  const generos = await Genero.find()
  res.render("genero/lst", { generos });
});

app.get("/genero/add", (req, res) => {
  res.render("genero/add");
});

app.post("/genero/add", async (req, res) => {
  const nome = req.body.gnome

  // grava no banco de dados
  await Genero.create({ nome })

  res.render("genero/addok", { nome });
});

app.get("/genero/addok", (req, res) => {
  res.render("genero/addok");
});


// Rotas da Música
app.get("/musica", async (req, res) => {
  const musicas = await Musica.find()
  res.render("musica/lstm", { musicas });
});

//Excluir
app.get('/musica/del/:id', async (req, res) => {

  const musica = await Musica.findByIdAndDelete(req.params.id)

  res.redirect("/musica")

})

app.get("/musica/addm", (req, res) => {
  res.render("musica/addm");
});

app.post("/musica/addm", async (req, res) => {
  const nome = req.body.mnome
  const duracao = req.body.dur
  const artista = req.body.art
  const anolancamento = req.body.al

  await Musica.create({ nome, duracao, artista, anolancamento })

  res.render("musica/addokm", { nome, duracao, artista, anolancamento });
});

// Rotas do Artista
app.get("/artista", async (req, res) => {
  const artistas = await Artista.find()
  res.render("artista/lsta", { artistas });
});


app.listen(PORT, () => {
  console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});

