import React, {useEffect} from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, useHistory} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'css-social-buttons/css/zocial.css'

import App from './components/App'

import ReactGA from 'react-ga'
ReactGA.initialize('UA-3128634-8')
ReactGA.pageview(window.location.pathname)

// redirect from old routes
let match = window.location.href.match(/machine[\-]?learning(\/.*)?/);
if (match) {
  window.location.href = match[1] ? `/mlg${match[1]}` : '/mlg';
}

function Index() {
  const {listen} = useHistory()

  // https://medium.com/javascript-in-plain-english/google-analytics-with-react-router-and-hooks-16d403ddc528
  useEffect(() => {
    return listen((location) => {
      ReactGA.pageview(location.pathname) //  + location.search);
    })
  }, [])

  return <App />
}

// 8bb28bed: google analytics
ReactDom.render(<Router><Index /></Router>, document.getElementById('root'));