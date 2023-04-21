const router = require('koa-router')();
const rumSDK = require('rum-sdk-nodejs');
const { assert, Errors } = require('../utils/validator');

router.get('/', list);

async function list(ctx) {
  const { seed } = ctx.query;
  assert(seed, Errors.ERR_IS_REQUIRED('seed'));
  const { groupId } = rumSDK.cache.Group.add(decodeURIComponent(seed));
  const contents = await rumSDK.chain.Content.list({
    groupId,
    count: ctx.query.count || 10,
    reverse: true
  });
  ctx.body = contents || [];
}

module.exports = router;