import React from 'react';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { SearchResults } from '../SearchResults/SearchResults';
import { CategoryEvents } from '@app/components/header/components/HeaderSearch/HeaderSearch';
import { NotFound } from '@app/components/common/NotFound/NotFound';
import * as S from './SearchOverlay.styles';

interface SearchOverlayProps {
  data: CategoryEvents[] | null;
  isFilterOpen: boolean;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ data, isFilterOpen }) => {
  return (
    <S.Menu>
      <SearchFilter data={data} isOpen={isFilterOpen}>
        {(filteredResults) => (filteredResults.length > 0 ? <SearchResults results={filteredResults} /> : <NotFound />)}
      </SearchFilter>
    </S.Menu>
  );
};
