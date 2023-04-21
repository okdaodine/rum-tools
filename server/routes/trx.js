const router = require('koa-router')();
const { assert, Errors, throws } = require('../utils/validator');
const rumSDK = require('rum-sdk-nodejs');

router.post('/', sendTrx);
router.get('/:trxId', get);

async function sendTrx(ctx) {
  const payload = ctx.request.body;
  assert(payload, Errors.ERR_IS_REQUIRED('payload'));
  const { seed } = ctx.query;
  assert(seed, Errors.ERR_IS_REQUIRED('seed'));
  try {
    const { groupId } = rumSDK.cache.Group.add(seed);
    const res = await rumSDK.chain.Trx.send(groupId, payload);
    ctx.body = res;
  } catch (err) {
    console.log(err);
    const { status } = err.response || {};
    if (status > 400 && status < 500) {
      throws(Errors.ERR_NO_PERMISSION('request'));
    } else {
      throws(Errors.ERR_IS_REQUEST_FAILED(err.response?.data?.message || err.message));
    }
  }
}

async function get(ctx) {
  const { seed, trxId } = ctx.query;
  assert(seed, Errors.ERR_IS_REQUIRED('seed'));
  const { groupId } = rumSDK.cache.Group.add(seed);
  const trx = await rumSDK.chain.Trx.get(groupId, trxId);
  assert(trx, Errors.ERR_NOT_FOUND('trx'));
  ctx.body = trx;
}

module.exports = router;