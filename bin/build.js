/**
 * This packages up the site into the target directory, and assembles the blog object.
 *
 * @author bshai date 10/12/15.
 */

// libs
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');
var _ = require('underscore');

// templates
var postsTemplate = _.template("define([], function () {\n" +
    "\t'use strict';\n" +
    "\n" +
    "\treturn {<%= posts%>\n\t};\n" +
    "});");
var postTemplate = _.template("\n\t\t'<%= url%>': {\n\t\t\turl: '<%= url%>', \n\t\t\ttitle: '<%= title%>', \n\t\t\tdate: new Date('<%= date%>'), \n\t\t\tcontent: '<%= content%>'\n\t\t}")

// helper functions
/**
 * Clean up the content of a post. Turns "'" into "\'", and new lines ("\n") into "' + \n '" so it will
 * work with the json file.
 *
 * @param content
 * @returns {string}
 */
var sanitizeContent = function(content) {
    // clean up the quotes
    content = content.replace(/'/g, '\\\'');
    // clean up the \n
    content = content.replace(/\n/g, '\' + \n\t\t\t\t\'<br>');
    return content;
};

console.log('Cleaning up target dir');
shell.exec('rm -rf target');

console.log('Generating blog directory');
var filePath = path.join(__dirname, '../', 'blog_posts');

console.log("Loading blog posts from " + filePath);
var files = fs.readdirSync(filePath);

console.log("Found " + files.length + " post(s).");

var posts = [];
_.each(files, function(file) {
    console.log('Procesing post ' + file);

    // get file contents
    data = fs.readFileSync(path.join(filePath, file), {encoding: 'utf-8'});

    // parse out title
    var titleEnd = data.indexOf('\n\n');
    var title = sanitizeContent(data.substr(0,titleEnd));
    data = data.substr(titleEnd + 2);

    // parse out date
    var dateEnd = data.indexOf('\n\n');
    var date = data.substr(0,dateEnd);
    data = data.substr(dateEnd + 2);

    // get content
    data = sanitizeContent(data);

    posts.push(postTemplate({url: file, title: title, date: date, content: data}));
});

console.log('Creating target directory');
shell.exec('mkdir target');

console.log('Filling target directory with src contents');
shell.exec('cp -r src/* target/');

console.log('Generating blog collection JSON');
var postsString = postsTemplate({posts:posts.join(',')});
fs.writeFileSync(path.join(__dirname, '../', 'target', 'js' ,'blogCollection.js'), postsString);

