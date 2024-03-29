# react-vehicle-keyboard

react-vehicle-keyboard是一个用于移动端输入车牌号的键盘组件


+ [Features](#features)
+ [Installation](#installation)
  + [npm](#npm)
  + [yarn](#yarn)
+ [Peer dependencies](#peer-dependencies)
+ [Props](#props)
+ [Usage](#usage)
+ [Change log](#change-log)

## Features
* support h5

## Installation

### npm
```bash
npm install react-vehicle-keyboard --save
```

### yarn
```bash
yarn add react-vehicle-keyboard
```

## Peer dependencies
react-vehicle-keyboard uses React`>=15.0.0`,React DOM `>=15.0.0` as peer dependencies.
### npm
```bash
npm install --save react@15.x.x react-dom@15.x.x
```

### yarn
```bash
yarn add react@15.x.x react-dom@15.x.x
```

## Props
Name|Type|Default|Description
-|-|-|-
show|Boolean|false|是否显示键盘
type|Number|1|显示键盘的类型 1:省缩写 2:字母和数字
disabledKeys|Array ['沪','0',...]||不可用的键
onClick|Function (e,params)=>{}||点击键的事件回调
keyClassName|Array [{key:'沪',className:'key-hu'},...]||自定义键的className
className|String||自定义className

## Usage
```bash
import Keyboard from 'react-vehicle-keyboard';
require('react-vehicle-keyboard/dist/react-vehicle-keyboard.css');

...
  <Keyboard
    show={showKeyboard}
    type={keyboardType}
    disabledKeys={disabledKeys}
    onClick={this.keyboardClick}
    keyClassName={keyClassName}
    className={className}
  />
...
```

## Change log

### 1.0.1
change license to MIT

### 1.0.3
替换关键字

### 1.0.4
增加发布代码

### 1.0.5
增加键的自定义className

### 1.0.6
支持自定义className
