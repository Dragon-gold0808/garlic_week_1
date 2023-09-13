/* eslint-disable prettier/prettier */
import React, { useEffect, useState, MouseEvent } from 'react';
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
import { Button } from 'antd';


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

  const [sortBusinessNameClicked, setSortBusinessNameClicked] = useState(false);
  const [sortCityNameClicked, setSortCityNameClicked] = useState(false);
  const [sortDateClicked, setSortDateClicked] = useState(false);

  const [spotlighclicked, setspotlighclicked] = useState(false);


  const [filters, setFilters] = useState<ListViewFilterState>({
    category: [],
    city: [],
  });

  useEffect(() => {
    getEvents().then((res) => {
      if (!sortBusinessNameClicked && !sortCityNameClicked && !sortDateClicked) {
        setSortCityNameClicked(false);
        setSortBusinessNameClicked(false);
        setSortDateClicked(false);
        setActivity(res);
      }
      if (sortBusinessNameClicked) {
        setSortCityNameClicked(false);
        setSortDateClicked(false);
        setActivity(res.sort((a, b) => a.businessName.localeCompare(b.businessName)));
      } 
      if (sortCityNameClicked) {
        setSortBusinessNameClicked(false);
        setSortDateClicked(false);
        setActivity(res.sort((a, b) => a.city.localeCompare(b.city)));
      }
      if (sortDateClicked) {
        setSortCityNameClicked(false);
        setSortBusinessNameClicked(false);
        setActivity(
          res.sort((a, b) => {
            if (a.date !== undefined && b.date !== undefined) {
              return b.date.localeCompare(a.date);
            } else {
              // Handle the case when either a.date or b.date is undefined
              return 0; // or any other appropriate value
            }
          }));
      }
      setFirstFilteredActivity(res);
      setSecondFilteredActivity(res);
    });
  }, [sortBusinessNameClicked, sortCityNameClicked, sortDateClicked]);

  dispatch(setCityFilter([...new Set(activity.map((obj) => obj.city))]));

  useEffect(() => {
    if (filters.category.length > 0) {
      setFirstFilteredActivity(
        activity.filter((item) => filters.category.some((filter) => item.category.split(',').includes(filter))),
      );
      if (filters.category.includes("Special Activity")) {
        // spotlighclicked ? setspotlighclicked(false) : setspotlighclicked(true);
        setspotlighclicked(true)
      } else {
        setspotlighclicked(false);
      }
      // setFirstFilteredActivity(
      //   activity.filter((item) => filters.category.some((filter) => item.category.split(',').includes(filter))),
      // );
    } else {
      setFirstFilteredActivity(activity);
      setspotlighclicked(false);
    }
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
            {/* <BaseCol span={24}>
              <ListViewHeader filters={filters} setFilters={setFilters} />
            </BaseCol> */}

            <BaseCol span={24}>
              <BaseRow gutter={[30, 0]}>
                <BaseCol span={8}>
                  <ListViewHeader filters={filters} setFilters={setFilters} />
                </BaseCol>
                <BaseCol span={3} style={location.pathname === "/" ? { display: 'block' } : { display: 'none'}}>
                  <Button 
                    size="small"
                    onClick={() => {
                      setSortBusinessNameClicked(!sortBusinessNameClicked);
                      setSortCityNameClicked(false);
                      setSortDateClicked(false);
                    }}
                    style={
                      sortBusinessNameClicked
                        ? { backgroundColor: '#339cfd', color: 'white' }
                        : { backgroundColor: '#25284b', color: 'white' }
                    }
                  >
                    Sort by Business Name
                  </Button>
                </BaseCol>
                <BaseCol span={3} style={location.pathname === "/" ? { display: 'block' } : { display: 'none'}}>
                  <Button
                    size="small"
                    onClick={() => {
                      setSortCityNameClicked(!sortCityNameClicked);
                      setSortBusinessNameClicked(false);
                      setSortDateClicked(false);
                    }}
                    style={
                      sortCityNameClicked
                        ? { backgroundColor: '#339cfd', color: 'white' }
                        : { backgroundColor: '#25284b', color: 'white' }
                    }
                  >
                    Sort by Town Name
                  </Button>
                </BaseCol>
                <BaseCol span={1} style={spotlighclicked && location.pathname === "/" ? { display: 'block' } : { display: 'none'}}>
                  <Button
                    size="small"
                    onClick={() => {
                      setSortDateClicked(!sortDateClicked);
                      setSortBusinessNameClicked(false);
                      setSortCityNameClicked(false);
                    }}
                    style={
                      sortDateClicked
                        ? { backgroundColor: '#339cfd', color: 'white' }
                        : { backgroundColor: '#25284b', color: 'white' }
                    }
                  >
                    Sort by Date
                  </Button>
                </BaseCol>
              </BaseRow>
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
