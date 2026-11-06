# Contributing

Follow the README setup from this directory. Keep this example independently installable; do not rely on tooling from the enclosing repository.

For parser changes, add a focused failing behavior test in `src/index.test.ts`, implement the change, then run `mise exec -- just format`, `mise exec -- just check`, and `mise exec -- just test-consumer`. Consumer changes must continue to install the packed tarball outside the repository. Do not commit `node_modules/`, `dist/`, tarballs, or temporary consumer output.

Explain API or compatibility changes in the README and your pull request. Include the commands you ran and any unverified runtime boundaries. Keep fixes small and do not publish this example package. Release automation and selection of an owned npm name require separate work and authorization.
