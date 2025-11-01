import * as vscode from 'vscode';
import * as path from 'path';

// 获取配置
function getConfig(): { enabled: boolean; author: string; university: string; email: string; templates: { [key: string]: string } } {
	const config = vscode.workspace.getConfiguration('autoHeaderTemplate');
	return {
		enabled: config.get<boolean>('enabled', true),
		author: config.get<string>('author', 'Shen Yang'),
		university: config.get<string>('university', 'Hunan Normal University'),
		email: config.get<string>('email', 'yangshen@hunnu.edu.cn'),
		templates: config.get<{ [key: string]: string }>('templates', {})
	};
}

// 替换模板中的变量
function replaceTemplateVariables(template: string, fileName: string, author: string, university: string, email: string): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const date = now.toLocaleDateString('zh-CN');
	const dateISO = now.toISOString().split('T')[0];
	
	// 文件名（不含扩展名）
	const fileNameWithoutExt = fileName.replace(/\.[^.]+$/, '');
	
	// 日期时间格式：类似 Vim 的 strftime("%a %b %d %Y %H:%M:%S")
	const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const weekday = weekdays[now.getDay()];
	const monthName = months[now.getMonth()];
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const datetime = `${weekday} ${monthName} ${day} ${year} ${hours}:${minutes}:${seconds}`;

	return template
		.replace(/\$\{fileName\}/g, fileName)
		.replace(/\$\{fileNameWithoutExt\}/g, fileNameWithoutExt)
		.replace(/\$\{author\}/g, author)
		.replace(/\$\{university\}/g, university)
		.replace(/\$\{email\}/g, email)
		.replace(/\$\{datetime\}/g, datetime)
		.replace(/\$\{date\}/g, date)
		.replace(/\$\{dateISO\}/g, dateISO)
		.replace(/\$\{year\}/g, String(year))
		.replace(/\$\{month\}/g, month)
		.replace(/\$\{day\}/g, day);
}

// 默认模板：当用户没有自定义时使用
function getDefaultTemplates(): { [key: string]: string } {
	return {
		// Python
		'.py': '# -*- coding: utf-8 -*-\n"""\nFile:        ${fileName}\nDescription: \n             \nCreated on:  ${datetime}\nAuthor:      ${author}\nUniversity:  ${university}\nEmail:       ${email}\n"""\n',
		
		// C/C++
		'.c': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		'.cpp': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		'.h': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		'.hpp': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		
		// TypeScript / JavaScript
		'.ts': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		'.tsx': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		'.js': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		'.jsx': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		
		// Java
		'.java': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		
		// Go
		'.go': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		
		// Rust
		'.rs': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		
		// MATLAB
		'.m': '%======================================================================\n% File:        ${fileName}\n% Description: \n%              \n% Created on:  ${datetime}\n% Author:      ${author}\n% University:  ${university}\n% Email:       ${email}\n%======================================================================\n',
		
		// Fortran
		'.f': '!======================================================================\n! File:        ${fileName}\n! Description: \n!              \n! Created on:  ${datetime}\n! Author:      ${author}\n! University:  ${university}\n! Email:       ${email}\n!======================================================================\n',
		'.f90': '!======================================================================\n! File:        ${fileName}\n! Description: \n!              \n! Created on:  ${datetime}\n! Author:      ${author}\n! University:  ${university}\n! Email:       ${email}\n!======================================================================\n',
		'.f95': '!======================================================================\n! File:        ${fileName}\n! Description: \n!              \n! Created on:  ${datetime}\n! Author:      ${author}\n! University:  ${university}\n! Email:       ${email}\n!======================================================================\n',
		'.for': '!======================================================================\n! File:        ${fileName}\n! Description: \n!              \n! Created on:  ${datetime}\n! Author:      ${author}\n! University:  ${university}\n! Email:       ${email}\n!======================================================================\n',
		
		// CSS
		'.css': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		'.scss': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		'.less': '/**\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n */\n',
		
		// HTML
		'.html': '<!--\n * @file ${fileName}\n * @brief \n *        \n * @date  ${datetime}\n * @author ${author}\n * @org   ${university}\n -->\n',
		
		// Markdown (保持原有格式)
		'.md': '---\ntitle: ${fileNameWithoutExt}\ndate: ${dateISO}\nauthor: ${author}\n---\n',
	};
}

// 模板配置：根据文件扩展名返回对应的模板内容
function getTemplateForFile(extension: string, fileName: string, author: string, university: string, email: string, customTemplates: { [key: string]: string }): string | null {
	const ext = extension.toLowerCase();
	
	// 优先使用用户自定义的模板
	let template = customTemplates[ext];
	
	// 如果用户没有自定义，使用默认模板
	if (!template) {
		const defaultTemplates = getDefaultTemplates();
		template = defaultTemplates[ext];
	}
	
	// 如果都没有，返回 null
	if (!template) {
		return null;
	}
	
	// 替换所有变量
	return replaceTemplateVariables(template, fileName, author, university, email);
}

// 检查文件是否为空（新创建的文件通常是空的）
async function isEmptyFile(uri: vscode.Uri): Promise<boolean> {
	try {
		const document = await vscode.workspace.openTextDocument(uri);
		const content = document.getText().trim();
		return content.length === 0;
	} catch (error) {
		return false;
	}
}

// 在文件开头插入模板内容
async function insertTemplate(uri: vscode.Uri, template: string) {
	try {
		const document = await vscode.workspace.openTextDocument(uri);
		const edit = new vscode.WorkspaceEdit();
		
		// 在文件开头插入模板，如果文件已有内容，则在开头插入模板并添加一个空行
		const position = new vscode.Position(0, 0);
		const content = document.getText();
		const insertText = content.length === 0 ? template : template + '\n\n';
		
		edit.insert(uri, position, insertText);
		
		await vscode.workspace.applyEdit(edit);
		
		// 保存文件
		await document.save();
	} catch (error) {
		console.error('插入模板失败:', error);
	}
}

export function activate(context: vscode.ExtensionContext) {
	console.log('auto-header-template 扩展已激活！');

	// 监听文件创建事件
	const fileWatcher = vscode.workspace.onDidCreateFiles(async (event) => {
		const config = getConfig();
		
		// 如果扩展被禁用，直接返回
		if (!config.enabled) {
			return;
		}

		for (const file of event.files) {
			const extension = path.extname(file.fsPath);
			const fileName = path.basename(file.fsPath);
			
			// 如果没有扩展名或者不在模板列表中，跳过
			if (!extension) {
				continue;
			}

			// 获取对应的模板
			const template = getTemplateForFile(extension, fileName, config.author, config.university, config.email, config.templates);
			
			if (template) {
				// 稍微延迟一下，确保文件已经创建完成
				setTimeout(async () => {
					// 检查文件是否为空（新创建的文件）
					if (await isEmptyFile(file)) {
						await insertTemplate(file, template);
					}
				}, 100);
			}
		}
	});

	context.subscriptions.push(fileWatcher);
}

export function deactivate() {}
