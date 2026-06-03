import mongoose from "mongoose";

const url = "mongodb+srv://aluno:123@primeiromongo.emrkyec.mongodb.net/?appName=PrimeiroMongo"

const conexao = await mongoose.connect(url)

export default conexao