import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="monetization" content="$ilp.uphold.com/FzNEikF9pkQJ" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <a href="#main" style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0
        }}>Skip to main content</a>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var theme;
              try {
                theme = localStorage.getItem('theme');
              } catch (err) { }

              if(!theme && window.matchMedia('(prefers-color-scheme: dark)') && window.matchMedia('(prefers-color-scheme: dark)').matches) {                
                theme = 'dark'
              }               
              document.body.className = theme || 'light';

              function toggleTheme() {
                var body = document.querySelector('body');
                var newTheme = body.className === 'dark' ? 'light' : 'dark';                
                body.className = newTheme;
                try {
                  localStorage.setItem('theme', newTheme);
                } catch (err) { }
              }
              window.addEventListener('DOMContentLoaded', function(event) {
                var lightbulb = document.querySelector('button.lightbulb');
                if(lightbulb) lightbulb.addEventListener('click', toggleTheme);

                var links = document.querySelectorAll('a[href^="/"')
                links.forEach(function(link) {
                  link.addEventListener('mouseover', function(e) {
                    var l = e.target;
                    var href = l.href; 
                    var link = document.querySelector('link[href="'+href+'"]');
                    if (!link) {
                      var prefetchLink = document.createElement("link");
                      prefetchLink.href = href;
                      prefetchLink.rel = "prefetch";
                      document.head.appendChild(prefetchLink);
                    }
                  })
                });

                // send analytics data
                function sendData() {
                  var sitedata = {
                    useragent: navigator.userAgent,
                    title: document.title,
                    origin: window.location.origin,
                    pathname: window.location.pathname,
                    search: window.location.search,
                    referrer: document.referrer,
                    language: navigator.language || navigator.userLanguage,
                    offset: new Date().getTimezoneOffset(),
                    screensize: window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio
                  }
                  return fetch('/.netlify/functions/send', {
                    body: JSON.stringify(sitedata),
                    method: 'POST'
                  })
                }
                sendData();
              });              
            `,
          }}
        />
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
