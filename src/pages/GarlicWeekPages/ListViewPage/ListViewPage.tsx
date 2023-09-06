/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { ListViewHeader } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewHeader/ListViewHeader';
import { ListViewFeed } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFeed/ListViewFeed';
import { ListViewFilter } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFilters/ListViewFilter';
import { useResponsive } from '@app/hooks/useResponsive';
import { getEvents, GarlicEvents } from '@app/api/events.api';
import * as S from './ListView.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { useAppSelector } from '@app/hooks/reduxHooks';

export interface ListViewFilterState {
  category: string[];
  city: string[];
}

const ListViewPage: React.FC = () => {
  // const [activity, setActivity] = useState<GarlicEvents[]>([]);
  // const [filteredActivity, setFilteredActivity] = useState<GarlicEvents[]>([]);
  const [hasMore] = useState(false);

  // const [filters, setFilters] = useState<ListViewFilterState>({
  //   category: [],
  // });

  const { isDesktop } = useResponsive();
  const filteredActivity = useAppSelector((state) => state.filter.filteredEvents);

  // useEffect(() => {
  //   getEvents().then((res) => setActivity(res));
  // }, []);

  const next = () => {
    console.log('next selected');
  };

  // useEffect(() => {
  //   if (filters.category.length > 0) {
  //     setFilteredActivity(activity.filter((item) => filters.category.some((filter) => filter === item.category)));
  //   } else {
  //     setFilteredActivity(activity);
  //   }
  // }, [filters.category, activity]);

  return (
    <BaseRow gutter={[30, 0]}>
      <BaseCol xs={24} sm={24} md={24} xl={24}>
        <ListViewFeed activity={filteredActivity} hasMore={hasMore} next={next} />
      </BaseCol>
    </BaseRow>
  );
};

export default ListViewPage;
