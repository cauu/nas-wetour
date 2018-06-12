import Nebulas from 'nebulas';

/**
 * @desc testnet or mainnet
 */
const Account = Nebulas.Account;
const net = 'https://testnet.nebulas.io';
const CONTRACT_ADDRESS = 'n1qQLJtWDF1XGCV11rK6jDVAxrsabbB4bkV';
const VALUE = '0';
const NONCE = '0';
const GAS_PRICE = '1000000';
const GAS_LIMIT = '2000000';

neb.setRequest(new Nebulas.HttpRequest(net));

const callGet = (callFunc, callArgs) => neb.api.call(
  Account.NewAccount().getAddressString(),
  CONTRACT_ADDRESS,
  VALUE,
  NONCE,
  GAS_PRICE,
  GAS_LIMIT,
  {
    callFunc,
    callArgs
  }
).then((res) => {
  let result = res.result;
  if (result === 'null') {
    return [];
  }
  result = JSON.parse(result);
  return result;
});

export {
  callGet
};