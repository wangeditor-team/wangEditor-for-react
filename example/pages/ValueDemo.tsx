/**
 * @description value demo
 * @author wangfupeng
 */

import React, { useState, useEffect } from 'react'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '../../src/index'

function Basic() {
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    const [html, setHtml] = useState('<p>hello</p>')

    useEffect(() => {
        // 模拟 ajax 异步设置 value
        setTimeout(() => {
            setHtml('<p>hello&nbsp;world</p>') 
        }, 1500)
    }, [])

    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
        // 其他配置...
        readOnly: true, // 只读配置
    }

    const toolbarConfig = {
        // 工具栏配置
    }

    useEffect(() => {
        // 组件销毁时，销毁 editor
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <React.Fragment>
            {/* data-testid 用于单元测试 */}
            <div data-testid="editor-container" style={{ border: '1px solid #ccc' }}>
                {/* 渲染 toolbar */}
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    style={{ borderBottom: '1px solid #ccc' }}
                />

                {/* 渲染 editor */}
                <Editor
                    defaultConfig={editorConfig}
                    onCreated={setEditor}
                    value={html}
                    onChange={editor => setHtml(editor.getHtml())}
                    style={{ height: '500px' }}
                />
            </div>
            <div>
                <textarea
                    value={html}
                    onChange={e => setHtml(e.target.value)}
                    style={{ width: '100%', height: '150px' }}
                ></textarea>
            </div>
        </React.Fragment>
    )
}

export default Basic
 