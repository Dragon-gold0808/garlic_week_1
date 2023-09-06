import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { categoriesList } from '@app/constants/categoriesList';
import { ListViewFilterState } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewPage';
import { BaseSelect, Option } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { Title } from '../ListViewFilter.styles';
import * as S from './ListViewStatusFilter.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { useAppSelector } from '@app/hooks/reduxHooks';

interface ListViewStatusFilterProps {
  filters: ListViewFilterState;
  setFilters: (func: (state: ListViewFilterState) => ListViewFilterState) => void;
}

export const ListViewStatusFilter: React.FC<ListViewStatusFilterProps> = ({ filters, setFilters }) => {
  const { t } = useTranslation();
  const cities = useAppSelector((state) => state.filter.filter.city);

  const options = useMemo(
    () => categoriesList.map((category) => ({ label: category.title, value: category.name })),
    [],
  );

  const citiesOption = cities.map((val, key) => (
    <Option key={key} value={val}>
      {val}
    </Option>
  ));

  return (
    <>
      <BaseRow gutter={[20, 20]}>
        <BaseCol span={24}>
          <Title>{'Category'}</Title>
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
      <BaseRow gutter={[20, 20]} style={{ marginTop: '20px' }}>
        <BaseCol span={24}>
          <Title>{'City'}</Title>
        </BaseCol>

        <BaseCol span={24}>
          {/* <S.FilterCheckboxGroup
            value={filters.category}
            options={options}
            onChange={(checkedValues) =>
              setFilters((prev) => ({ ...prev, category: checkedValues as unknown as string[] }))
            }
          /> */}
          <BaseSelect
            mode="multiple"
            allowClear
            width={'100%'}
            placeholder={'Please select city'}
            // defaultValue={['Toronto', 'Ontario']}
            onChange={(selectedValues) => {
              setFilters((prev) => ({ ...prev, city: selectedValues as unknown as string[] }));
              console.log(selectedValues);
            }}
          >
            {citiesOption}
          </BaseSelect>
        </BaseCol>
      </BaseRow>
    </>
  );
};
