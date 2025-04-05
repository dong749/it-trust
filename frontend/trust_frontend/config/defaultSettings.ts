import type { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark', // 主题风格
  colorPrimary: '#1890ff', // 主颜色
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  title: 'Life with IT',
  pwa: true,
  logo: '/lucent-password-protection-with-shield-and-padlock.svg',
  iconfontUrl: '',
  token: {
    // 自定义背景颜色
    bgLayout: '#1E1E2F', // 设置整个布局的背景色
    header: {
      colorBgHeader: '#1E2A38', // 设置顶部导航栏的背景色
    },
    sider: {
      colorBgMenuItemSelected: '#3D3D5C', // 设置选中的菜单项背景色
      colorMenuBackground: '#2A2A3C',     // 设置侧边栏的背景色
    },
  },
};

export default Settings;
