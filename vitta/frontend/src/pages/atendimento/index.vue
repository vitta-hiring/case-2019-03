<template>
  <div>
      <div v-if="!insert">
        <h1>Aguarde Inserindo Dados no Banco de Dados</h1>
      </div>
      <div v-else>
          <v-layout>
          <v-flex text-xs-center>
            <blockquote class="blockquote">
              Atendimento
              <footer>
                <small>
                  <em>Vitta</em>
                </small>
              </footer>
            </blockquote>

            <SelectPessoa
              :pessoas="medicos"
              titulo="Médicos"
              :seleciona="selecionaMedico"
              :readOnly="readOnly" />

            <SelectPessoa
              :pessoas="pacientes"
              titulo="Paciente"
              :seleciona="selectPaciente"
              :readOnly="readOnly" />

            <ListAtendimentos
              title="Atendimentos Anteriores"
              :medicamentosDialog="$store.state.novoAtendimento.medicamentosAnteriores"
              :atendimentos="$store.state.novoAtendimento.atendimentosAnteriores"
              :click="getMedicamentos"
              :readOnly="readOnly" />

            <v-textarea
              name="parecer"
              label="Parecer Médico"
              :value="parecer"
              auto-grow
              :readOnly="readOnly" 
              v-on:change="setParecer"
            ></v-textarea>

            <SelectMedicamentos
              :medicamentos="medicamentos"
              :change="selecionaMedicamento"
              :alertasInteracao="$store.state.novoAtendimento.interacoes"
              :readOnly="readOnly" />
              
            <div v-if="apresentaBotao">
              <div v-if="readOnly">
                <v-btn color="warning" v-on:click="alteraAtendimento">Alterar Atendimento</v-btn>
                <v-btn color="success" v-on:click="confirmaAtedimento">Confirmar</v-btn>
              </div>
              <div v-else>
                <v-btn color="primary" v-on:click="validaInteracoes">Validar Atendimento</v-btn>
              </div>
            </div>

              <v-layout row justify-center>
                <v-dialog v-model="abreDialogConfirmacao" persistent max-width="290">
                  <v-card>
                    <v-card-title class="headline">Atendimento Criado</v-card-title>
                    <v-card-text>{{ montaTextoConfirmacao() }}</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat v-on:click="limpaDados" to="/">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>

          </v-flex>
        </v-layout>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import SelectPessoa from '~/components/SelectPessoa.vue'
import SelectMedicamentos from '~/components/SelectMedicamentos.vue'
import ListAtendimentos from '~/components/ListAtendimentos.vue'

  export default {
    data() {
      return { 
        parecer: '',
        readOnly: false,
        dialogConfirma: false,
      }
    },
    middleware: 'novoAtendimento',
    components: {
      SelectPessoa,
      SelectMedicamentos,
      ListAtendimentos,
    },
    async asyncData({params}) {
      const { data: medicos } = await axios.get(`http://localhost:3030/medicos`);
      const { data: pacientes } = await axios.get(`http://localhost:3030/pacientes`);
      const { data: medicamentos } = await axios.get(`http://localhost:3030/medicamentos`);
      const { data: insert } = await axios.get(`http://localhost:3030/controle/`);
      return {
        medicos,
        pacientes,
        medicamentos,
        insert: insert.insert
      }
    },
    computed: {
      apresentaBotao () {
        const { paciente, medico } = this.$store.state.novoAtendimento;
        if (medico.id && paciente.id && this.parecer !== '') {
          return true;
        }
        return false;
      },
      abreDialogConfirmacao () {
        const { idAtendimento } = this.$store.state.novoAtendimento;
        return idAtendimento && idAtendimento > 0;
      }
    },
    methods: {
      selecionaMedicamento (val) {
        this.$store.commit('LIMPA_ALERTAS_INTERACAO')
        this.$store.dispatch('SELECIONA_MEDICAMENTO', { medicamentos: val })
        this.readOnly = false;
      },
      getMedicamentos (val) {
        const { id: idAtendimento } = val;
        this.$store.dispatch('BUSCA_MEDICAMENTOS_ATENDIMENTO', { idAtendimento })
        this.dialog = true;
      },
      selecionaMedico (val) {
        this.$store.commit('SELECIONA_MEDICO', { medico: val })
      },
      selectPaciente (val) {
        this.$store.dispatch('SELECIONA_PACIENTE', { paciente: val })
      },
      validaInteracoes () {
        this.$store.dispatch('VALIDA_INTERACOES')
        this.readOnly = true;
      },
      alteraAtendimento () {
        this.$store.commit('LIMPA_ALERTAS_INTERACAO')
        this.readOnly = false;
      },
      confirmaAtedimento () {
        this.$store.dispatch('GERAR_ATENDIMENTO', { parecer: this.parecer })
      },
      setParecer (val) {
        this.parecer = val;
      },
      montaTextoConfirmacao () {
        const { idAtendimento } = this.$store.state.novoAtendimento;
        return `O Atendimento de número ${idAtendimento} foi criado com sucesso.`
      },
      limpaDados () {
        this.$store.commit('NOVO_ATENDIMENTO_ESTADO_INICIAL');
      }
    },
  }
</script>
