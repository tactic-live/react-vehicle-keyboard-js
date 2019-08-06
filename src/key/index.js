import React from 'react'
import PropTypes from 'prop-types';

// require('./style.less');

const Key = ({
  onClick,
  type,
  value,
  disabled,
  keyCode,
  className
}) => {
  /**
   * 获取类名
   */
  const getClassName = () => {
    let className = '';
    switch (type) {
      case 2:
        className = 'btnClose';
        break;
      case 3:
        className = 'btnConfirm';
        break;
      default:
        className = '';
    }
    if (disabled) {
      className += ' disabled';
    }
    return className;
  }

  /**
   * 点击键
   */
  const clickKey = (e) => {
    if (disabled) {
      return;
    }
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
      className={`key ${getClassName()} ${className}`}
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
  className: ''
}

Key.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.number,
  keyCode: PropTypes.number,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

export default Key;