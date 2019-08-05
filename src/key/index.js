import React from 'react'

// require('./style.less');

const Key = ({
  btnClick,
  type,
  value,
  disabled,
  cls
}) => {

  const getClassName = () => {
    let cls = '';
    switch (type) {
      case '1':
        cls = 'btnKey';
        break;
      case '2':
        cls = 'btnClose';
        break;
      case '3':
        cls = 'btnOk';
        break;
      default:
        cls = '';
    }
    if (disabled) cls += ' disabled';
    return cls;
  }

  const onClick = (e) => {
    let params = {};
    if (type !== 1) {
      params = {
        keyCode: type === 2 ? 8 : 13,
        value: type === 2 ? '删除' : '确定'
      };
    } else {
      params = {
        keyCode: value.charCodeAt(0),
        value
      };
    }
    btnClick && btnClick({ e, params });
  }

  return (
    <button
      className={`key ${getClassName()} ${cls}`}
      onClick={onClick}
    >
      {value}
    </button>
  )
};

Key.defaultProps = {
  // 点击事件
  btnClick: () => { },
  // 按钮类型 1:输入键 2:删除 3:确定
  type: 1,
  // 值
  value: '',
  // 禁用状态
  disabled: false,
  // 自定义类名
  cls: ''
}

export default Key;