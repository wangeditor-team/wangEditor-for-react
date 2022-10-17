/**
 * @description simple demo
 * @author wangfupeng
 */

import React, { useState, useEffect } from 'react'
import { IDomEditor, IEditorConfig } from '@wangeditor/editor'
import { Editor, Toolbar } from '../../src/index'

function Basic() {
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [max, setMax]  = useState(15)

  // ----------------------- editor config -----------------------
  const editorConfig: Partial<IEditorConfig> = {}
  editorConfig.placeholder = '请输入内容...'
  editorConfig.onCreated = (editor: IDomEditor) => {
    setEditor(editor)
  }
  // 继续补充其他配置~

  // ----------------------- editor content -----------------------
  const defaultContent = [
    { type: 'paragraph', children: [{ text: 'Hooks 组件 - 精简模式' }] },
    { type: 'paragraph', children: [{ text: '简化 toolbar 和 hoverbar' }] },
    { type: 'paragraph', children: [{ text: '' }] },
  ]

  // const defaultHtml = '<p>hello&nbsp;<strong>world</strong>&nbsp;1</p><p><br></p>'

  // ----------------------- toolbar config -----------------------
  const toolbarConfig = {
    // 工具栏配置
  }

  // ----------------------- 销毁 editor -----------------------
  useEffect(() => {
    // 组件销毁时，销毁 editor
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  const handleMax = () => {
    console.log(max)
    setMax(max + 1)
  }

  return (
    <React.Fragment>
      {/* data-testid 用于单元测试 */}
      <div data-testid="editor-container" style={{ border: '1px solid #ccc' }}>
        {/* 渲染 toolbar */}
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="simple"
          style={{ borderBottom: '1px solid #ccc' }}
        />

        {/* 渲染 editor */}
        <Editor
          defaultConfig={editorConfig}
          defaultContent={defaultContent}
          // defaultHtml={defaultHtml}
          mode="simple"
          key={max}
          style={{ height: '500px' }}
        />
      </div>
      <button onClick={handleMax}>test</button>
    </React.Fragment>
  )
}

export default Basic
