import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Layout, Col, Row, Typography, Drawer, notification } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';

import ProductList from '@/components/ProductList';
import CartList from '@/components/CartList';
import CartMenu from '@/components/CartMenu';
import Loading from '@/components/Loading';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import { cartCount } from '@/states';

function Cart() {
  const [list, setList] = useState<NProduct.TProductData[][]>([]);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<NProduct.TCartFilter>({
    size: [],
    priceSort: 'desc'
  });
  const count = useRecoilValue(cartCount);

  function fetchData() {
    setLoading(true);
    axios
      .get('https://www.fastmock.site/mock/c1d43576c70cc39c290d7a20654260e7/api/fetchCartInfo')
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setList(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onChangeSize = useCallback((sizes: string[]) => {
    setFilter((filter) => {
      return {
        ...filter,
        size: sizes
      };
    });
  }, []);

  const sortList = useCallback(
    (list: NProduct.TProductData[]) => {
      return list.sort(function (a, b) {
        if (filter.priceSort === 'desc') {
          return a.price > b.price ? 1 : -1;
        } else {
          return a.price < b.price ? 1 : -1;
        }
      });
    },
    [filter]
  );

  const arrangeData = useCallback((sortData: NProduct.TProductData[]) => {
    const _data: NProduct.TProductData[][] = [];
    let j = -1;
    for (let i = 0; i < sortData.length; i++) {
      if (i % 4 === 0) {
        j++;
        _data[j] = [];
      }
      _data[j].push(sortData[i]);
    }
    return _data;
  }, []);

  const filterList = useMemo(() => {
    const flattenList = _.flatten(list);
    if (!filter.size.length) {
      return arrangeData(sortList(flattenList));
    }

    const sortData = sortList(flattenList.filter((item) => filter.size.includes(item.size)));
    console.log('sortData', sortData);

    return arrangeData(sortData);
  }, [filter, list]);

  const onChangeSort = (sort: 'desc' | 'ase') => {
    setFilter((filter) => {
      return {
        ...filter,
        priceSort: sort
      };
    });
  };

  return (
    <Layout.Content>
      <Row className="content">
        <Col span={6}>
          <CartMenu onChangeSize={(res) => onChangeSize(res)} onSort={(val) => onChangeSort(val)} />
        </Col>
        <Col span={18}>
          <Typography.Title level={3}>商品</Typography.Title>
          <ProductList list={filterList} />
        </Col>
      </Row>
      <div className="cart-icon-container" onClick={() => setOpen(true)}>
        <ShoppingCartOutlined className="cart-icon" />
        <span className="cart-icon-count">{count}</span>
      </div>

      <Drawer
        placement="right"
        closable={true}
        open={open}
        onClose={() => setOpen(false)}
        width={640}
      >
        <div className="cart-item-list-container">
          <div className="cart-sidebar-title">
            <ShoppingCartOutlined className="cart-icon" />
            <span className="cart-icon-count">{count}</span>
          </div>
          <CartList onClose={() => setOpen(false)} />
        </div>
      </Drawer>
      {isLoading ? <Loading /> : null}
    </Layout.Content>
  );
}

export default Cart;
