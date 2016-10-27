import React from 'react'
import ReactDOM from 'react-dom'
import { Navbar, Jumbotron, Button } from 'react-bootstrap'

// import 'bootstrap/dist/css/bootstrap.scss'
// import './index.css'

// import App from './App'

class Root extends React.Component {
  render() {
    return <h1>Hello World</h1>
  }
}

ReactDOM.render(
  <Root/>,
  document.getElementById('root')
)
