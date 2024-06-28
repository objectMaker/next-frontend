import { extend } from 'umi-request';

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

export default request;
