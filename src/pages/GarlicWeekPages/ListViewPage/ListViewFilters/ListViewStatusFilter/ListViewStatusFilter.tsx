import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { categoriesList } from '@app/constants/categoriesList';
import { ListViewFilterState } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewPage';
import { Title } from '../ListViewFilter.styles';
import * as S from './ListViewStatusFilter.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

interface ListViewStatusFilterProps {
  filters: ListViewFilterState;
  setFilters: (func: (state: ListViewFilterState) => ListViewFilterState) => void;
}

export const ListViewStatusFilter: React.FC<ListViewStatusFilterProps> = ({ filters, setFilters }) => {
  const { t } = useTranslation();

  const options = useMemo(
    () => categoriesList.map((category) => ({ label: category.title, value: category.name })),
    [],
  );

  return (
    <BaseRow gutter={[20, 20]}>
      <BaseCol span={24}>
        <Title>{t('nft.show')}</Title>
      </BaseCol>

      <BaseCol span={24}>
        <S.FilterCheckboxGroup
          value={filters.category}
          options={options}
          onChange={(checkedValues) =>
            setFilters((prev) => ({ ...prev, category: checkedValues as unknown as string[] }))
          }
        />
      </BaseCol>
    </BaseRow>
  );
};
