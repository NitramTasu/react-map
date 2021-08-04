import logo from './logo.svg';
import './App.css';

import React,{ useEffect} from 'react';

function App() {
  const elementsIdConst = {
    LEAFTLET_CSS: 'leafletcss',
    LEAFTLET_JS: 'leafletjs',
    MAP_ID: 'mapid',
  }

  function waitLoadElementsById(elementsId, callBack) {
    const formatedArray = elementsId.map(item => `#${item}`)

    var elementsExists = setInterval(function () {
      if (document.querySelectorAll(formatedArray).length === elementsId.length) {
        try {
          callBack()
        } catch (e) {
          throw e
        }
        clearInterval(elementsExists)
        clearTimeout(timeout)
      }
    }, 100)

    const timeout = setTimeout(() => {
      clearInterval(elementsExists)
    },5000)
  }

  const insertScriptSrc = (scriptUrl, key = '', id) => {
    if (id && !document.getElementById(id)) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = scriptUrl
      if (id.length > 0) {
        script.id = id
      }
      if (key.length > 0) {
        script.integrity = key
      }
      script.async = false
      script.crossOrigin = ''
      document.body.appendChild(script)
    }
  }

  const insertLinkCSS = (cssUrl, key = '', id) => {
    if (id && !document.getElementById(id)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = cssUrl
      if (id.length > 0) {
        link.id = id
      }
      if (key.length > 0) {
        link.integrity = key
      }
      link.crossOrigin = ''
      document.body.appendChild(link)
    }
  }
  
  function renderMap() {
    var mymap = window.L.map('mapid')
      mymap
        .on('load', () => {
          
          window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://carto.com/">Carto</a>',
            maxZoom: 12,
            tileSize: 512,
            zoomOffset: -1,
          })
            .addTo(mymap)
          
          window.L.marker([51.5, -0.09]).addTo(mymap);
          
        }).setView([51.505, -0.09], 13);
    
  }
  
  useEffect(() => {
   insertLinkCSS(
      'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
      '',
      elementsIdConst.LEAFTLET_CSS,
    )
    insertScriptSrc(
      'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
      '',
      elementsIdConst.LEAFTLET_JS,
    )
    waitLoadElementsById(Object.values(elementsIdConst), () => renderMap())
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div id='mapid'> </div>
      </header>
    </div>
  );
}

export default App;
