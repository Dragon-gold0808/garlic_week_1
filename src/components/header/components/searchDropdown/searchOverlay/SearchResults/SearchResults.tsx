import React, { useMemo } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import { CategoryEvents } from '@app/components/header/components/HeaderSearch/HeaderSearch';
import { camelize } from '@app/utils/utils';
import * as S from './SearchResults.styles';
import { BaseList } from '@app/components/common/BaseList/BaseList';

interface SearchResultsProps {
  results: CategoryEvents[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { t } = useTranslation();

  const resultsList = useMemo(
    () =>
      results.map((result) => (
        <BaseList
          key={result.category}
          split={false}
          header={result.category}
          dataSource={result.events}
          renderItem={(item) => (
            <BaseList.Item>
              <S.Text>{item.businessName}</S.Text>
            </BaseList.Item>
          )}
        />
      )),
    [results],
  );

  return <S.SearchResultsWrapper>{resultsList}</S.SearchResultsWrapper>;
};
