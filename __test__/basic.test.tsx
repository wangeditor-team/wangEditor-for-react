/**
 * @description react component test
 * @author wangfupeng
 */

// react 单元测试暂时注释掉（ 20210929 wangfupeng），因为：
// 1. 单元测试是在根目录执行的，使用根目录的 tsconfig.json
// 2. 其他的 pkg tsconfig.json 配置都是 "jsxFactory": "jsx"
// 3. 只有 react pkg 的配置是 "jsxFactory": "React.createElement" 。目前没有找到好的解决方案，先注释掉～

import React from 'react'
import { render, cleanup, waitFor } from '@testing-library/react'
import BasicInHooks from '../example/pages/BasicInHooks'
import SimpleInHooks from '../example/pages/SimpleInHooks'
import BasicInClass from '../example/pages/BasicInClass'

describe('React editor component', () => {
  afterEach(cleanup)

  it('basic editor in class component', async () => {
    const { getByTestId } = render(<BasicInClass />)
    const editorContainerElem = await waitFor(() => getByTestId('editor-container'))

    const toolbar = editorContainerElem.querySelectorAll('div[data-w-e-toolbar]')[0]
    expect(toolbar).toBeTruthy()
    const editor = editorContainerElem.querySelectorAll('div[data-w-e-textarea]')[0]
    expect(editor).toBeTruthy()
  })

  it('basic editor in Hooks', async () => {
    const { getByTestId } = render(<BasicInHooks />)
    const editorContainerElem = await waitFor(() => getByTestId('editor-container'))

    const toolbar = editorContainerElem.querySelectorAll('div[data-w-e-toolbar]')[0]
    expect(toolbar).toBeTruthy()
    const editor = editorContainerElem.querySelectorAll('div[data-w-e-textarea]')[0]
    expect(editor).toBeTruthy()
  })

  it('simple editor in Hooks', async () => {
    const { getByTestId } = render(<SimpleInHooks />)
    const editorContainerElem = await waitFor(() => getByTestId('editor-container'))

    const toolbar = editorContainerElem.querySelectorAll('div[data-w-e-toolbar]')[0]
    expect(toolbar).toBeTruthy()
    const editor = editorContainerElem.querySelectorAll('div[data-w-e-textarea]')[0]
    expect(editor).toBeTruthy()
  })
})