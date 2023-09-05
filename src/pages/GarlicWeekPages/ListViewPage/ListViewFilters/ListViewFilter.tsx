import React from 'react';
import { NFTCard } from '@app/components/nft-dashboard/common/NFTCard/NFTCard';
import { ListViewStatusFilter } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFilters/ListViewStatusFilter/ListViewStatusFilter';
import { ListViewFilterState } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewPage';

interface ListViewFilterProps {
  filters: ListViewFilterState;
  setFilters: (func: (state: ListViewFilterState) => ListViewFilterState) => void;
  withWrapper?: boolean;
}

export const ListViewFilter: React.FC<ListViewFilterProps> = ({ filters, setFilters, withWrapper }) => {
  const filter = <ListViewStatusFilter filters={filters} setFilters={setFilters} />;

  return withWrapper ? <NFTCard>{filter}</NFTCard> : filter;
};
