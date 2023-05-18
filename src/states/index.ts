import { atom, selector, selectorFamily } from 'recoil';
import { setLS, getLS } from '@/utils';
import _ from 'lodash';

function onlyOneData(arr: any[], name: string) {
  if (!(arr.constructor === Array && name)) {
    return;
  }
  const obj = {};
  const _arr: any[] = [];
  arr.forEach((item) => {
    const k = _.cloneDeep(item);
    let _item = obj[k[name]];
    if (!obj[k[name]]) {
      obj[k[name]] = true;
      k.number = 1;
      _arr.push(k);
    } else {
      const _index = _arr.findIndex((v) => v.id === k[name]);
      if (_index > -1) {
        _arr[_index].number++;
      }
    }
  });

  return _arr;
}

export const cartProductsData = atom<NProduct.TCartData[]>({
  key: 'cart-products-data',
  default: getLS('CART_DATA') || []
});

export const cartProducts = selectorFamily<any, NProduct.TCartAction>({
  key: 'cart-products',
  get:
    () =>
    ({ get }) => {
      return get(cartProductsData);
    },

  set:
    (action: NProduct.TCartAction) =>
    ({ get, set }, data) => {
      const products = get(cartProductsData);
      let result = _.cloneDeep(products);
      if (action === 'add') {
        result = onlyOneData(products.concat(data), 'id')!;
        set(cartProductsData, result || []);
        setLS('CART_DATA', result);
      } else if (action === 'delete') {
        const index = products.findIndex((item) => item.id === data.id);
        result.splice(index, 1);
        set(cartProductsData, result || []);
        setLS('CART_DATA', result);
      } else if (action === 'plus') {
        const index = products.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          result[index].number++;
        }
      } else if (action === 'reduce') {
        const index = products.findIndex((item) => item.id === data.id);
        if (index !== -1 && result[index].number > 1) {
          result[index].number--;
        }
      } else {
        result = [];
      }

      set(cartProductsData, result || []);
      setLS('CART_DATA', result);
    }
});

export const cartCount = selector({
  key: 'cart-count',
  get: ({ get }) => {
    const products = get(cartProductsData);
    return products.length;
  }
});
