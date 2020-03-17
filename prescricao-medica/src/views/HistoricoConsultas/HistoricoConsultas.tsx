import React from 'react';
import { connect } from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography, makeStyles, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper, Hidden } from '@material-ui/core';
import ConsultaMedica from '../../models/ConsultaMedica';
import { AplicativoState } from '../../store/store';
import NavegadorSuperior from '../NavegadorSuperior';

const useStyles = makeStyles(theme => ({
  espacamentoGrid: {
    width:'90%',
  },
  espacamentoCabecalho: {
    marginTop:10,
    marginBottom:10,
    paddingTop:10,
    paddingBottom:10,
  },
  igualarPadding: {
    paddingLeft:20,
    paddingRight:60,
  },
  espacamentoRemedios: {
    marginBottom:20,
  },
}));

type TipoProps = {
  voltarPasso: Function,
  proximoPasso: Function,
}

type StateProps = {
  consultas: ConsultaMedica[];
};

type Props = StateProps & TipoProps;

const SalvarConsulta: React.FC<Props> = props => {
  const clases = useStyles();

  const [expandido, setExpandido] = React.useState<number | false>(false);

  const handleChange = (indice: number) => (event: React.ChangeEvent<{}>, estaExpandido: boolean) => {
    setExpandido(estaExpandido ? indice : false);
  };

  const converteData = (data: string | Date): string => {
    const dataObj = new Date(data);
    return dataObj.getDate()+'/'+(dataObj.getMonth()+1)+'/'+dataObj.getFullYear(); 
  }

  return (
    <div>
      <NavegadorSuperior cabecalho={'Histórico de Consultas'} >
        <Grid container direction='row' justify='center'>
          <Grid className={clases.espacamentoGrid} container direction='column' 
            justify='center' alignItems='stretch' >
            <Paper className={clases.espacamentoCabecalho}>
              <Grid container direction='row' className={clases.igualarPadding}>
                <Grid item xs>
                  <Typography variant='h6'><strong>Médico</strong></Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant='h6'><strong>Paciente</strong></Typography>
                </Grid>
                <Hidden smDown>
                  <Grid item xs>
                    <Typography variant='h6'><strong>Data</strong></Typography>
                  </Grid>
                </Hidden>
              </Grid>
            </Paper>
            {
              props.consultas.map( (consulta,indice) =>
                <ExpansionPanel key={indice} expanded={expandido === indice} onChange={handleChange(indice)}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Grid container direction='row' >
                      <Grid item xs>
                        <Typography>{consulta.medico}</Typography>
                      </Grid>
                      <Grid item xs>
                        <Typography>{consulta.paciente}</Typography>
                      </Grid>
                      <Hidden smDown>
                        <Grid item xs>
                          <Typography>{converteData(consulta.data)}</Typography>
                        </Grid>
                      </Hidden>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container direction='row'>
                      <Hidden mdUp>
                        <Grid item xs>
                          <Typography>
                            <strong>Data:</strong> {converteData(consulta.data)} <br></br>
                          </Typography>
                        </Grid>
                      </Hidden>
                      {consulta.prescricoes.map((prescricao,indice) => 
                        <Grid key={indice} item xs={12} md={6} className={clases.espacamentoRemedios}>
                          <Typography>
                            <strong>Remédio:</strong> {prescricao.remedio.nome} <br></br>
                            <strong>Posologia:</strong> {prescricao.posologia} <br></br>
                            <strong>Via de administração:</strong> {prescricao.viaAdministracao}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            }
          </Grid>
        </Grid>
      </NavegadorSuperior>
    </div>
  )
}

const mapStateToProps = (store: AplicativoState) => {
  return {
    consultas: store.consultasState.consultas,
  };
};

export default connect(mapStateToProps)(SalvarConsulta);
