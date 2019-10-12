import React from 'react'
import ReactDOM from 'react-dom'
import './styles/styles.scss'
import AppRouter from './components/AppRouter';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

library.add(faPlusSquare)


ReactDOM.render(<AppRouter />, document.getElementById('root'));