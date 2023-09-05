import React from 'react';
import {
  CompassOutlined,
  DashboardOutlined,
  FormOutlined,
  HomeOutlined,
  LayoutOutlined,
  LineChartOutlined,
  TableOutlined,
  UserOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import { ReactComponent as NftIcon } from '@app/assets/icons/nft-icon.svg';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'common.nft-dashboard',
    key: 'nft-dashboard',
    // TODO use path variable
    url: '/nft-dashboard',
    icon: <NftIcon />,
  },
  {
    title: 'common.medical-dashboard',
    key: 'medical-dashboard',
    url: '/medical-dashboard',
    icon: <DashboardOutlined />,
  },
  {
    title: 'Garlic Week',
    key: 'garlic-week',
    icon: <DashboardOutlined />,
    children: [
      {
        title: 'MapView',
        key: 'map-view',
        url: '/garlic-week/mapview',
      },
      {
        title: 'ListView',
        key: 'list-view',
        url: '/garlic-week/listview',
      },
    ],
  },
];
