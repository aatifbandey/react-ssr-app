
import React from "react";
import {renderToString} from 'react-dom/server';
import { renderStylesToString } from '@emotion/server';
import { StaticRouter } from 'react-router-dom';

import App from '../../client/App';

export const Html = (html) =>{ 
  return  `<html>
 
    <body class="ssr">

    <div id="root">
    ${html}
    </div>
    </body>
    <script src="http://localhost:8080/bundle.js" ></script>
  </html>`;
}

const renderer = async ctx => {
  let completeHtmlDoc = '';
  const context = {};
  const app = (
    
      <StaticRouter  context={context}>
        <App />
      </StaticRouter>
  );
 
  const body = await renderToString(app);  

  let res = renderStylesToString(body);

  completeHtmlDoc += Html(res);

  try {
  ctx.status = 200;
  ctx.body = completeHtmlDoc;
  return;
  } catch(e) {
    ctx.status = 500;
    ctx.body = `<h1> Failed SSR</h1>`;
  }
};


export default renderer;