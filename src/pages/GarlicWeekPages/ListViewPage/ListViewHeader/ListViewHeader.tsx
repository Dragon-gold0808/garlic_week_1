import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { FilterIcon } from '@app/components/common/icons/FilterIcon';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { NFTCardHeader } from '@app/components/nft-dashboard/common/NFTCardHeader/NFTCardHeader';
import { ListViewFilter } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFilters/ListViewFilter';
import { ListViewFilterState } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewPage';
import { useResponsive } from '@app/hooks/useResponsive';

interface ListViewHeaderProps {
  filters: ListViewFilterState;
  setFilters: (func: (state: ListViewFilterState) => ListViewFilterState) => void;
}

export const ListViewHeader: React.FC<ListViewHeaderProps> = ({ filters, setFilters }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { isDesktop } = useResponsive();

  return (
    <>
      <NFTCardHeader title={'List View'}>
        {!isDesktop && (
          <BaseButton size="large" noStyle type="text" icon={<FilterIcon />} onClick={() => setModalOpen(true)} />
        )}
      </NFTCardHeader>

      {!isDesktop && (
        <BaseModal open={isModalOpen} onCancel={() => setModalOpen(false)} footer={null}>
          <ListViewFilter filters={filters} setFilters={setFilters} />
        </BaseModal>
      )}
    </>
  );
};
