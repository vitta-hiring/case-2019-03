<template>
  <div id="app">
    <MainHeader />
      <div class="container-fluid">
        <router-view/>
      </div>
    <MainFooter />
  </div>
</template>
<script>
import MainHeader from './components/layouts/header/Main'
import MainFooter from './components/layouts/footer/Main'

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style src='./assets/sass/app.scss' lang='sass'></style>

<style lang="css">

html {
  position: relative;
  min-height: 100%;
}

html body {
   padding-top: 60px;
}

html body .container {
  padding: 60px 15px 0;
}

html body .footer {
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
  padding-top: 20px;
}

html body .footer .container {
  padding-right: 0px;
  padding-left: 0px;
}

html body .container .text-muted {
  margin: 0;
}

</style>
