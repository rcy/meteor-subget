Package.describe({
  summary: "SubGet - semi automatic subscriptions"
});

Package.on_use(function (api, where) {
  // api.use([''], ['client', 'server']);
  api.add_files('subget.js', 'client');
  api.export('SubGet', 'client');
});

Package.on_test(function (api, where) {
  api.use(['tinytest', 'test-helpers'], ['client', 'server']);
  // api.add_files([''], ['client', 'server']);
  // api.export([''], ['client', 'server']);
});
