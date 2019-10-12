const pacientes = [
    {
        id: 1,
        name: 'Sandro Santos',
        email: 'sandroSantos@gmail.com'
    },
    {
        id: 2,
        name: 'Alexandre Ishikawa',
        email: 'alex.ishiikawa@gmail.com'
    },
    {
        id: 3,
        name: 'Luigi Mazzini',
        email: 'luigiM@gmail.com.br'
    },
    {
        id: 4,
        name: 'Danilo Gaiotti',
        email: 'danilo.gaiotti@gmail.com'
    }
]
const head = {
    paciente: 'name',
    email: 'E-mail',
    farmaco: 'Farmaco',
    viaAdministracao:'Via Administracao'
}

const medicine = [
    {
        IdMedicamento: 36385,
        Nome: 'RETAPAMULINA',
        Farmaco: null,
        Farmacos: ['RETAPAMULINA'],
        Concentracao: '10',
        Unidade: 'MG/G',
        TipoMedicamento: 'GENERICO',
        FormaFarmaceutica: 'POMADA DERMATOLOGICA',
        ViaAdministracao: 'TOP',
        CodigoATC: 'D06AX13',
        UsoInterno: true,
        Antimicrobiano: true,
        Bula:
            'http://www.anvisa.gov.br/datavisa/fila_bula/frmVisualizarBula.asp?pNuTransacao=9442872014&pIdAnexo=2273137',
        Portaria344: '',
        ControleEspecial: false,
        TISS: '510611203161218',
        MIP: false,
        Label: 'RETAPAMULINA 10MG/G - POMADA DERMATOLOGICA',
        Unificado: null
    },
]
export { medicine ,pacientes, head }
