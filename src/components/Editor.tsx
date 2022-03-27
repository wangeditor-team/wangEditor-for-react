/**
 * @description editor react component
 * @author wangfupeng
 */

import React, { useRef, useEffect, useState } from 'react'
import {SlateDescendant, IEditorConfig, createEditor, IDomEditor } from '@wangeditor/editor'

interface IProps {
  defaultContent?: SlateDescendant[]
  defaultHtml?: string
  defaultConfig: Partial<IEditorConfig>
  mode?: string
  style?: React.CSSProperties
}

function EditorComponent(props: Partial<IProps>) {
  const { defaultContent = [], defaultHtml = '', defaultConfig = {}, mode = 'default', style = {} } = props
  const ref = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  
  const handleDestroyed = (editor: IDomEditor) => {
    const { onDestroyed } = defaultConfig
    setEditor(null)
    if(onDestroyed) {
      onDestroyed(editor)
    }
  }
  

  useEffect(() => {
    if (ref.current == null) return
    if (editor != null) return

    const newEditor = createEditor({
      selector: ref.current,
      config: {
        ...defaultConfig,
        onDestroyed: handleDestroyed,
      },
      content: defaultContent,
      html: defaultHtml,
      mode,
    })
    setEditor(newEditor)
  }, [editor])

  return <div style={style} ref={ref}></div>
}

export default EditorComponent
