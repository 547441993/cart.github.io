import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartProducts } from '../states';
import { Col, Row, Image, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface ProductListProps {
  list: NProduct.TProductData[][];
}

const ProductList: React.FC<ProductListProps> = ({ list }) => {
  if (!Array.isArray(list)) {
    return null;
  }

  const [, addCartData] = useRecoilState(cartProducts('add'));

  const onAddData = useCallback((item: any) => {
    addCartData(item);
  }, []);

  return (
    <React.Fragment>
      <div className="cardContent">
        {list.map((products, index) => {
          return (
            <Row key={`${products.length}_${index}`}>
              {products.map((item) => {
                return (
                  <Col span={6} key={item.id}>
                    <div className="cardBox">
                      <div className="card-item">
                        <Image height="300px" width="100%" src={item.image} preview={false} />
                        <div className="card_item-title">{item.name}</div>
                        <div className="card_item-price">￥{item.price}</div>
                        <Button
                          type="primary"
                          icon={<ShoppingCartOutlined />}
                          onClick={() => onAddData(item)}
                        >
                          加入购物车
                        </Button>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ProductList;
