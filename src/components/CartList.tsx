import React, { useCallback, useMemo } from 'react';
import CartItem from './CartItem';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button, notification } from 'antd';
import { cartCount, cartProducts, cartProductsData } from '@/states';

const CartList: React.FC<{ onClose: () => void }> = (props) => {
  const list = useRecoilValue(cartProductsData);
  const [, clearProducts] = useRecoilState(cartProducts('clear'));

  const { onClose } = props;

  const onCheckout = useCallback(() => {
    if (list.length) {
      notification.open({
        message: '结算',
        duration: 1
      });
      clearProducts('');
      onClose();
    } else {
      notification.warning({
        message: '请先加购商品'
      });
    }
  }, []);

  const countPrice = useMemo(() => {
    return list
      .reduce((res, curr) => {
        res += Number(curr.price) * curr.number;
        return res;
      }, 0)
      .toFixed(2);
  }, [list]);

  return (
    <div style={{ width: '100%' }}>
      <div className="cart-item-list">
        {list.length !== 0 &&
          list.map((v, i) => {
            return <CartItem data={v} key={`${v.id}`} />;
          })}
      </div>
      <div className="cart-sidebar-footer">
        <div className="total">
          <span>总价</span>
          <span>¥{countPrice}</span>
        </div>
        <Button onClick={() => onCheckout()} type="primary" block={true}>
          结算
        </Button>
      </div>
    </div>
  );
};

export default CartList;
