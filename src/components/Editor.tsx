/**
 * @description editor react component
 * @author wangfupeng
 */

import React, { useRef, useEffect, useState } from 'react'
import { SlateDescendant, IEditorConfig, createEditor, IDomEditor } from '@wangeditor/editor'

interface IProps extends Omit<Partial<IEditorConfig>, "customAlert" | "decorate" | "customPaste" | "hoverbarKeys" | "EXTEND_CONF" | "MENU_CONF"> {
  defaultContent?: SlateDescendant[]
  defaultHtml?: string
  value?: string
  defaultConfig: Partial<IEditorConfig>
  mode?: string
  style?: React.CSSProperties
}

function EditorComponent(props: Partial<IProps>) {
  // 通过props传递时
  // readOnly/autoFocus/maxLength/scroll/配置的优先级比defaultConfig中高
  const {
    defaultContent = [],
    onCreated,
    defaultHtml = '',
    value = '',
    readOnly,
    autoFocus,
    scroll,
    maxLength,
    onChange,
    onBlur,
    onFocus,
    onMaxLength,
    onDestroyed,
    placeholder,
    defaultConfig = {},
    mode = 'default',
    style = {}
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [curValue, setCurValue] = useState('')

  const handleCreated = (editor: IDomEditor) => {
    const { onCreated: onCreatedFromConfig } = defaultConfig
    // 组件属性优先
    if (onCreated) {
      // 组件属性 onCreated
      onCreated(editor)
    } else if (onCreatedFromConfig) {
      // 编辑器 配置 onCreated
      onCreatedFromConfig(editor)
    }
  }

  const handleChanged = (editor: IDomEditor) => {
    setCurValue(editor.getHtml()) // 记录当前 html 值
    const { onChange: onChangeFromConfig } = defaultConfig

    // 组件属性 onChange
    if (onChange) {
      onChange(editor)
    } else if (onChangeFromConfig) {
      // 编辑器 配置 onChange
      onChangeFromConfig(editor)
    }
  }

  const handleDestroyed = (editor: IDomEditor) => {
    const { onDestroyed: onDestroyedFromConfig } = defaultConfig
    setEditor(null)
    if (onDestroyed) {
      onDestroyed(editor)
    } else if (onDestroyedFromConfig) {
      onDestroyedFromConfig(editor)
    }
  }

  const handleBlur = (editor: IDomEditor) => {
    const { onBlur: onBlurFromConfig } = defaultConfig
    if (onBlur) {
      onBlur(editor)
    } else if (onBlurFromConfig) {
      // 来自defaultConfig属性 onBlur
      onBlurFromConfig(editor)
    }
  }

  const handleFocus = (editor: IDomEditor) => {
    const { onFocus: onFocusFromConfig } = defaultConfig
    if (onFocus) {
      onFocus(editor)
    } else if (onFocusFromConfig) {
      // 来自defaultConfig属性 onFocus
      onFocusFromConfig(editor)
    }
  }

  const handleMaxLength = (editor: IDomEditor) => {
    const { onMaxLength: onMaxLengthFromConfig } = defaultConfig
    if (onMaxLength) {
      onMaxLength(editor)
    } else if (onMaxLengthFromConfig) {
      // 来自defaultConfig属性 onMaxLength
      onMaxLengthFromConfig(editor)
    }
  }

  // value 变化，重置 HTML
  useEffect(() => {
    if (editor == null) return

    if (value === curValue) return // 如果和当前 html 值相等，则忽略

    // ------ 重新设置 HTML ------
    editor.setHtml(value)

  }, [value])

  useEffect(() => {
    if (ref.current == null) return
    if (editor != null) return
    // 防止重复渲染 当编辑器已经创建就不在创建了
    if (ref.current?.getAttribute('data-w-e-textarea')) return

    // 编辑器配置
    const editorConfig = {
      ...defaultConfig,
      placeholder: placeholder ? placeholder : defaultConfig.placeholder,
      readOnly: readOnly ? readOnly : defaultConfig.readOnly,
      autoFocus: autoFocus ? autoFocus : defaultConfig.autoFocus,
      scroll: scroll ? scroll : defaultConfig.scroll,
      maxLength: maxLength ? maxLength : defaultConfig.maxLength,
      onCreated: handleCreated,
      onChange: handleChanged,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onMaxLength: handleMaxLength,
      onDestroyed: handleDestroyed,
    }
    
    // 清除未设置的编辑器配置
    for(let config in editorConfig) {
      if (!editorConfig[config]) delete editorConfig[config]
    }

    const newEditor = createEditor({
      selector: ref.current,
      config: editorConfig,
      content: defaultContent,
      html: defaultHtml || value,
      mode,
    })
    setEditor(newEditor)
  }, [editor])

  return <div style={style} ref={ref}></div>
}

export default EditorComponent
