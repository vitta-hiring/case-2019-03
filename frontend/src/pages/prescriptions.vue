<template>
  <div
    class="full-width">
    <div
      class="layout-view layout-padding">
      <div
        v-for="(list, id) in lista" :key="id">
        <q-card class="q-ma-sm">
            <q-card-title>
                {{ list.patient }}
              <span slot="subtitle">{{ $t('general.doctor') }}: {{ list.doctorName }}</span>
              <span slot="right"> {{ date.formatDate(list.createdAt, 'DD/MM/YYYY HH:mm') }}</span>
            </q-card-title>
            <q-list separator>
              <div
                v-for="(drugs, id) in list.drugs" :key="id">
                <q-collapsible icon="bookmark" :label="drugs.name || drugs.Nome">
                    <div>
                      {{ `${$t('register.posology.label')}: ${drugs.posology}` }} | {{ `${$t('register.administrationGuide.label')}: ${drugs.administationGuide}` }}
                    </div>
                  </q-collapsible>
              </div>
            </q-list>
          </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import {
  QCard,
  QCardTitle,
  QList,
  QCollapsible,
  date
} from 'quasar'

export default {
  data: () => ({
    lista: [],
    date
  }),
  components: {
    QCard,
    QCardTitle,
    QList,
    QCollapsible
  },
  mounted () {
    this.lista = JSON.parse(localStorage.getItem('prescriptions')) || []
  }
}
</script>
