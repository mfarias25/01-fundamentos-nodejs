import http from 'node:http'
import { url } from 'node:inspector'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'
// UUID =>Unique Universal ID

//importando http de dentro do node interno ae projeto  = node: 

//Criar usuario (nome, email, senha) resquest = pedindo infos do BD, 
// response = devolvendo as infos para quem requisitou.  

//Requisicao HTTP: 1- Metodo HTTP, 2 - URL.
// {} = OBJETO
//O método push() adiciona um ou mais elementos ao final de um array e retorna o novo comprimento desse array.
//JSON - JavaScript Object Notation

//Cabecalhos (Requisicao/resposta) => Metadados(info tanto back quando front, saiba lidar com aquela requisicao daquela forma )

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

//http://localhost:3333/users?userId=1&name=Diego

// GET http://localhost:3333/users/1
// DELETE http: //localhost:3333/users/1

// POST http://localhost:3333/users

// Edição e remoção


const server = http.createServer (async(req, res) => {
  const {method, url} = req

  await json(req,res)

  const route = routes.find(route =>{
    return route.method == method && route.path.test(url)
  })
  if(route) {
    const routeParams = req.url.match(route.path)

    const {query, ...params} = routeParams.groups

    req.params = params
    req.query =query ? extractQueryParams(query): {}
    

    return route.handler(req, res)
  }
  
  return res.writeHead(404).end('NOT FOUND') 
})
server.listen(3333)
