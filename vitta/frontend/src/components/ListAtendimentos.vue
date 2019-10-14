<template>
    <div v-if="temAtendimentosVisiveis">
        <v-list two-line>
          <template v-for="(item) in atendimentos.slice(0, 10)" >
            <v-list-tile :key="item.id" @click="click(item)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.nome"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.parecer"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
      </v-list>
      <v-dialog
              v-model="temMedicamentosVisiveis"
              max-width="400"
            >
              <v-card>
                <v-card-title class="headline">Lista de Medicamentos</v-card-title>

                  <v-list>
                    <template v-for="medicamento in medicamentosDialog" >
                      <v-list-tile :key="medicamento.id">
                        <v-list-tile-content>
                          <v-list-tile-title v-html="medicamento.nomeMedicamento"></v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                </v-list>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="$store.commit('LIMPA_LISTA_MEDICAMENTOS_ANTERIORES')"
                  >
                    OK
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
    </div>
</template>

<script>
export default {
    props: ['atendimentos', 'numreroPorPagina', 'pagina', 'click', 'medicamentosDialog'],
    computed: {
        temAtendimentosVisiveis () {
            return this.atendimentos.length > 0;
        },
        temMedicamentosVisiveis () {
            return this.medicamentosDialog.length > 0;
        }
    }
}
</script>

<style>

</style>
