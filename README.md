# personal website

This is the full code for http://benjaminshai.com.

Included in here are some simple scripts.

To build and deploy locally, just run `node bin/deployLocal.js` from the parent directory. This will start up a local server on port 3000, with the full site.

To rebuild the sources, just run `node bin/build.js`.

To sync with s3, just run `node bin/build.js`. Note: you'll need to configure your aws credentials.

## Outstanding work

- think about a static site generator to make pure static html, so there are no `#`s in the urls.
- optimize mobile site (think about a hamburger menu as well)
- write more blog posts!
