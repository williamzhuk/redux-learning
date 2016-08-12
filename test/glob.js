var context = require.context('../web', true, /.+\.spec\.js$/);
context.keys().forEach(context);
module.exports = context;