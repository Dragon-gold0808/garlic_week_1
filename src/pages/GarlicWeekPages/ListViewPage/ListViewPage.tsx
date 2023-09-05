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

export interface ListViewFilterState {
  category: string[];
}

const ListViewPage: React.FC = () => {
  const [activity, setActivity] = useState<GarlicEvents[]>([]);
  const [filteredActivity, setFilteredActivity] = useState<GarlicEvents[]>([]);
  const [hasMore] = useState(true);

  const [filters, setFilters] = useState<ListViewFilterState>({
    category: [],
  });

  const { isDesktop } = useResponsive();

  useEffect(() => {
    getEvents().then((res) => setActivity(res));
  }, []);

  const next = () => {
    getEvents().then((newActivity) => setActivity(activity.concat(newActivity)));
  };

  useEffect(() => {
    if (filters.category.length > 0) {
      setFilteredActivity(activity.filter((item) => filters.category.some((filter) => filter === item.category)));
    } else {
      setFilteredActivity(activity);
    }
  }, [filters.category, activity]);

  return (
    <BaseRow gutter={[30, 0]}>
      <BaseCol span={24}>
        <ListViewHeader filters={filters} setFilters={setFilters} />
      </BaseCol>

      <BaseCol xs={24} sm={24} md={24} xl={16}>
        <ListViewFeed activity={filteredActivity} hasMore={hasMore} next={next} />
      </BaseCol>

      {isDesktop && (
        <S.FilterCol span={8}>
          <ListViewFilter filters={filters} setFilters={setFilters} withWrapper />
        </S.FilterCol>
      )}
    </BaseRow>
  );
};

export default ListViewPage;
