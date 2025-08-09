const agentes = [
{
  "id": "401bccf5-cf9e-489d-8412-446cd169a0f1",
  "nome": "Rommel Carneiro",
  "dataDeIncorporacao": "1992/10/04",
  "cargo": "delegado"

},
  {
    "id": "a2b3c4d5-e6f7-8901-2345-67890abcdef0",
    "nome": "Mariana Santos",
    "dataDeIncorporacao": "2015/07/20",
    "cargo": "investigador"
  },
  {
    "id": "b3c4d5e6-f7a8-9012-3456-7890abcdef12",
    "nome": "Pedro Almeida",
    "dataDeIncorporacao": "2008/03/10",
    "cargo": "escrivão"
  }
];

function findAll(){
  return agentes;
}
function findById(id) {
  const agente = agentes.find(a => a.id === id);
  return agente;
}

function criarAgente(agente){
  agentes.push(agente);
}

function updateAgente(id, dadosAtualizados) {
  const index = agentes.findIndex(a => a.id === id);
  if (index !== -1) {
    agentes[index] = { ...agentes[index], ...dadosAtualizados };
    return agentes[index];
  }
  return null;
}

function deleteAgente(id)
{
  const index = agentes.findIndex(a => a.id === id );
  if (index !== -1) {
    agentes.splice(index, 1);
    return true;
  }
  return false;
}




module.exports  = {
  findAll,
  findById,
  criarAgente,
  updateAgente,
  deleteAgente
}