import type { AspidaClient, BasicHeaders } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_by08hd } from '.';
import type { Methods as Methods_18qsrps } from './health';
import type { Methods as Methods_1uc1f5c } from './me';
import type { Methods as Methods_upxprt } from './private';
import type { Methods as Methods_1a8vyd0 } from './private/tasks';
import type { Methods as Methods_16xdnf7 } from './public';
import type { Methods as Methods_10hptpi } from './public/tasks';
import type { Methods as Methods_g2ofzy } from './session';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/health';
  const PATH1 = '/me';
  const PATH2 = '/private';
  const PATH3 = '/private/tasks';
  const PATH4 = '/public';
  const PATH5 = '/public/tasks';
  const PATH6 = '/session';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    health: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_18qsrps['get']['resBody']>(prefix, PATH0, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_18qsrps['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    me: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1uc1f5c['get']['resBody']>(prefix, PATH1, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1uc1f5c['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
    private: {
      tasks: {
        post: (option: { body: Methods_1a8vyd0['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1a8vyd0['post']['resBody']>(prefix, PATH3, POST, option, 'FormData').json(),
        $post: (option: { body: Methods_1a8vyd0['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1a8vyd0['post']['resBody']>(prefix, PATH3, POST, option, 'FormData').json().then(r => r.body),
        patch: (option: { body: Methods_1a8vyd0['patch']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1a8vyd0['patch']['resBody'], BasicHeaders, Methods_1a8vyd0['patch']['status']>(prefix, PATH3, PATCH, option).json(),
        $patch: (option: { body: Methods_1a8vyd0['patch']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1a8vyd0['patch']['resBody'], BasicHeaders, Methods_1a8vyd0['patch']['status']>(prefix, PATH3, PATCH, option).json().then(r => r.body),
        delete: (option: { body: Methods_1a8vyd0['delete']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1a8vyd0['delete']['status']>(prefix, PATH3, DELETE, option).send(),
        $delete: (option: { body: Methods_1a8vyd0['delete']['reqBody'], config?: T | undefined }) =>
          fetch<void, BasicHeaders, Methods_1a8vyd0['delete']['status']>(prefix, PATH3, DELETE, option).send().then(r => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_upxprt['get']['resBody']>(prefix, PATH2, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_upxprt['get']['resBody']>(prefix, PATH2, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    public: {
      tasks: {
        get: (option?: { query?: Methods_10hptpi['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_10hptpi['get']['resBody']>(prefix, PATH5, GET, option).json(),
        $get: (option?: { query?: Methods_10hptpi['get']['query'] | undefined, config?: T | undefined } | undefined) =>
          fetch<Methods_10hptpi['get']['resBody']>(prefix, PATH5, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_10hptpi['get']['query'] } | undefined) =>
          `${prefix}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_16xdnf7['get']['resBody']>(prefix, PATH4, GET, option).text(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_16xdnf7['get']['resBody']>(prefix, PATH4, GET, option).text().then(r => r.body),
      $path: () => `${prefix}${PATH4}`,
    },
    session: {
      post: (option: { body: Methods_g2ofzy['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_g2ofzy['post']['resBody']>(prefix, PATH6, POST, option).json(),
      $post: (option: { body: Methods_g2ofzy['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_g2ofzy['post']['resBody']>(prefix, PATH6, POST, option).json().then(r => r.body),
      delete: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_g2ofzy['delete']['resBody']>(prefix, PATH6, DELETE, option).json(),
      $delete: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_g2ofzy['delete']['resBody']>(prefix, PATH6, DELETE, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH6}`,
    },
    get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods_by08hd['get']['resBody']>(prefix, '', GET, option).text(),
    $get: (option?: { config?: T | undefined } | undefined) =>
      fetch<Methods_by08hd['get']['resBody']>(prefix, '', GET, option).text().then(r => r.body),
    $path: () => `${prefix}`,
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
