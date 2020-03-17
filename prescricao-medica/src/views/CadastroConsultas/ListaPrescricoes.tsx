import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PrescricaoMedica from '../../models/PrescricaoMedica';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  containerPrincipal: {
    marginBottom:20,
  },
}));

type Props = {
  prescricoes: PrescricaoMedica[]
};

const ListaPrescricoes: React.FC<Props> = ({prescricoes}) => {

  const clases = useStyles();

  const [expandido, setExpandido] = React.useState<number | false>(false);

  const handleChange = (indice: number) => (event: React.ChangeEvent<{}>, estaExpandido: boolean) => {
    setExpandido(estaExpandido ? indice : false);
  };

  return (
    <div className={clases.containerPrincipal}>
      { prescricoes.map( (prescricao,indice) =>
        <ExpansionPanel key={indice} expanded={expandido === indice} onChange={handleChange(indice)}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>{prescricao.remedio.nome}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <strong>Posologia:</strong> {prescricao.posologia} <br></br>
              <strong>Via de administração:</strong> {prescricao.viaAdministracao}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        )
      }
    </div>
  );
}

export default ListaPrescricoes;