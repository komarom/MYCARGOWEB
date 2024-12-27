
import router from '@/router'

export const routes = [
  {
    path: '/FMS/FMSPage',
    name: 'FMSPage',
    component: () => import('@/views/FMS/FMSPage.vue')
  }
]

const handleMenuClick = (menu) => {
  if(menu.MENU_TYPE === 'M' && menu.SRC_PATH) {
    router.push(menu.SRC_PATH)
  }
}

// Example usage of handleMenuClick
const exampleMenu = { MENU_TYPE: 'M', SRC_PATH: '/FMS/FMSPage' };
handleMenuClick(exampleMenu);
