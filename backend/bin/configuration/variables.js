const variables = {
  Database:{
    connection:process.env.connection || 'mongodb://gumiranda:Aranha22!@ds135486.mlab.com:35486/mecanicuber'
  },
  Security:{
    secretKey:'yoursecrethashkeyforsecurityjwt'
  }
}

module.exports = variables;