const serve = require('koa-static');
const { join, resolve } = require('path');




function serveMiddleware(source, opts = {}) {

  const path = resolve(join(__dirname, source));
  const maxAge = Math.min(Math.max(0, opts.maxAge), 31556926000);
  const options = {
    setHeaders(res, requestPath) {
      // if (requestPath.includes('.ico')) {
      //   res.setHeader('Content-Type', 'image/x-icon');
      // }

      res.setHeader('Cache-Control', `public, max-age=${maxAge / 1000}`);
    },
  };

  console.log('path:', path);

  return serve(path, options);
}

export default serveMiddleware;