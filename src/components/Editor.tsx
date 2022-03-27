/**
 * @description editor react component
 * @author wangfupeng
 */

import React, { useRef, useEffect } from 'react'
import {SlateDescendant, IEditorConfig, createEditor, IDomEditor } from '@wangeditor/editor'

interface IProps {
  defaultContent?: SlateDescendant[]
  defaultHtml?: string
  defaultConfig: Partial<IEditorConfig>
  mode?: string
  style?: object
  editor?: IDomEditor | null
}

function EditorComponent(props: Partial<IProps>) {
  const {editor, defaultContent = [], defaultHtml = '', defaultConfig = {}, mode = 'default', style = {} } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current == null) return
    if (editor == null)
    createEditor({
      selector: ref.current,
      config: defaultConfig,
      content: defaultContent,
      html: defaultHtml,
      mode,
    })
  }, [editor])

  return <div style={style} ref={ref}></div>
}

export default EditorComponent
