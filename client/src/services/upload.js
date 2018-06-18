import * as qiniujs from 'qiniu-js';

const qiniu = require('qiniu');

const AK = 'pd9qLppMKN4o0bI-d4jxgXkhLrC7vDBlKKJy0IrH';
const SK = 'ivqJDwn1Ye4l9pgRMWh6jDJ_ga7BBnkhNl1IajZR';

const mac = new qiniu.auth.digest.Mac(AK, SK);

const _getUploadToken = () => {
  const putPolicy = new qiniu.rs.PutPolicy({
    scope: 'dapp',
    name: 'test',
    key: 'test',
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  });

  return putPolicy.uploadToken(mac);
};

// const _putPolicy = (deadline, fname, fsize, imageInfo, etag) =>
//   `{
//     "scope": "my-bucket:sunflower.jpg",
//     "deadline":1451491200,
//     "returnBody":
//     "{
//       \"name\":$(fname),
//       \"size\":$(fsize),
//       \"w\":$(imageInfo.width),
//       \"h\":$(imageInfo.height),
//       \"hash\":$(etag)
//     }"
//   }`
// ;

function uploadImg(file, key, listener) {
  /**
   * @todo
   * 首先获取token
   */
  const token = _getUploadToken();

  return new Promise((resolve, reject) => {
  /**
   * @param file: blob,
   * @param key: string,
   * @param token: string,
   * @param putExtra: object,
   * @param config: object 
   */
    const observable = qiniujs.upload(file, key, token)

    const subscription = observable.subscribe({
      /**
       * @desc res: { loaded, total, percent }
       */
      next(res) {
        listener && listener(res);
      },
      /**
       * @desc err: { code, message, isRequestError }
       */
      error(err) {
        reject(err);
      },
      complete(res) {
        resolve(res);
      }
    });
  });
}

export {
  uploadImg
};
