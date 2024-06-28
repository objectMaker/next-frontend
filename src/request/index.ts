import { extend } from 'umi-request';
import PubSub from 'pubsub-js';

const request = extend({
  timeout: 5000,
  prefix: process.env.NEXT_PUBLIC_BASE_URL,
});

// request.interceptors.request.use(function (url, config) {
//   if (
//     !url.includes('login') &&
//     !(
//       config.headers as {
//         [k: string]: string;
//       }
//     )?.['x-token']
//   ) {
//     console.log('请先登录');
//     redirect('/login');
//   }
//   return {
//     url,
//     ...config,
//   };
// });

request.interceptors.response.use(async function (response) {
  console.log(response, 'response');
  if (!response) {
    PubSub?.publish?.('showError', 'server error please connect manage');
    return Promise.reject({
      code: 500,
      message: 'server error please connect manage',
    });
  }
  const data = await response.clone().json();
  if (response.status === 200) {
    // toast()
    if (data.code == '200') {
      return data.data;
    } else {
      PubSub?.publish?.('showError', data.message);
      return Promise.reject(data);
    }
  } else {
    PubSub.publish(
      'showError',
      data?.message || 'server error please connect manage',
    );
    return Promise.reject(data);
  }
});

export default request;
