exports.init = function(logger, config, cli, appc) {
  if (cli.tiapp.properties['ti.version.range']) {
    if (!appc.version.satisfies(cli.sdk.manifest.name, cli.tiapp.properties['ti.version.range'].value)) {
      logger.error('This app requires Titanium SDK ' + cli.tiapp.properties['ti.version.range'].value + ' instead of ' + cli.sdk.name + ' (' + cli.sdk.manifest.name + ')');
      process.exit(1);
    }
  }
};
