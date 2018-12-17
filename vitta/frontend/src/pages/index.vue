<template>
<div>
    <div v-if="seederInserido">
        <h1>Aguarde Inserindo Dados no Banco de Dados</h1>
    </div>
    <div v-else>
        <h1>{{ seederInserido }}</h1>
        <h1>Hiring Vitta</h1>
        <h3>Hiago Porto Dutra</h3>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    asyncData() {
        return axios(`http://localhost:3030/controle/`)
            .then((response) => { seederInserido: response.data.insert });
    }
}
</script>
