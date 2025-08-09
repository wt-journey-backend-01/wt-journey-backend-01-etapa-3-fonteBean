const casosRepository = require("../repositories/casosRepository.js")
const agentesRepository = require("../repositories/agentesRepository.js")
const errorResponse = require("../utils/errorHandler.js")
const {v4 : uuid} = require("uuid");


function getCasos(req,res){
  const casos = casosRepository.findAll();
  const agente_id = req.query.agente_id
  const status = req.query.status
  if(status){
    if( status != "aberto" && status != "solucionado")
    {
      return  errorResponse(res,400,"Status nao permitido ")
    }
    const casosStatus = casos.filter(c=> c.status == status)
    if(casosStatus.length == 0){
     return errorResponse(res,404,`Casos com status ${status} nao encotrados`)
    }
    return res.status(200).json(casosStatus)
  }

  if(agente_id){
    const casosAgente  = casos.filter(c => c.agente_id === agente_id)
    if(casosAgente.length === 0){
      return errorResponse(res,404,`Casos do agente ${agente_id}, nao encontrados`)
    }
    return res.status(200).json(casosAgente)
  }

  res.status(200).json(casos)
}

function getCaso(req,res){
  const casoId = req.params.id;
  const caso = casosRepository.findById(casoId);
  if(!caso){
   return  errorResponse(res,404,"caso nao encontrado")
  }
  res.status(200).json(caso)
}

function getAgentebyCaso(req,res){
  const casoId = req.params.id;
  const caso = casosRepository.findById(casoId);
  if(!caso){
   return  errorResponse(res,404,"caso nao encontrado")
  }
  const agente = agentesRepository.findById(caso.agente_id)
  if(!agente){
   return errorResponse(res,404,"Agente nao encontrado")
  }
  res.status(200).json(agente)
}

function searchEmCaso(req,res){
  const busca = req.query.q ? req.query.q.toLowerCase() : ""
  if(!busca){
    return errorResponse(res,404,"Parametro de busca nao encontrado")
  }
 
  const casosFiltrados = casosRepository.buscaPalavraEmCaso(busca)
  if(casosFiltrados.length === 0){
   return errorResponse(res,404,`Casos com a palavra ${busca} nao encotrados`)
  }
  res.status(200).json(casosFiltrados);
}

function createCaso(req,res){
  const {titulo ,descricao ,status, agente_id} = req.body;
  if(!titulo || !descricao ||  !status || !agente_id){
   return errorResponse(res,400,"Titulo, descricao, status e agente obrigatorios")
  }

  if( status != "aberto" && status != "solucionado")
    {
   return  errorResponse(res,400,"Status nao permitido ")
    }
  const agente = agentesRepository.findById(agente_id);
  if (!agente) {
    return errorResponse(res,404,"Agente não encontrado para o agente_id fornecido");
  }
    const novoCaso = {
      id: uuid(),
      titulo,
      descricao,
      status,
      agente_id
    }
    casosRepository.criarCaso(novoCaso)
   res.status(201).json(novoCaso) 
}

function deleteCaso(req,res){
    const casoId = req.params.id;
   const sucesso = casosRepository.deleteCaso(casoId);
   if(!sucesso){
    return errorResponse(res,404,`Erro ao deletar caso ${casoId}`)
   }
  res.status(204).send();
}
function updateCaso(req, res) {
  const casoId = req.params.id;
  const { titulo, descricao, status, agente_id } = req.body;
  if ('id' in req.body) {
  return errorResponse(res,400,"Não é permitido alterar o ID do caso.");
}

  if (!titulo || !descricao || !status || !agente_id) {
    return errorResponse(res,400,"Todos os campos são obrigatórios para atualização completa.");
  }

  const caso = casosRepository.findById(casoId);
  if (!caso) {
    return errorResponse(res,404,"caso não encontrado.");
  }
 
    if( status != "aberto" && status != "solucionado")
    {
     return  errorResponse(res,400,"Status nao permitido ")
    }
    caso.status = status
  
  const agente = agentesRepository.findById(agente_id);
  if (!agente) {
    return errorResponse(res,404,"Agente não encontrado para o agente_id fornecido");
  }

  caso.titulo = titulo;
  caso.descricao = descricao;
  caso.status = status;
  caso.agente_id = agente_id;

  res.status(200).json(caso);
}

function patchCaso(req, res) {
  const casoId = req.params.id;
  const { titulo, descricao, status, agente_id } = req.body;

  const caso = casosRepository.findById(casoId);
  if (!caso) {
    return errorResponse(res,404,"Caso não encontrado.");
  }

  if (titulo !== undefined) { 
    caso.titulo = titulo;
  }
  if (descricao !== undefined) {
    caso.descricao = descricao;
  }
  if (status !== undefined) {
    if( status != "aberto" && status != "solucionado")
    {
     return  errorResponse(res,400,"Status nao permitido ")
    }
    caso.status = status
  }
  
  if (agente_id !== undefined) {
    const agente = agentesRepository.findById(agente_id);
    if (!agente) {
      return errorResponse(res,404,"Agente não encontrado para o agente_id fornecido.");
    }
    caso.agente_id = agente_id;
  }


  res.status(200).json(caso);
}

module.exports = {
  getCaso,
  getCasos,
  getAgentebyCaso,
  createCaso,
  deleteCaso,
  updateCaso,
  patchCaso,
  searchEmCaso,
};
