import React, {useEffect} from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter as Router, useHistory} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4'

// don't need bootstrap, imported in my scss
// import 'bootstrap/dist/css/bootstrap.min.css'

import 'css-social-buttons/css/zocial.css'

import App from './components/App'

let usingGA = false;
if (process.env.NODE_ENV === "production") {
  console.log("using GA")
  usingGA = true;
  ReactGA.initialize('G-0YR1STKJS3')
  ReactGA.send({hitType: "pageview", page: window.location.pathname})
}

function Index() {
  const {listen} = useHistory()

  // https://medium.com/javascript-in-plain-english/google-analytics-with-react-router-and-hooks-16d403ddc528
  useEffect(() => {
    if (!usingGA) {return}
    return listen((location) => {
      ReactGA.send({hitType: "pageview", page: location.pathname}) //  + location.search);
      window.scrollTo(0, 0);
    })
  }, [])

  return <App />
}

// 8bb28bed: google analytics
ReactDom.render(
  <React.StrictMode>
    <Router>
      <Index />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
