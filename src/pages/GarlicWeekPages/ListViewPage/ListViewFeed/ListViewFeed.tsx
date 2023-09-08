/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BaseFeed } from '@app/components/common/BaseFeed/BaseFeed';
import { NotFound } from '@app/components/common/NotFound/NotFound';
import { ListViewItem } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFeed/ListViewItem/ListViewItem';
import { GarlicEvents } from '@app/api/events.api';
import * as S from './ListViewFeed.styles';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { Space } from 'antd';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { setSearchedItem } from '@app/store/slices/filterSlice';
import { useDispatch } from 'react-redux';

const { Title, Text, Link } = BaseTypography;

interface ListViewFeedProps {
  activity: GarlicEvents[];
  hasMore: boolean;
  next: () => void;
}

export const ListViewFeed: React.FC<ListViewFeedProps> = ({ activity, hasMore, next }) => {
  const [detailModal, setDetailModal] = useState<GarlicEvents | null>(null);
  const dispatch = useDispatch();
  const activityItems = useMemo(
    () =>
      activity.map((item, index) => (
        <ListViewItem
          key={index}
          onClick={(e) => {
            setDetailModal(item);
          }}
          activity={item}
        />
      )),
    [activity],
  );

  const feedRef = useRef<HTMLDivElement>(null);
  const selectedItem: GarlicEvents = useAppSelector((state) => state.filter.item);

  useEffect(() => {
    if (selectedItem._id) setDetailModal(selectedItem);
    // if (selectedItem.businessName) setOverlayOpen(false);
  }, [selectedItem, setDetailModal]);

  const website = (data = '', type = '') =>
    data && data !== 'none' && data != 'N/a' ? (
      <Text>
        {type}
        <Link href={`https://${data}`} target="_blank">
          {data}
        </Link>
      </Text>
    ) : null;

  const garlickyFeature = (garlickyFeature: string | undefined) =>
    garlickyFeature ? (
      <Text style={{ color: 'inherit' }}>
        <span style={{ fontWeight: 'bold' }}>Garlicky Feature: </span>
        {garlickyFeature}
      </Text>
    ) : null;

  const details = detailModal ? (
    <Space direction="vertical">
      <Title level={5} style={{ textAlign: 'center' }}>
        {detailModal.businessName}
      </Title>
      {garlickyFeature(detailModal.garlickyFeature)}
      {detailModal.businessHours}
      {detailModal.typeOfParticipant}
      {detailModal.date}
      {detailModal.address}
      {detailModal.city + ',' + detailModal.postalCode}
      {detailModal.tel && 'Tel: ' + detailModal.tel}
      {detailModal.email && 'Email: ' + detailModal.email}
      {website(detailModal.website, 'Website: ')}
      {website(detailModal.facebook, 'Facebook: ')}
      {website(detailModal.insta, 'Instagram: ')}
      {website(detailModal.twitter, 'Twitter: ')}
      {detailModal.credit}
    </Space>
  ) : null;

  useEffect(() => {
    if (activity.length < 4) {
      feedRef.current?.dispatchEvent(new CustomEvent('scroll'));
    }
  }, [activity]);

  return (
    <>
      {activityItems.length > 0 ? (
        <S.FeedWrapper ref={feedRef} id="recent-activity-feed">
          <BaseFeed hasMore={hasMore} next={next} target="recent-activity-feed">
            {activityItems}
          </BaseFeed>
        </S.FeedWrapper>
      ) : (
        <NotFound />
      )}
      {detailModal && (
        <BaseModal
          open={true}
          onCancel={() => {
            setDetailModal(null);
            dispatch(setSearchedItem({}));
          }}
          footer={null}
        >
          {details}
        </BaseModal>
      )}
    </>
  );
};
