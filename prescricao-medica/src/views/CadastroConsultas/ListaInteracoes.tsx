import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Grid, makeStyles } from '@material-ui/core';
import InteracaoMedicamentosa from '../../models/InteracaoMedicamentosa';

const useStyles = makeStyles(theme => ({
  containerPrincipal: {
    marginBottom:20,
  },
  iconeAlerta: {
    color:'#f44336',
    marginRight:10,
  },
  bordaAlerta: {
    border:'1px solid #f44336',
  }
}));

type Props = {
  interacoes: InteracaoMedicamentosa[]
};

const ListaInteracoes: React.FC<Props> = ({interacoes}) => {

  const clases = useStyles();

  const [expandido, setExpandido] = React.useState<number | false>(false);

  const handleChange = (indice: number) => (event: React.ChangeEvent<{}>, estaExpandido: boolean) => {
    setExpandido(estaExpandido ? indice : false);
  };

  return (
    <div className={clases.containerPrincipal}>
      {interacoes.length>0 ?
      <Typography variant='body1'>Interações Medicamentosas</Typography> 
      : null
    }
      { interacoes.map( (interacao,indice) =>
        <ExpansionPanel className={clases.bordaAlerta} key={indice} expanded={expandido === indice} onChange={handleChange(indice)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Grid container direction='row' alignItems='center' wrap='nowrap'>
              <ErrorOutlineIcon fontSize='large' className={clases.iconeAlerta} />
              <Typography><strong>{interacao.farmaco1} - {interacao.farmaco2}</strong></Typography>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <strong>Gravidade:</strong> {interacao.nome} <br></br>
              <strong>Descrição:</strong> {interacao.descricao}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        )
      }
    </div>
  );
}

export default ListaInteracoes;