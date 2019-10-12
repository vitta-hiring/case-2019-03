import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      medicos: [],
      medico: null,
      consultas: [],
      consultasMedico: [],
      medicamento: []
    }
}

componentWillMount() {
  let arrayMedicos = JSON.parse(localStorage.getItem("Medicos"))
  if (arrayMedicos) {
    this.setState({ medicos: arrayMedicos })
  } else {
    const tbMedicos = ["Raul","Beatriz","Polyana","Hugo","Tancredo","Rogério"]
    localStorage.setItem("Medicos", JSON.stringify(tbMedicos))
    arrayMedicos = JSON.parse(localStorage.getItem("Medicos"))
    this.setState({ medicos: arrayMedicos })
  }
}

selectMedico = (e) => {
  this.setState({medico: e.target.value})
  const arrayConsultas = JSON.parse(localStorage.getItem("Consultas"))
  this.setState ({ consultas: arrayConsultas })
  const medico = e.target.value
  let pesquisaMedico = null
  
 if (arrayConsultas) {
      pesquisaMedico = arrayConsultas.filter((item,i) => {
      return item.medico === medico
    })
    this.setState ({ consultasMedico: pesquisaMedico })
  }
}

render() {
  let newMedico = (this.state.medico)
    const inputMedicos = this.state.medicos.map((item, i) => {
        return <option key={i} value={item}>{item}</option>
    })

    let resPesquisa = null
    if (this.state.consultasMedico.length > 0) {
      resPesquisa = this.state.consultasMedico.map((item, i) => {
        return (
            <div key={i} className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-header">
              <b>Paciente:</b> {this.state.consultasMedico[i].paciente}
            </div>
            <div className="card-body">
              <p><b>Medicamentos: </b>{this.state.consultasMedico[i].medicamento}</p>
              <p><b>Posologia: </b>{this.state.consultasMedico[i].posologia}</p>
              <p><b>Via de Administração: </b>{this.state.consultasMedico[i].via}</p>
              <p><b>Data da Consulta: </b>{this.state.consultasMedico[i].data}</p>
            </div>
          </div>
        ) 
      })
    }

    return (
      <div>
        <Header />
        <div className="container-fluid">
          <select name="" className="form-control form-control-lg" onChange={this.selectMedico} id="medicos">
            <option value="">selecione o médico</option>
            {inputMedicos}
          </select>
          <div>
            {this.state.medico &&
              <div className="mt-2">
              <Link to={'/addprescricao/'+ newMedico}>
                <button type="button" className="btn btn-secondary btn-lg">Nova Prescricao</button>
              </Link>
              <h4 className="pt-4">Médico:&nbsp;{this.state.medico}</h4>
              {resPesquisa || <p>Não existem consultas para este médico</p>}
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}
