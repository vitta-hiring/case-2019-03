import { createGlobalStyle } from 'styled-components'

const Theme = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    outline: none;
  }

  #root {
    display: grid;
    grid-template-areas:
    'sidebar header'
    'sidebar content';
    grid-template-rows: 120px 1fr;
    grid-template-columns: 16vw 1fr;
    height: 100vh;
    width: 100vw;
  }
`

export default Theme
