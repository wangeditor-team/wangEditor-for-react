# Dev Doc

## 主要目录
- `src` 源代码
- `__test__` 单元测试
- `example` 本地测试 demo ，不用于 build
- `build` 打包配置

## 开发
`yarn dev`进行开发版本的编译

`yarn example`启动本地服务，使用example目录。

`yarn test`单元测试，使用test目录。

## 构建
`yarn build`构建代码

## 发布
`yarn release`选择版本号后会自动提交

## 注意事项
package.json
- 定义 `"main": "dist/index.js"`
- 定义 `"module": "dist/index.esm.js"`
- 定义 `"types": "dist/index.d.ts"`
- `@wangeditor/core` `@wangeditor/editor` 不要安装在 `dependencies` ，否则用户安装时也会安装它们
