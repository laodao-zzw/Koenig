/*
 * @Author: zhuziwei
 * @Date: 2024-12-09 10:54:30
 * @Last Modified by: zhuziwei
 * @Last Modified time: Do not edit
 */
import '../styles/index.css';
import KoenigComposableEditor from './KoenigComposableEditor';
import React from 'react';
import {AllDefaultPlugins} from '../plugins/AllDefaultPlugins';
import {SharedHistoryContext} from '../context/SharedHistoryContext';
import {SharedOnChangeContext} from '../context/SharedOnChangeContext';

// 这个组件是用来创建一个可编辑的文本区域，并添加一些默认的插件。
const KoenigEditor = ({
    onChange,
    children,
    ...props
}) => {
    return (
        <SharedHistoryContext>
            <SharedOnChangeContext onChange={onChange}>
                <KoenigComposableEditor {...props}>
                    <AllDefaultPlugins />
                    {children}
                </KoenigComposableEditor>
            </SharedOnChangeContext>
        </SharedHistoryContext>
    );
};

export default KoenigEditor;
