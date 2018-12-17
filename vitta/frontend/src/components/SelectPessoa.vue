<template>
     <v-autocomplete
        :items="pessoas"
        :filter="customFilterPessoa"
        @change="seleciona"
        color="white"
        item-value="id"
        item-text="nome"
        :label="titulo"
        return-object
        :readOnly="readOnly"
      ></v-autocomplete>
</template>

<script>
import axios from 'axios';

export default {
    props: ['pessoas', 'titulo', 'seleciona', 'readOnly'],
    methods :{
        customFilterPessoa (item, queryText, itemText) {
            const textOne = item.nome.toLowerCase()
            const textTwo = item.documento
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 ||
            textTwo.indexOf(searchText) > -1

        }
    }
}
</script>

<style>

</style>
