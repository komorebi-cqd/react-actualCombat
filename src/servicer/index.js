const requireApi = require.context('./interface', true, /.js$/);

const module = {};

requireApi.keys().forEach((key) => {
  Object.assign(module, requireApi(key));
});

export default module;
