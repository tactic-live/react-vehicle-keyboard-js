import React from 'react';
import Key from './key';
import Util from './util';

// import './style.less';

const VehicleKeyboard = ({
  onClick,
  show,
  type,
  carTxt,
  numTxt,
  disabledKeys
}) => {
  const getClassName = () => {
    let cls = 'vehicle-keyboard';
    if (Util.iPhoneX) cls += ' iphone-x';
    if (show) {
      cls += ' show';
    }
    return cls;
  };

  const vals = type === 1 ? [...carTxt] : [...numTxt];
  return (
    <div
      className={getClassName()}
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
      }}
    >
      <div className="content">
        {
          vals.map((value, index) => {
            const key = `key_${index}`;
            if (disabledKeys.length > 0 && (disabledKeys.includes(value) || disabledKeys.includes(parseInt(value, 10)))) {
              return (<Key key={key} value={value} disabled="true" />);
            }
            return (<Key key={key} value={value} btnClick={onClick} />);
          })
        }
        <div className="btns-container">
          <Key value="确定" btnClick={onClick} type="3" />
          <Key value="删除" btnClick={onClick} type="2" />
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
  disabledKeys: []
};

export default VehicleKeyboard;

