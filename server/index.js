const Koa = require('koa');
const http = require('http');
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const router = require('koa-router')();
const serve = require('koa-static');
const views = require('koa-views');
const rumSDK = require('rum-sdk-nodejs');

const content = require('./routes/content');
const trx = require('./routes/trx');

const {
  errorHandler,
  extendCtx
} = require('./middleware/api');

const app = new Koa();
const port = 9000;

app.use(convert(bodyparser({ formLimit:"5mb", jsonLimit:"5mb" })));
app.use(convert(json()));
app.use(convert(logger()));
app.use(cors({
  credentials: true
}));
app.use(views(__dirname + '/build'));
app.use(serve('build', {
  maxage: 365 * 24 * 60 * 60,
  gzip: true
}));
app.proxy = true;

router.all('(.*)', errorHandler);
router.all('(.*)', extendCtx);

router.use('/api/contents', content.routes(), content.allowedMethods());
router.use('/api/trx', trx.routes(), trx.allowedMethods());

router.use('(.*)', async ctx => ctx.render('index'));

app.use(router.routes(), router.allowedMethods());

app.on('error', function (err) {
  console.log(err)
});

const server = http.createServer(app.callback());
server.listen(port, () => {
  console.log(`Node.js v${process.versions.node}`);
  console.log(`Server run at ${port}`);
});

rumSDK.cache.Group.clear();