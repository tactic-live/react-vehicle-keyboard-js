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

  const getKeys = (vals = []) => {
    const result = {
      operateKeys: [],
      keys: []
    };

    vals.forEach((value) => {
      const props = { value, btnClick: onClick };
      if (disabledKeys.length > 0 && (disabledKeys.includes(value) || disabledKeys.includes(parseInt(value, 10)))) {
        Object.assign(props, { disabled: 1 });
      }
      if (keyClassName.length > 0 && keyClassName.find(item => item.key === value)) {
        const item = keyClassName.find(item => item.key === value);
        console.log('keyClassName-item', item);
        Object.assign(props, { cls: item.className });
      }
      if (value === '删除') {
        Object.assign(props, {
          keyCode: 8,
          key: 8,
          type: 2
        });
        result.operateKeys.push(<Key {...props} />);
      } else if (value === '确定') {
        Object.assign(props, {
          keyCode: 13,
          key: 13,
          type: 3
        });
        result.operateKeys.push(<Key {...props} />);
      } else {
        const props = {
          keyCode,
          key: keyCode
        };
        result.keys.push(<Key {...props} />);
      }
    });
    console.log('result', result);
    return result;
  }

  const vals = type === 1 ? [...carTxt] : [...numTxt];
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
          // vals.map((value, index) => {
          //   // const key = `key_${index}`;
          //   const keyCode = value.charCodeAt(0);
          //   const props = {
          //     value,
          //     keyCode,
          //     key: keyCode
          //   };
          //   if (keyClassName && keyClassName.length > 0) {
          //     const item = keyClassName.find(v => v.key === value);
          //     if (item) Object.assign(props, { cls: item.className });
          //   }

          //   if (disabledKeys.length > 0 && (disabledKeys.includes(value) || disabledKeys.includes(parseInt(value, 10)))) {
          //     Object.assign(props, { disabled: 1 });
          //     // return (<Key cls={keyCls} key={key} value={value} disabled="true" />);
          //     return (<Key {...props} />);
          //   }
          //   Object.assign(props, { btnClick });
          //   // return (<Key cls={keyCls} key={key} value={value} btnClick={onClick} />);
          //   return (<Key {...props} />);
          // })
        }
        <div className="btns-container">
          {
            operateKeys
            //   <Key cls={confirmKeyCls} value={!confirmKeyCls && "确定"} btnClick={onClick} type="3" />
            // <Key cls={deleteKeyCls} value={!deleteKeyCls && "删除"} btnClick={onClick} type="2" />
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
  keyClassName: [
    // {
    // 键
    // key: '',
    // className: '',
    // }
  ]
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

