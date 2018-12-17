<template>
<div>
  <v-autocomplete v-on:change="change"
    :items="medicamentos"
    chips
    color="blue-grey lighten-2"
    label="Medicação"
    item-text="nome"
    item-value="id"
    multiple
    return-object
    :readOnly="readOnly"
  >
    <template
      slot="selection"
      slot-scope="data"
    >
      <v-chip
        :selected="data.selected"
        close
        class="chip--select-multi"
        @input="remove(data.item)"
      >
        {{ data.item.nome }}
      </v-chip>
    </template>
    <template
      slot="item"
      slot-scope="data"
    >
        <v-list-tile-content>
          <v-list-tile-title v-html="data.item.nome"></v-list-tile-title>
          <v-list-tile-sub-title >{{ data.item.descricao }} - {{ data.item.viaAdministracao }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </template>
  </v-autocomplete>

  <template v-for="(alert, idx) in alertasInteracao" >
    <v-alert :value="true" 
    :key="idx"
    :color="alert.color"
    icon="priority_high">
    <h3>Interação {{ alert.gravidade }} entre {{ alert.medicamento1 }} e {{ alert.medicamento2 }}</h3>
    <p>{{ alert.descricao }}</p>
    </v-alert>
  </template>
</div>

</template>

<script>
export default {
    props: ['change', 'medicamentos', 'alertasInteracao', 'readOnly']
}
</script>

<style>

</style>
