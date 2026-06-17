import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';
import Artista from "./models/Artista.js";

const app = express();
const PORT = 3001;



// Configura o EJS como motor de views sei la
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

//Edição

app.get('/genero/edt/:id', async (req, res) => {

  const genero = await Genero.findById(req.params.id)

  res.render("genero/edt", { genero })

})

app.get('/genero/del/:id', async (req, res) => {

  const genero = await Genero.findByIdAndDelete(req.params.id)

  res.redirect("/genero")

});

app.post('/genero/edt/:id', async (req, res) => {

  const generos = await Genero.findByIdAndUpdate(req.params.id, req.body)

  res.render("genero/edtok")

});

app.get("/genero/edtok", (req, res) => {
  res.render("genero/edtok");
});

//Pesquisa
app.post('/genero', async (req, res) => {
  const { pesquisar } = req.body;
  const generos = await Genero.find({
    nome: new RegExp(pesquisar, 'i')
  });
  res.render("genero/lst", { generos });
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

app.get('/musica/edtm/:id', async (req, res) => {

  const musica = await Musica.findById(req.params.id)

  res.render("musica/edtm", { musica })

});

app.post('/musica/edtm/:id', async (req, res) => {

  const musica = await Musica.findByIdAndUpdate(req.params.id, req.body)

  res.render("musica/edtokm")

});

app.get("/musica/edtokm", (req, res) => {
  res.render("musica/edtokm");
});


// Rotas do Artista
app.get("/artista", async (req, res) => {
  const artista = await Artista.find()
  res.render("artista/lsta", { artista });
});

app.get("/artista/adda", (req, res) => {
  res.render("artista/adda");
});

app.post("/artista/adda", async (req, res) => {
  const nome = req.body.anome
  const pais = req.body.pais
  const anoinicio = req.body.ai

  await Artista.create({ nome, pais, anoinicio })

  res.render("artista/addoka", { nome, pais, anoinicio });
});

app.get('/artista/del/:id', async (req, res) => {

  const artista = await Artista.findByIdAndDelete(req.params.id)

  res.redirect("/artista")

});

app.get('/artista/edta/:id', async (req, res) => {

  const artista = await Artista.findById(req.params.id)

  res.render("artista/edta", { artista })

});

app.post('/artista/edta/:id', async (req, res) => {

  const artista = await Artista.findByIdAndUpdate(req.params.id, req.body)

  res.render("artista/edtoka")

});

app.get("/artista/edtoka", (req, res) => {
  res.render("arrtista/edtoka");
});


app.listen(PORT, () => {
  console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});