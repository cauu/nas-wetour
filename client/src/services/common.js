import Nebulas from 'nebulas';

/**
 * @desc testnet or mainnet
 */
const Account = Nebulas.Account;
const net = 'https://testnet.nebulas.io';
const CONTRACT_ADDRESS = 'n1xYeuB2mq354nUDPo5MTNyWoC2LdX1r3vP';
const VALUE = '0';
const NONCE = '0';
const GAS_PRICE = '1000000';
const GAS_LIMIT = '2000000';

const neb = new Nebulas.Neb();

neb.setRequest(new Nebulas.HttpRequest(net));

const callGet = (callFunc, callArgs) => neb.api.call(
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

export {
  callGet
};