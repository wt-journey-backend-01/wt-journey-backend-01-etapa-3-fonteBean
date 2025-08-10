const db = require("../db/db")

async function findAll(){
  try{
    const query = await db("casos").select("*");
    if(!query){
      return false
    }
    return query
  }catch(err){
    console.log(err);
    return false;
  }
}
async function findById(id) {
  try {
    const query = await db("casos").where({id:id}).first();
    if(!query){
      return false;
    }
    return query
  }catch (err) {
    console.log(err);
    return false
  }
}

async function criarCaso(caso){
  try{
    const query = await db("casos").insert(caso, ["*"]);
    if(!query){
      return false
    }
    return caso
  }catch(err){
    console.log(err);
    return false
  }
}

async function deleteCaso(id){
  try{
    const query = await db("casos").where({id:id}).del();
    if(!query){
      return false;
    }
    return true
  }catch(err){
    console.log(err);
    return false;
  }
  
}

async function buscaPalavraEmCaso(palavraChave) {
  const palavraChaveFormatada = `%${palavraChave.toLowerCase()}%`;

  const casosFiltrados = await db('casos')
    .whereRaw('LOWER(titulo) LIKE ?', [palavraChaveFormatada])
    .orWhereRaw('LOWER(descricao) LIKE ?', [palavraChaveFormatada])
    .select('*');

  return casosFiltrados;
}


module.exports  = {
  findAll,
  findById,
  criarCaso,
  deleteCaso,
  buscaPalavraEmCaso
}
