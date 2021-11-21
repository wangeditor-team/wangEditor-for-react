/**
 * @description editor react component
 * @author wangfupeng
 */

import React, { useRef, useEffect } from 'react'
import {SlateDescendant, IEditorConfig, createEditor } from '@wangeditor/editor'

interface IProps {
  defaultContent: SlateDescendant[]
  defaultConfig: Partial<IEditorConfig>
  mode?: string
  style?: object
}

function EditorComponent(props: Partial<IProps>) {
  const { defaultContent = [], defaultConfig = {}, mode = 'default', style = {} } = props
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current == null) return

    createEditor({
      selector: ref.current,
      config: defaultConfig,
      content: defaultContent,
      mode,
    })
  }, [])

  return <div style={style} ref={ref}></div>
}

export default EditorComponent
