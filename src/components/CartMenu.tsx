import React, { useCallback, useState } from 'react';
import { Button, Typography, Radio, RadioChangeEvent } from 'antd';
import { SIZES } from '@/constants';

interface CartMenuProps {
  onChangeSize: (size: string[]) => void;
  onSort: (sortBy: 'desc' | 'ase') => void;
}

const options = [
  { label: '降序', value: 'desc' },
  { label: '升序', value: 'ase' }
];

function CartMenu(props: CartMenuProps) {
  const { onChangeSize, onSort } = props;

  const [priceSort, setPriceSort] = useState('desc');

  const onFilterSizes = useCallback((k: string) => {
    const filters = document.querySelectorAll('.filter_button')!;
    const filterItem: string[] = [];
    filters.forEach((item) => {
      const text = item.querySelector('span')!;
      if (k === text.innerHTML) {
        !item.classList.contains('active_button')
          ? item.classList.add('active_button')
          : item.classList.remove('active_button');
      }
      if (item.classList.contains('active_button')) {
        filterItem.push(text.innerHTML);
      }
    });

    onChangeSize(filterItem);
  }, []);

  const onPriceSort = useCallback((target: RadioChangeEvent) => {
    const {
      target: { value }
    } = target;
    setPriceSort(value);
    onSort(value);
  }, []);

  return (
    <div className="cart-menu">
      <div>
        <Typography.Title level={3}>尺码:</Typography.Title>
        <div className="cart-size-button-group">
          {SIZES.map((item) => {
            return (
              <Button className="filter_button" key={item} onClick={() => onFilterSizes(item)}>
                {item}
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <Typography.Title level={3}>价格:</Typography.Title>
        <Radio.Group
          options={options}
          onChange={(target) => onPriceSort(target)}
          value={priceSort}
          optionType="button"
        />
      </div>
    </div>
  );
}

export default CartMenu;
