import React, { useEffect, useRef, useState } from 'react';
import { FilterIcon } from 'components/common/icons/FilterIcon';
import { SearchOverlay } from './searchOverlay/SearchOverlay/SearchOverlay';
import { useDispatch } from 'react-redux';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { CategoryEvents } from '@app/components/header/components/HeaderSearch/HeaderSearch';
import { Btn, InputSearch } from '../HeaderSearch/HeaderSearch.styles';
import { useTranslation } from 'react-i18next';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { GarlicEvents } from '@app/api/events.api';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { setSearchedItem } from '@app/store/slices/filterSlice';

interface SearchOverlayProps {
  query: string;
  setQuery: (query: string) => void;
  data: CategoryEvents[] | null;
  isOverlayOpen: boolean;
  setOverlayOpen: (state: boolean) => void;
}

export const SearchDropdown: React.FC<SearchOverlayProps> = ({
  query,
  setQuery,
  data,
  isOverlayOpen,
  setOverlayOpen,
}) => {
  const [isFilterOpen, setFilterOpen] = useState(false);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const selectedItem: GarlicEvents = useAppSelector((state) => state.filter.item);

  useEffect(() => {
    if (selectedItem.businessName == query) {
      setOverlayOpen(false);
      // dispatch(setSearchedItem({}));
    } else setOverlayOpen(!!query || isFilterOpen);
  }, [query, isFilterOpen, setOverlayOpen, selectedItem]);

  useEffect(() => {
    setQuery(selectedItem.businessName);
    // if (selectedItem.businessName) setOverlayOpen(false);
  }, [selectedItem, setQuery]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  return (
    <>
      <BasePopover
        {...((!!data || isFilterOpen) && { trigger: 'click', onOpenChange: setOverlayOpen })}
        overlayClassName="search-overlay"
        content={<SearchOverlay data={data} isFilterOpen={isFilterOpen} />}
        open={isOverlayOpen}
        getPopupContainer={() => ref.current}
      >
        <HeaderActionWrapper>
          <InputSearch
            width="100%"
            value={query}
            placeholder={'Search'}
            onChange={(event) => setQuery(event.target.value)}
            enterButton={null}
            addonAfter={null}
          />
          <div ref={ref} />
        </HeaderActionWrapper>
      </BasePopover>
    </>
  );
};
