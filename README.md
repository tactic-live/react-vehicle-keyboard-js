# react-vehicle-keyboard

react-vehicle-keyboard是一个用于移动端输入车牌号的键盘组件

## Feature
* support h5

## install

## Getting started
### npm
```bash
npm install react-vehicle-keyboard --save
```

### yarn
```bash
yarn add react-vehicle-keyboard
```

### Props
Name|Type|Default|Description
-|-|-|-
show|Boolean|false|是否显示键盘
type|Number|1|显示键盘的类型 1:省缩写键盘 2:字母和数字键盘
disabledKyes|Array||不可用的键
handleSelectKey|Function||点击键的事件回调

## Usage
```bash
import Keyboard from 'react-vehicle-keyboard';
require('react-vehicle-keyboard/react-vehicle-keyboard.css')

...
  <Keyboard
    show={showKeyboard}
    type={keyboardType}
    disabledKyes={disabledKeys}
    handleSelectKey={this.keyboardClick}
  />
...
```

## Change Log

### 1.0.1
change license to MIT