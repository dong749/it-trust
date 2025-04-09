import type { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark', 
  colorPrimary: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  title: 'Golden Guardians',
  pwa: true,
  logo: '/lucent-password-protection-with-shield-and-padlock.svg',
  iconfontUrl: '',
  token: {
    bgLayout: '#1E1E2F', 
    header: {
      colorBgHeader: '#1E2A38', 
    },
    sider: {
      colorBgMenuItemSelected: '#3D3D5C', 
      colorMenuBackground: '#2A2A3C',     
    },
  },
};

export default Settings;
