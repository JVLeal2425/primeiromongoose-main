import conexao from "../config/conexao.js";

const ArtistaSchema = new conexao.Schema({
    nome: String,
    pais: String,
    anoinicio: Number,
});

const Artista = conexao.model("Artista", ArtistaSchema);

export default Artista;