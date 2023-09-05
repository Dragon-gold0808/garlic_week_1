import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BaseFeed } from '@app/components/common/BaseFeed/BaseFeed';
import { NotFound } from '@app/components/common/NotFound/NotFound';
import { ListViewItem } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFeed/ListViewItem/ListViewItem';
import { GarlicEvents } from '@app/api/events.api';
import * as S from './ListViewFeed.styles';

interface ListViewFeedProps {
  activity: GarlicEvents[];
  hasMore: boolean;
  next: () => void;
}

export const ListViewFeed: React.FC<ListViewFeedProps> = ({ activity, hasMore, next }) => {
  const [detailModal, setDetailModal] = useState<GarlicEvents | null>(null);

  const onItemClick = (item: GarlicEvents) => {
    setDetailModal(item);
  };

  const activityItems = useMemo(
    () => activity.map((item, index) => <ListViewItem key={index} {...item} />),
    [activity],
  );

  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activity.length < 4) {
      feedRef.current?.dispatchEvent(new CustomEvent('scroll'));
    }
  }, [activity]);

  return activityItems.length > 0 ? (
    <S.FeedWrapper ref={feedRef} id="recent-activity-feed">
      <BaseFeed hasMore={hasMore} next={next} target="recent-activity-feed">
        {activityItems}
      </BaseFeed>
    </S.FeedWrapper>
  ) : (
    <NotFound />
  );
};
