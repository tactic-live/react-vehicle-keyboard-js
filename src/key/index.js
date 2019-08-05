import React from 'react'
import PropTypes from 'prop-types';

// require('./style.less');

const Key = ({
  onClick,
  type,
  value,
  disabled,
  keyCode,
  cls
}) => {

  const getClassName = () => {
    let cls = '';
    switch (type) {
      case 2:
        cls = 'btnClose';
        break;
      case 3:
        cls = 'btnConfirm';
        break;
      default:
        cls = '';
    }
    if (disabled) cls += ' disabled';
    return cls;
  }

  const clickKey = (e) => {
    let params = { keyCode };
    if (type !== 1) {
      Object.assign(params, { value: type === 2 ? '删除' : '确定' })
    } else {
      Object.assign(params, { value });
    }
    onClick && onClick({ e, params });
  }

  return (
    <button
      className={`key ${getClassName()} ${cls}`}
      onClick={clickKey}
    >
      {value}
    </button>
  )
};

Key.defaultProps = {
  // 点击事件
  onClick: () => { },
  // 按钮类型 1:输入键 2:删除 3:确定
  type: 1,
  // keyCode
  keyCode: null,
  // 值
  value: '',
  // 禁用状态
  disabled: false,
  // 自定义类名
  cls: ''
}

Key.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.number,
  keyCode: PropTypes.number,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  cls: PropTypes.string
}

export default Key;