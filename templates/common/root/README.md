# <%= _.slugify(_.humanize(appname)) %>

This project is generated with [yo sprig-angular generator](https://github.com/eatsprig/generator-sprig-angular)
version <%= pkg.version %>.

## Post-generation

After generating this app, the following actions should be performed:

1. Fix file permissions and initialize linting on commit:
```
chmod 755 script/initialize-linting.sh
chmod 755 script/git-hooks/pre-commit.sh
./scripts/initialize-linting.sh
```

2. Setup CircleCI tests:
Create a project at circleci.com for this repository

3. Consider locking down bower/node versions. This will prevent unintended failures when deploying.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
