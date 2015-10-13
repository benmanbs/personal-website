/**
 * This packages up the site into the target directory, and assembles the blog object.
 *
 * @author bshai date 10/12/15.
 */

var fs = require('fs');
var path = require('path');
var ncp = require('ncp').ncp;
var archiver = require('archiver');
var _ = require('underscore');
var postsTemplate = _.template("define([], function () {\n" +
    "\t'use strict';\n" +
    "\n" +
    "\treturn {<%= posts%>\n\t};\n" +
    "});");
var postTemplate = _.template("\n\t\t'<%= url%>': {\n\t\t\ttitle: '<%= title%>', \n\t\t\tdate: new Date('<%= date%>'), \n\t\t\tcontent: '<%= content%>'\n\t\t}")

var filePath = path.join(__dirname, 'blog_posts');

console.log("Loading blog posts from " + filePath);

var sanitizeContent = function(content) {
    // clean up the quotes
    content = content.replace(/'/g, '\\\'');
    // clean up the \n
    content = content.replace(/\n/g, '\' + \n\t\t\t\t\'');
    return content;
};

var files = fs.readdirSync(filePath);

console.log("Found " + files.length + " post(s).");

var posts = [];
_.each(files, function(file) {
    console.log('Procesing post ' + file);

    data = fs.readFileSync(path.join(filePath, file), {encoding: 'utf-8'});

    var titleEnd = data.indexOf('\n\n');
    var title = data.substr(0,titleEnd);
    data = data.substr(titleEnd + 1);

    var dateEnd = data.indexOf('\n\n');
    var date = data.substr(0,dateEnd);
    data = data.substr(dateEnd + 1);

    data = sanitizeContent(data);

    posts.push(postTemplate({url: file, title: title, date: date, content: data}));
});

ncp(path.join(__dirname, 'src'), path.join(__dirname, 'target'), function (err) {
    if (err) {
        return console.error(err);
    }
    var postsString = postsTemplate({posts:posts.join(',')});
    fs.writeFile(path.join(__dirname, 'target', 'js' ,'blogCollection.js'), postsString, function(err) {
        if (err) {
            return console.error(err);
        }
        var archive = archiver.create('zip', {});

        archive.on('entry', function(data) {
            fs.writeFile(path.join(__dirname, 'target', 'site.zip'), data, function(err) {
                if (err) {
                    return console.error(err);
                }
            });
        });

        archive.directory(path.join(__dirname, 'target')).finalize();
    })
});

