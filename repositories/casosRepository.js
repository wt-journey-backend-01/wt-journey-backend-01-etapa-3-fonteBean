const casos = [
{
    "id": "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    "titulo": "homicidio",
    "descricao": "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    "status": "aberto",
    "agente_id": "401bccf5-cf9e-489d-8412-446cd169a0f1" 

}
];

function findAll(){
  return casos;
}
function findById(id) {
  const caso = casos.find(a => a.id === id);
  return caso;
}

function criarCaso(caso){
  casos.push(caso);
}

function deleteCaso(id){
   const index = casos.findIndex(c => c.id === id );
  if (index !== -1) {
    casos.splice(index, 1);
    return true;
  }
  return false;
}

function buscaPalavraEmCaso(palavraChave){
     const casosFiltrados = casos.filter(caso => {
        const titulo = caso.titulo ? caso.titulo.toLowerCase() : '';
        const descricao = caso.descricao ? caso.descricao.toLowerCase() : '';

        return titulo.includes(palavraChave) || descricao.includes(palavraChave);
    });
    return casosFiltrados
}


module.exports  = {
  findAll,
  findById,
  criarCaso,
  deleteCaso,
  buscaPalavraEmCaso
}
