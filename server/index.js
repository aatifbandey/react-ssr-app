import koa from "koa";
import bodyParser from 'koa-bodyparser';
import logger from "koa-logger";
import cors from "koa-cors";

import renderer from "./renderer";
import Router from "koa-router";
import serve from "koa-static";

// import serve from "./serve";
import  { getApiResponse, deleteCache } from "./backend"

// import {renderToString} from 'react-dom/server';
// import App from '../client';


//These are the new change


const app = new koa();
// app.use(serve(__dirname)); //serve the build directory

const router = new Router();

const PORT = 3000;

app.use(bodyParser());
app.use(logger());
app.use(cors());


router.get('/health-check', ctx => {
  // const reactAppHtml = renderToString(<App />);
  // console.log(ctx);
  // const html = Html({
  //   title: 'React SSR!',
  //   body: reactAppHtml
  // })

  ctx.body = `<h1> Server running </h1>`;
  return ctx;
});

router.post('/api/search', async ctx => {
  const res = await getApiResponse(ctx);
  ctx.body = {
    	data: res.data,
    	source: res.source
  };
  return ctx;
});

router.get('/api/clear-cache', async ctx => {
    
  await deleteCache();
  ctx.body = {
    message: "Cache Deleted"
  };
  return ctx;
});

app.use(router.routes());

app.use(renderer)


app.listen(PORT, function () {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});


export default app;



