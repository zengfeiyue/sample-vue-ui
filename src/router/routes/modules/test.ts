import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const RESULT: AppRouteRecordRaw = {
  path: '/result2',
  name: 'result2',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '测试页',
    icon: 'icon-translate',
    requiresAuth: true,
    order: 1,
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      component: () => import('@/views/test/index.vue'),
      meta: {
        locale: '测试页面',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default RESULT;
