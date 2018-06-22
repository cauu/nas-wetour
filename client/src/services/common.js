import Nebulas from 'nebulas';
import NebPay from 'nebpay.js';

import { isPC } from '../utils';

const env = process.env.NODE_ENV;

/**
 * @desc testnet or mainnet
 */
const Account = Nebulas.Account;
const net = env === 'development' && 'https://testnet.nebulas.io' || 'https://mainnet.nebulas.io';
const CONTRACT_ADDRESS = 'n1o6mozqvmFkgDS4az3ikhjdyXdiWHcrc9t';
const VALUE = '0';
const NONCE = '0';
const GAS_PRICE = '1000000';
const GAS_LIMIT = '2000000';

const MAX_RETRY = 30;

const neb = new Nebulas.Neb();
const nebPay = new NebPay();

neb.setRequest(new Nebulas.HttpRequest(net));

const nebGet = (callFunc, callArgs) => neb.api.call(
  Account.NewAccount().getAddressString(),
  CONTRACT_ADDRESS,
  VALUE,
  NONCE,
  GAS_PRICE,
  GAS_LIMIT,
  {
    "function": callFunc,
    "args": callArgs
  }
).then((res) => {
  let result = res.result;
  if (result === 'null') {
    return [];
  }
  result = JSON.parse(result);
  return result;
});

/**
 * @desc 根据序列号查询交易是否成功
 */
const _queryInterval = async (serialNumber, cb) => {
  try {
    const res = await nebPay.queryPayInfo(serialNumber);

    const resObj = JSON.parse(res);

    if(resObj.msg === 'success') {
      return resObj.data;
    } else {
      throw new Error();
    }
  } catch(e) {
    return null;
  }
}

/**
 * @desc 获取收据(移动端)
 */
const _queryByHash = async (hash) => {
  const receipt = await neb.api.getTransactionReceipt({hash});

  return new Promise((resolve, reject) => {
    if(receipt.status === 1) {
      resolve(receipt);
    }
    if(receipt.status === 0) {
      reject(new Error());
    }

    resolve(null);
  });
}

/**
 * @desc 调用支付函数
 * 支付成功后，如果是在pc端，则调用queryByhash函数判断支付是否成功
 * 如果是在移动端，由于listener不可用，因此需要单独启动一个timer,
 * 通过serialNumber去检查支付是否成功
 * 成功时，函数返回{status: 'success', serialNumber}
 * 失败时，函数返回{status: 'fail', serialNumber}
 */
const nebPost = (callFunc, callArgs, value) => {
  return new Promise((resolve, reject) => {
    const serialNumber = nebPay.call(CONTRACT_ADDRESS, value, callFunc, callArgs, {
      listener: (res) => {
        const ispc = isPC();
        if (!isPC()) {
          return;
        }

        if (res.txhash) {
          const hash = res.txhash;

          let retry = 0;

          let timer = setInterval(async () => {
            try {
              if(retry > MAX_RETRY) throw new Error('Timeout Error');
              const receipt = await _queryByHash(hash);
              retry++;
              if(receipt) {
                clearInterval(timer);
                timer = null;
                resolve({ status: 'success', serialNumber, receipt });
              }
            } catch(e) {
              clearInterval(timer);
              timer = null;
              reject({ status: 'fail', serialNumber, msg: e.message });
            }
          }, 5000)
        }
      }
    });

    if (!isPC()) {
      /**
       * @desc 首先调用queryInterval函数，判断是否成功提交,
       * 如果成功提交，则调用queryByHash函数获取收据
       */
      let retry = 0;

      let queryTimer = setInterval(async () => {
        try {
          if(retry > MAX_RETRY) throw new Error('Timeout Error');
          const data = await _queryInterval(serialNumber);
          retry++;
          if(!!data) {
            clearInterval(queryTimer);
            queryTimer = null;
            retry = 0;
            const { hash } = data;
            let timer = setInterval(async () => {
              try {
                if(retry > MAX_RETRY) throw new Error('Timeout Error');
                const receipt = await _queryByHash(hash);
                retry++;
                if(receipt) {
                  clearInterval(timer);
                  timer = null;
                  resolve({ status: 'success', serialNumber, receipt });
                }
              } catch(e) {
                clearInterval(timer);
                timer = null;
                reject({ status: 'fail', serialNumber, msg: e.message });
              }
            }, 5000)
          }
        } catch(e) {
          clearInterval(queryTimer);
          queryTimer = null;
          reject({ status: 'fail', serialNumber, msg: e.message });
        }
      }, 3000);
    }
  });
};

export {
  nebGet,
  nebPost
};