const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient 
const cors = require('cors')


const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

// const uri = 'mongodb://localhost:27017/exampleDb'
const uri  = 'mongodb://doc:umdoistres456@ds241133.mlab.com:41133/givemymed'

let port = process.env.PORT || 3030

MongoClient.connect(uri, (err, client) => {
  if(!err){
    console.log('we are connected')

    db = client.db('givemymed')

    app.listen(port, () => {
      console.log('listening on port '+port)
    })
  }
})

app.get('/', (req, res) => {

  res.json({message:'hello'})
})

app.post('/interacoes', (req, res) => {
  let interacoes = req.body

  let query = []

  interacoes.map( (arr, index, myArr) => {
    arr.map(element => {
    for(var i = index + 1; i < myArr.length; i++){
    myArr[i].map( element2 => {
      query.push({"Farmaco1": element, "Farmaco2": element2})
    })
    }
  })
  })

  db.collection('interacoes').find({ $or: query}).toArray((err, results) => {
    if(err) return console.log(err)

    res.json(results)
  })
  
})

app.get('/medicos', (req,res) => {
  db.collection('medicos').find().toArray((err, results) => {
    if(err) return console.log(err)

    res.json(results)
  })
})

app.post('/medicos', (req ,res) => {
  let id = parseInt(req.body.id)
  let query
  if(id) {
    query = {"id": id}
  }

  let nome = req.body.nome
  if(nome) {
    let nomes = nome.split(' ')
    let newNomes = []
    nomes.map(nome => newNomes.push(nome.replace(nome.charAt(0), nome.charAt(0).toUpperCase())))
    nome = newNomes.join(' ')
    query = {...query, "nome": nome}
  }

  db.collection('medicos').find(query).toArray((err, results) => {
    if(err) return console.log(err)

    res.json(results)
  })
})

app.post('/addmedico', (req, res) => {
  let body = req.body
  let nome = body.nome.toLowerCase()
  let nomes = nome.split(' ')
  let newNomes = []
  nomes.map(nome => newNomes.push(nome.replace(nome.charAt(0), nome.charAt(0).toUpperCase())))
  nome = newNomes.join(' ')

  let status = db.collection('medicos').stats((err, status) => {
    if(err) return console.log(err)

    console.log(status.count)
    let count = ++status.count
    
    let medico = {
      nome,
      id: count,
      pacientes: []
    }
    
    db.collection('medicos').insertOne(medico, (err, results) => {
      if(err) return console.log(err)
    
      console.log('saved to database')
    })
  
      res.sendStatus(200)
  })
  
})

app.post('/addmedicamento', (req, res) => {
  let medicoId = parseInt(req.body.medicoId)
  let pacienteId = req.body.pacienteId

  let medicamento = req.body.medicamento
  
db.collection('medicos').findOne({id: medicoId}, (err, results) => {
  let medico = results

  let paciente = medico.pacientes.map( paciente => paciente.id ).indexOf(pacienteId)

  medico.pacientes[paciente].medicamentos.push(medicamento)

  db.collection('medicos').updateOne({id: medicoId}, { $set: { pacientes: medico.pacientes }}, { upsert: true})
    .catch( err => console.log(err))  
    .then( () => res.sendStatus(201))

})

})

app.post('/medicamentos/', (req, res) => {
  let id = parseInt(req.body.id)
  let query
  if(id) {
    query = {"IdMedicamento": id}
  }
  let nome = req.body.nome
  if(nome){
    nome = nome.toUpperCase()
    query = {...query, "Nome": { $regex: '^'+nome}}
  }

  db.collection('medicamentos').find(query).toArray((err, results) => {
    // console.log(results)
    res.json(results)
  })
})

app.get('/pacientes/:id', (req, res) => {
  let id = parseInt(req.params.id)
  
  db.collection('pacientes').find({medicoId: id}).toArray((err, results) => {
    if(err){
      console.log(err)
      res.sendStatus(500)
    }
    res.json(results)
  })
})

app.post('/addpaciente', (req, res) => {
  let id = parseInt(req.body.medicoId)

  console.log(req.body)

  db.collection('medicos').updateOne({id}, {$push: { pacientes: req.body.paciente }}, (err, results) => {
    if(err){
      console.log(err)
      res.sendStatus(500)
    }
    res.sendStatus(201)
  })
  
})
