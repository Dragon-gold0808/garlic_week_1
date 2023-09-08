import React, { useEffect, useState } from 'react';
import { Header } from '../../../header/Header';
import MainSider from '../sider/MainSider/MainSider';
import MainContent from '../MainContent/MainContent';
import { MainHeader } from '../MainHeader/MainHeader';
import * as S from './MainLayout.styles';
import * as L from '@app/pages/GarlicWeekPages/ListViewPage/ListView.styles';
import { Outlet, useLocation } from 'react-router-dom';
import { MEDICAL_DASHBOARD_PATH, NFT_DASHBOARD_PATH } from '@app/components/router/AppRouter';
import { References } from '@app/components/common/References/References';

import { ListViewHeader } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewHeader/ListViewHeader';
import { ListViewFeed } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFeed/ListViewFeed';
import { ListViewFilter } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFilters/ListViewFilter';
import { useResponsive } from '@app/hooks/useResponsive';
import { getEvents, GarlicEvents } from '@app/api/events.api';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { changeEvents, setCityFilter } from '@app/store/slices/filterSlice';
import { useDispatch } from 'react-redux';

export interface ListViewFilterState {
  category: string[];
  city: string[];
}

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const { isDesktop, mobileOnly } = useResponsive();
  const location = useLocation();

  const toggleSider = () => setSiderCollapsed(!siderCollapsed);

  useEffect(() => {
    setIsTwoColumnsLayout([MEDICAL_DASHBOARD_PATH, NFT_DASHBOARD_PATH].includes(location.pathname) && isDesktop);
  }, [location.pathname, isDesktop]);

  const [activity, setActivity] = useState<GarlicEvents[]>([]);
  const [firstFilteredActivity, setFirstFilteredActivity] = useState<GarlicEvents[]>([]);
  const [secondFilteredActivity, setSecondFilteredActivity] = useState<GarlicEvents[]>([]);
  const [hasMore] = useState(true);

  const [filters, setFilters] = useState<ListViewFilterState>({
    category: [],
    city: [],
  });

  useEffect(() => {
    getEvents().then((res) => {
      setActivity(res);
      setFirstFilteredActivity(res);
      setSecondFilteredActivity(res);
    });
  }, []);

  const next = () => {
    getEvents().then((newActivity) => setActivity(activity.concat(newActivity)));
  };

  dispatch(setCityFilter([...new Set(activity.map((obj) => obj.city))]));

  useEffect(() => {
    if (filters.category.length > 0) {
      setFirstFilteredActivity(
        activity.filter((item) => filters.category.some((filter) => item.category.split(',').includes(filter))),
      );
    } else setFirstFilteredActivity(activity);
  }, [filters.category, activity]);

  useEffect(() => {
    if (filters.city.length > 0) {
      setSecondFilteredActivity(
        firstFilteredActivity.filter((item) => filters.city.some((filter) => filter === item.city)),
      );
    } else setSecondFilteredActivity(firstFilteredActivity);
  }, [filters.city, firstFilteredActivity]);

  dispatch(changeEvents(secondFilteredActivity));

  return (
    <S.LayoutMaster>
      {/* <MainSider isCollapsed={siderCollapsed} setCollapsed={setSiderCollapsed} /> */}
      <S.LayoutMain>
        <MainHeader isTwoColumnsLayout={isTwoColumnsLayout}>
          <Header toggleSider={toggleSider} isSiderOpened={!siderCollapsed} isTwoColumnsLayout={isTwoColumnsLayout} />
        </MainHeader>
        <MainContent id="main-content" $isTwoColumnsLayout={isTwoColumnsLayout}>
          <div>{/* <Outlet /> */}</div>
          <BaseRow gutter={[30, 0]}>
            <BaseCol span={24}>
              <ListViewHeader filters={filters} setFilters={setFilters} />
            </BaseCol>

            <BaseCol xs={24} sm={24} md={18} xl={18}>
              <Outlet />
              {/* <ListViewFeed activity={filteredActivity} hasMore={hasMore} next={next} /> */}
            </BaseCol>

            {!mobileOnly && (
              <L.FilterCol span={6}>
                <ListViewFilter filters={filters} setFilters={setFilters} withWrapper />
              </L.FilterCol>
            )}
          </BaseRow>
          {!isTwoColumnsLayout && <References />}
        </MainContent>
      </S.LayoutMain>
    </S.LayoutMaster>
  );
};

export default MainLayout;
