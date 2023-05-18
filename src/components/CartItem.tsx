import React from 'react';
import { Image, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { cartProducts } from '@/states';

interface CartItemProps {
  data: any;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const { data } = props;

  const [, deleteProducts] = useRecoilState(cartProducts('delete'));
  const [, plusProducts] = useRecoilState(cartProducts('plus'));
  const [, reduceProducts] = useRecoilState(cartProducts('reduce'));

  return (
    <div className="cart-item">
      <Image src={data.image} width={120} height={130} alt={data.name} preview={false} />
      <div className="cart-item-content">
        <div>
          <p>{data.name}</p>
        </div>
        <div>
          <p className="cart-item-price">{`¥ ${data.price}`}</p>
          <div className="card-item-operate">
            <Button type="text" onClick={() => reduceProducts(data)}>
              -
            </Button>
            <span className="card-item-number">{data.number}</span>
            <Button type="text" onClick={() => plusProducts(data)}>
              +
            </Button>
          </div>
        </div>
      </div>
      <Button type="text" className="cart-item-close" onClick={() => deleteProducts(data)}>
        <CloseOutlined />
      </Button>
    </div>
  );
};

export default CartItem;
