# Auto Header Template

自动为新创建的文件生成文件头模板。支持多种编程语言，自动识别文件类型并插入相应的模板。

## Features

- 自动识别文件类型，根据文件扩展名插入对应的模板
- 首次使用时自动引导配置个人信息
- 智能使用系统用户名作为默认值
- 支持自定义模板，可通过配置灵活修改
- 支持多种变量：文件名、作者、日期时间等

## Usage

安装插件后，在 VS Code 文件浏览器中创建新文件时，会自动在文件开头插入对应的模板。

首次使用时，插件会提示你配置个人信息（姓名、机构、邮箱）。如果跳过配置，会自动使用系统用户名。

你也可以通过命令面板（`Cmd+Shift+P` / `Ctrl+Shift+P`）运行 `Auto Header Template: 配置个人信息` 来手动配置。

## Extension Settings

* `autoHeaderTemplate.enabled`: 启用/禁用自动插入文件头模板
* `autoHeaderTemplate.author`: 模板中使用的作者名称
* `autoHeaderTemplate.university`: 模板中使用的大学/机构名称
* `autoHeaderTemplate.email`: 模板中使用的邮箱地址
* `autoHeaderTemplate.templates`: 自定义文件模板，按文件扩展名配置

### Supported Variables

* `${fileName}` - 完整文件名（包含扩展名）
* `${fileNameWithoutExt}` - 文件名（不含扩展名）
* `${author}` - 作者名称
* `${university}` - 大学/机构名称
* `${email}` - 邮箱地址
* `${datetime}` - 日期时间（格式：Mon Jan 01 2024 12:34:56）
* `${date}` - 日期（中文格式）
* `${dateISO}` - ISO 格式日期（2024-01-01）
* `${year}` - 年份
* `${month}` - 月份
* `${day}` - 日期

## Supported File Types

Python (.py), C/C++ (.c, .cpp, .h, .hpp), TypeScript/JavaScript (.ts, .tsx, .js, .jsx), Java (.java), Go (.go), Rust (.rs), MATLAB (.m), Fortran (.f, .f90, .f95, .for), CSS (.css, .scss, .less), HTML (.html), Markdown (.md)

## Release Notes

### 0.0.1

初始版本发布
- 自动为新创建的文件插入模板头
- 支持多种编程语言
- 首次配置向导
- 自动获取系统用户名
- 自定义模板支持
