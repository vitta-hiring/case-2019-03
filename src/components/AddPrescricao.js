import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import medicamentos from '../../dados/medicamentos.json'
import interacao from '../../dados/interacao_medicamentosa.json'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

export default class AddPrescricao extends Component {
    constructor() {
        super();
        this.state = {
            medico: null,
            pacientes: [],
            paciente: null,
            medicamento: [],
            inputMedicamento: [],
            posologia: null,
            via: null,
            date: [],
            consultas: {},
            save: false,
            resultado:[],
            farmacos:[],
            resInteracao: [],
            btnvisible: false,
            interacaovisible: false,
            modal: false,
            showInteracoes: false,
            verInteracoes: []
      }
    }

componentWillMount() {
    const arrayConsultas = JSON.parse(localStorage.getItem("Consultas"))
    if (arrayConsultas) {
        this.setState ({ consultas: arrayConsultas })
    }

    let arrayPacientes = JSON.parse(localStorage.getItem("Pacientes"))
    if (arrayPacientes) {
        this.setState({
            pacientes: arrayPacientes,
            medico: this.props.match.params.medico
        })
    } else {
        const tbPacientes = ["Roberto da Silva","Maria Rodrigues","Márcio Ribeiro","Luciano Franco","José Figueiredo"]
        localStorage.setItem("Pacientes", JSON.stringify(tbPacientes))
        arrayPacientes = JSON.parse(localStorage.getItem("Pacientes"))
        this.setState({
            pacientes: arrayPacientes,
            medico: this.props.match.params.medico
        })
    }
}

componentDidUpdate() {
    if (this.state.save) {
        localStorage.setItem("Consultas", JSON.stringify(this.state.consultas))
        this.setState ({ save: false })
        //ALTERADO
        this.setState  ({ interacaovisible: false })
        this.setState ({ showInteracoes: false })
    }
    
}

selectPaciente = (e) => {
    this.setState({paciente: e.target.value})
}
addMedicamento = (e) => {
        this.setState ({ btnvisible: true })
        let auxMedicamento = e.target.value
        this.setState({inputMedicamento: auxMedicamento.toUpperCase()})
        {if(e.target.value === '') {this.setState ({ btnvisible: false })}}
    }

addCampo = () => {

    this.setState ({ medicamento: [...this.state.medicamento, this.state.inputMedicamento + " "] })
    let medicamento = (this.state.inputMedicamento).toUpperCase()
    const resultado = medicamentos.filter((med) => {
        return med.Nome === medicamento
    })
   const farmacos = resultado.map((farm, i) => {
       if (farm.Farmacos[i] != undefined) {
            return farm.Farmacos[i]
       }
    })
    
    let resInteracao = []
    for (let i=0;i < farmacos.length;i++){
        resInteracao = interacao.filter((res => {
            return (res.Farmaco1 === farmacos[i]) || (res.Farmaco2 === farmacos[i])
        }))
    }

    this.setState ({ resultado, farmacos, resInteracao })
    this.refs.medicamento.value = ''
    this.setState ({ btnvisible: false })

    if (resInteracao.length !== 0) {
        this.setState ({ interacaovisible: true })
        this.setState ({ showInteracoes: true }) // ALTERADO
    }
}

addPosologia = (e) => {
    this.setState ({ posologia: e.target.value })
}
addVia = (e) => {
    this.setState ({ via: e.target.value })
}
onChange = (e) => {
    this.setState({ date: e.target.value });
}

enviarForm = (e) => {
    e.preventDefault()
    if (!this.refs.paciente.value) {
        alert('selecione o paciente')
        return false
    }
    if (this.state.medicamento.length === 0) {
        alert('informe o medicamento')
        return false
    }

    let data = (this.state.date).toString()
    
    let tbConsulta = new Object();
    tbConsulta.medico = (this.state.medico)
    tbConsulta.paciente = (this.state.paciente)
    tbConsulta.medicamento = (this.state.medicamento)
    tbConsulta.posologia = (this.state.posologia)
    tbConsulta.via = (this.state.via)
    tbConsulta.posologia = (this.state.posologia)
    tbConsulta.resultado = (this.state.resultado)
    tbConsulta.farmacos = (this.state.farmacos)
    tbConsulta.resInteracao = (this.state.resInteracao)
    tbConsulta.data = data

    this.setState ({ consultas: [... this.state.consultas, tbConsulta] })
    this.setState ({ save: true })

    //LIMPAR CAMPOS DO FORMULÁRIO
    this.refs.paciente.value = ''
    this.refs.medicamento.value = ''
    this.refs.posologia.value = ''
    this.refs.via.value = ''
    this.setState ({ inputMedicamento: [] }) 
    this.setState ({ medicamento: [] }) 
    this.setState ({ btnvisible: false })
    this.setState ({ verInteracoes: [] })
    this.setState ({ showInteracoes: false })
    this.setState ({ interacaoVisible: false })
}

limpaForm = () => {
    this.refs.paciente.value = ''
    this.refs.medicamento.value = ''
    this.refs.posologia.value = ''
    this.refs.via.value = ''
    this.setState ({ 
        paciente: null,
        medicamento: [],
        inputMedicamento: [],
        posologia: null,
        via: null,
        date: [],
        consultas: {},
        save: false,
        resultado:[],
        farmacos:[],
        resInteracao: [],
        btnvisible: false,
        interacaovisible: false,
        verInteracoes: [],
        showInteracoes: false
    })
}


showInteracoes = () => {
    this.setState ({ showInteracoes: true })
    const interacoes = this.state.resInteracao.map((int, i) => {
        return(
            <div className="card mt-3" key={i}>
                <p><b>Farmaco1:</b> {int.Farmaco1}</p>
                <p><b>Farmaco2:</b> {int.Farmaco2}</p>
                <p><b>Nome:</b> {int.Nome}</p>
                <p><b>Descrição:</b> {int.Descricao}</p>
            </div>
        )
    }) 
    this.setState ({ verInteracoes: interacoes })
}

  render() {
    const inputPacientes = this.state.pacientes.map((item, i) => {
        return <option key={i} value={item}>{item}</option>
    })

    const arrayAux = this.state.medicamento.map((med, i) => {
        return(
            <li key={i} className="list-group-item bg-info text-white">{med + "  "}</li>
        )
    })
 
    return (
        <div className="mb-3">
        <Header />
        <div className="container-fluid">
            <Link to="/"><button className="btn btn-secondary float-right">voltar</button></Link>
            <h2>Médico: {this.state.medico}</h2>
                <label className="font-weight-bold mt-4">paciente</label><br/>
                <select ref="paciente" className="form-control form-control-lg" onChange={this.selectPaciente} id="pacientes">
                    <option value="">selecione o paciente</option>
                    {inputPacientes}
                </select><br/><br/>
                <label className="font-weight-bold">medicamento</label><br/>
                <input className="form-control form-control-lg" ref="medicamento" onChange={this.addMedicamento}type="text" id="medicamento"/>
                {this.state.btnvisible &&
                    <button 
                        className="btn btn-secondary mt-2"
                        href="#" 
                        onClick={this.addCampo}>
                        <FontAwesomeIcon icon={faPlusSquare} size="2x" />
                        <b className="ml-3 mb-3">adicionar medicamento</b>
                    </button>
                }
                <br/>
                <ul className="list-group mt-2">{arrayAux}</ul>

                {this.state.interacaovisible && 
                    <div className="alert alert-danger mt-1" role="alert">
                        Existem interações medicamentosas sobre os medicamentos receitados
                    </div>
                }

                <label className="font-weight-bold">posologia</label><br/>
                <input className="form-control form-control-lg" ref="posologia" onChange={this.addPosologia}type="text" id="posologia"/><br/>
                <label className="font-weight-bold">via de administração</label><br/>
                <input className="form-control form-control-lg" ref="via" onChange={this.addVia}type="text" id="via"/><br/>
                <input 
                    className="form-control form-control-lg" 
                    type="date"
                    data-date-format="DD-MM-YYYY"
                    onChange={this.onChange}
                    >
                </input>
                <button onClick={this.enviarForm} type="button" className="btn btn-secondary btn-lg mt-4 mr-3">salvar</button>
                <button onClick={this.limpaForm} type="button" className="btn btn-secondary btn-lg mt-4 mr-3">cancelar</button>
                {this.state.interacaovisible &&
                    <button onClick={this.showInteracoes}type="button" className="btn btn-danger btn-lg mt-4 float-right">interações</button>
                }
                {this.state.showInteracoes &&
                    (this.state.verInteracoes)
                }
        </div>
    </div>
    )
  }
}
