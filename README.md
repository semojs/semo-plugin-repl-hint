# semo-plugin-repl-hint

A Semo plugin to provide ability to get dev hints from devhints.io

## Installation & Usage

```
npm i -g @semo/cli semo-plugin-repl-hint
semo repl --hook
>>> .hint react
>>> .hint vue --copy
>>> .hint lodash -copy-only
```

## Why `--copy`

Because devhints.io give long hints to us, if you want to save to other place, it's hard to copy from terminal.

## Licence

MIT