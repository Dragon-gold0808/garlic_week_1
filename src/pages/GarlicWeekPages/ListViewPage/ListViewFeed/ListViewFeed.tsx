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
  const businessHours = (businessHours: string | undefined) =>
    businessHours ? (
      <Text style={{ color: 'inherit' }}>
        <span style={{ fontWeight: 'bold' }}>Business Hours: </span>
        {businessHours}
        <hr />
      </Text>
    ) : null;

  const garlicSupplier = (garlicSupplier: string | undefined) =>
    garlicSupplier ? (
      <Text style={{ color: 'inherit', fontSize: '13px' }}>
        <span style={{ fontWeight: 'bold' }}>Garlic Supplied by </span>
        {garlicSupplier}
      </Text>
    ) : null;
  const garlicSpotLight = (garlicSpotLight: string | undefined) =>
    garlicSpotLight ? (
      <Text style={{ color: 'inherit', fontSize: '13px' }}>
        <span style={{ fontWeight: 'bold' }}>Garlic Spotlight: </span>
        {garlicSpotLight}
      </Text>
    ) : null;
  const activityDate = (activityDate: string | undefined) =>
    activityDate ? (
      <Text style={{ color: 'inherit', fontSize: '13px' }}>
        <span style={{ fontWeight: 'bold' }}>Activity Date/Hours: </span>
        {activityDate}
        <hr />
      </Text>
    ) : null;
  const address = (address: string | undefined) =>
    address ? (
      <Text style={{ color: 'inherit', fontSize: '13px' }}>
        <span style={{ fontWeight: 'bold' }}>Address: </span>
        {address}
      </Text>
    ) : null;
  const cuisine = (cuisine: string | undefined) =>
    cuisine ? (
      <Text style={{ color: 'inherit', fontSize: '13px' }}>
        <span style={{ fontWeight: 'bold' }}>Cuisine: </span>
        {cuisine}
      </Text>
    ) : null;
  const typeOfService = (typeOfService: string | undefined) =>
    typeOfService ? (
      <Text style={{ color: 'inherit', fontSize: '13px' }}>
        {typeOfService}
        <hr />
      </Text>
    ) : null;

  const details = detailModal ? (
    <Space direction="vertical">
      <Title style={{ textAlign: 'center', fontSize: '12px', color: '#23e60e'}}>Ontario Garlic Week (Sept 22-Oct 1, 2023)</Title>
      <Title level={5} style={{ textAlign: 'center' }}>
        {detailModal.businessName + ", " + detailModal.city}
      </Title>
      {garlickyFeature(detailModal.gralicDetail)}
      {garlicSupplier(detailModal.supplier)}
      {businessHours(detailModal.businessHours)}
      
      {garlicSpotLight(detailModal.garlicSpotlight)}
      {activityDate(detailModal.activityDate)}
      
      {address(detailModal.streetAddress1 + ', ' + detailModal.city + ', ' + detailModal.postalCode)}
      {cuisine(detailModal.cuisine)}
      {typeOfService(detailModal.typeOfService)}
      {detailModal.email && 'Email: ' + detailModal.email}
      {website(detailModal.website, 'Website: ')}
      {website(detailModal.facebook, 'Facebook: ')}
      {website(detailModal.instagram, 'Instagram: ')}
      {website(detailModal.twitter, 'Twitter: ')}
      {<br/>}
      <Title style={{ textAlign: 'center', fontSize: '12px', color: '#23e60e'}}>{detailModal.credit}</Title>
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
