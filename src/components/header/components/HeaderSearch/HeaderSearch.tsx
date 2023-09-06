import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { SearchDropdown } from '../searchDropdown/SearchDropdown';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { categoriesList, CategoryType } from '@app/constants/categoriesList';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './HeaderSearch.styles';
import { GarlicEvents } from '@app/api/events.api';
import { useAppSelector } from '@app/hooks/reduxHooks';

export interface CategoryEvents {
  category: CategoryType;
  events: GarlicEvents[];
}

export const HeaderSearch: React.FC = () => {
  const { mobileOnly, isTablet } = useResponsive();

  const { pathname } = useLocation();

  const [query, setQuery] = useState('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isOverlayOpen, setOverlayOpen] = useState(false);
  const events: GarlicEvents[] = useAppSelector((state) => state.filter.filteredEvents);
  const selectedItem: GarlicEvents = useAppSelector((state) => state.filter.item);

  const sortedResults = query
    ? categoriesList.reduce((acc, current) => {
        const searchResults = events.filter(
          (event) => event.category === current.name && event.businessName.toLowerCase().includes(query.toLowerCase()),
        );

        return searchResults.length > 0 ? acc.concat({ category: current.name, events: searchResults }) : acc;
      }, [] as CategoryEvents[])
    : null;

  useEffect(() => {
    setModalOpen(false);
    setOverlayOpen(false);
  }, [pathname]);

  return (
    <>
      {mobileOnly && (
        <>
          <BaseButton
            type={isModalOpen ? 'ghost' : 'text'}
            icon={<S.SearchIcon onClick={() => setModalOpen(true)} />}
          />
          <S.SearchModal
            open={isModalOpen}
            closable={false}
            footer={null}
            onCancel={() => setModalOpen(false)}
            destroyOnClose
          >
            <SearchDropdown
              query={query}
              setQuery={setQuery}
              data={sortedResults}
              isOverlayOpen={isOverlayOpen}
              setOverlayOpen={setOverlayOpen}
            />
          </S.SearchModal>
        </>
      )}

      {isTablet && (
        <SearchDropdown
          query={query}
          setQuery={setQuery}
          data={sortedResults}
          isOverlayOpen={isOverlayOpen}
          setOverlayOpen={setOverlayOpen}
        />
      )}
    </>
  );
};
