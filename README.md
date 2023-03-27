### How to compile & load

```sh
$ git clone git://github.com/oleavr/frida-agent-example.git
$ cd frida-agent-example/
$ npm install
$ frida -U -f com.example.android --no-pause -l _agent.js
```

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.



添加了git子模块支持

```shell
# 首次克隆请 初始化子模块
git submodule init
# 更新子模块
git submodule update
```

> [Git - 子模块 (git-scm.com)](https://git-scm.com/book/zh/v2/Git-工具-子模块)
