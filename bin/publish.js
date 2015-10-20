/**
 * This uploads the site to s3.
 *
 * @author bshai date 10/19/15.
 */
var shell = require('shelljs');

console.log('Building site');
require('./build.js');

console.log('Uploading site to s3');
shell.exec('aws --profile personal s3 sync --delete target s3://benjaminshai.com --cache-control max-age=0');