var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'mac', 'DnsmasqUi.app', 'Contents', 'MacOS', 'DnsmasqUi');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'linux', 'DnsmasqUi');
      default:
        throw 'Unsupported platform';
    }
  }
};
