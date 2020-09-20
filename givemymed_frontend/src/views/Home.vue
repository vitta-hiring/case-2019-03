<template>
  <div class="card" style="padding: 0;">
    <div class="card-body">
      <h5 class="card-title">Bem vindo ao Give My Med!</h5>
      <h6 class="card-subtitle mb-2 text-muted">Instruções</h6>
      <p class="card-text">Aqui estão as instruções básicas para que você possa utilizar a aplicação da melhor forma possível =)</p>
      <p><span class="text-muted">Passo 1:</span> para que você possa acessar a área de médicos, é necessário realizar o login, para isso basta clicar no botão "Login", localizado no canto superior direito, ou tentar navegar para alguma das rotas da barra de navegação. (Caso  você esteja logado, o botão será substituido por "Logout", e você será automaticamente deslogado). Caso não possua usuário, basta cadastrar-se.</p>
      <p><span class="text-muted">Passo 2:</span> caso deseje ver a lista completa de médicos, basta selecionar a opção "Medicos" na barra de navegação. Você poderá filtrá-los pelo nome ou pelo id. Caso não existam médicos cadastrados, ou você deseja cadastrar um novo, é possível utilizar o botão "Adicionar" para incluir um médico. Ao selecionar um da lista, você poderá ver os pacientes pertencentes àquele médico.</p>
      <p><span class="text-muted">Passo 3:</span> da mesma forma como na tela anterior, caso deseje adicionar, basta clicar no botão! Caso queira ver os médicos prescritos para um determinado paciente, você deve selecioná-lo.</p>
      <p><span class="text-muted">Passo 4:</span> agora você provavelmente deve estar visualizando os medicamentos prescritos para o paciente, àqueles que forem conflitantes estarão com um colaração avermelhada. Você também pode adicionar medicamentos para este paciente.</p>
    </div>
    <div class="card-footer text-muted text-center">
      Aplicação desenvolvida com muito carinho e café por Luiz Fernando Rodrigues Sanches =)
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
