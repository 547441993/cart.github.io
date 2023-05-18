import dayjs, { ManipulateType } from 'dayjs';

/**
 * 解析时间字符串
 * @param str 时间字符串
 * @returns
 */
function anlyDate(str: string) {
  const matched = str.match(/^(\d+)(d|w|M|y|h|m|s|(ms))$/);
  if (matched) {
    return dayjs().add(Number(matched[1]), matched[2] as ManipulateType);
  }
  return null;
}

/**
 * 设置值
 * @param key 要设置的key
 * @param value 要设置的value
 * @param expire 设置的有效时间 例如：1d:一天、1w:一周、1M:一月、1y:一年、1h:一小时、1m:一分钟、1s:一秒
 * @param storage 要使用sessionStorage还是localStorage默认采用sessionStorage
 */
export const setLS = (
  key: string,
  value: any,
  expire?: string,
  storage: Storage = sessionStorage
) => {
  const expireDate = anlyDate(expire || '');
  if (expireDate) {
    storage.setItem(key, JSON.stringify({ expire: expireDate, value }));
  } else {
    storage.setItem(key, JSON.stringify(value));
  }
};

/**
 * 根据指定key获取对应的值，如果不存在或者超过有效期返回空字符串
 * @param key 要获取的key
 * @param storage 要使用sessionStorage还是localStorage默认采用sessionStorage
 * @returns
 */
export const getLS = (key: string, storage: Storage = sessionStorage) => {
  try {
    const storageValue = storage.getItem(key);
    if (!storageValue) {
      return storageValue;
    }
    const getData = JSON.parse(storageValue);
    if (typeof getData === 'object') {
      if (getData.expire) {
        // 存在有效期
        if (dayjs().isBefore(dayjs(getData.expire))) {
          return getData.value;
        }
        return '';
      }
      return getData;
    }
    return getData;
  } catch (error) {
    return storage.getItem(key) || null;
  }
};
