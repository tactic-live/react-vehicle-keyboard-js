import React from 'react';
import PropTypes from 'prop-types';
import Key from './key';
import Util from './util';

// import './style.less';

const VehicleKeyboard = ({
  onClick,
  show,
  type,
  carTxt,
  numTxt,
  disabledKeys,
  keyClassName
}) => {
  const getClassName = () => {
    let cls = 'vehicle-keyboard';
    if (Util.iPhoneX) cls += ' iphone-x';
    if (show) {
      cls += ' show';
    }
    return cls;
  };

  const getDeleteKey = (props) => {
    const keyProps = Object.assign({}, props, { keyCode: 8, key: 8, type: 2 })
    if (props.cls) {
      Object.assign(keyProps, {
        value: ''
      });
    }
    Object.assign(keyProps, { cls: `key_${keyProps.keyCode} ${props.cls} ` })
    return <Key {...keyProps} />;
  }

  const getConfirmKey = (props = {}) => {
    const keyProps = Object.assign({}, props, { keyCode: 13, key: 13, type: 3 })
    if (props.cls) {
      Object.assign(keyProps, {
        value: ''
      });
    }
    Object.assign(keyProps, { cls: `key_${keyProps.keyCode} ${props.cls} ` })
    return <Key {...keyProps} />;
  }

  const getKey = (props = {}) => {
    const keyCode = props.value.charCodeAt(0);
    const keyProps = Object.assign({}, props, { keyCode, key: keyCode })
    Object.assign(keyProps, { cls: `key_${keyProps.keyCode} ${props.cls} ` })
    return <Key {...keyProps} />;
  }

  const getKeys = (vals = []) => {
    const result = {
      operateKeys: [],
      keys: []
    };

    vals.forEach((value) => {
      const props = { value, onClick: onClick };
      if (disabledKeys.length > 0 && (disabledKeys.includes(value) || disabledKeys.includes(parseInt(value, 10)))) {
        Object.assign(props, { disabled: true });
      }
      if (keyClassName.length > 0 && keyClassName.find(item => item.key === value)) {
        const item = keyClassName.find(item => item.key === value);
        Object.assign(props, { cls: item.className });
      }
      if (value === '删除') {
        result.operateKeys.push(getDeleteKey(props));
      } else if (value === '确定') {
        result.operateKeys.push(getConfirmKey(props));
      } else {
        result.keys.push(getKey(props));
      }
    });

    return result;
  }

  let vals = type === 1 ? [...carTxt] : [...numTxt];
  vals = [...vals, '删除', '确定'];
  const { operateKeys, keys } = getKeys(vals);
  return (
    <div
      className={getClassName()}
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
      }}
    >
      <div className="content">
        {
          keys
        }
        <div className="btns-container">
          {
            operateKeys
          }
        </div>
      </div>
    </div>
  );
}

VehicleKeyboard.defaultProps = {
  // 点击
  onClick: () => { },
  // 显示 false:隐藏 true:显示
  show: false,
  // 键盘类型  1:省 2:数字和字母
  type: 1,
  // 省缩写
  carTxt: [
    '京', '津', '沪', '渝', '苏', '浙', '豫', '粤', '川', '陕',
    '冀', '辽', '吉', '皖', '闽', '鄂', '湘', '鲁', '晋', '黑',
    '赣', '贵', '甘', '桂', '琼', '云', '青', '蒙', '藏', '宁',
    '新'],
  // 数字和字母
  numTxt: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K',
    'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z'],
  // 不可用的键
  disabledKeys: [],
  // 自定义键样式类
  keyClassName: []
};

VehicleKeyboard.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool,
  type: PropTypes.number,
  carTxt: PropTypes.array,
  numTxt: PropTypes.array,
  disabledKeys: PropTypes.array,
  keyClassName: PropTypes.array
}

export default VehicleKeyboard;

