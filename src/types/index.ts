/** 商品 */
declare namespace NProduct {
  /** 商品数据 */
  type TProductData = {
    id: string;
    image: string;
    name: string;
    price: number;
    size: string;
  };
  /** 购物车 */
  type TCartData = TProductData & TCartCount;

  type TCartCount = {
    number: number;
  };

  type TCartFilter = {
    priceSort: 'desc' | 'ase';
    size: string[];
  };

  type TCartAction = 'delete' | 'add' | 'reduce' | 'plus' | 'clear';
}
