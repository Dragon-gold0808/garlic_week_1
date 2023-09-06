import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: {
    _id: '',
    category: '',
    typeOfParticipant: '',
    garlickyFeature: '',
    address: '',
    date: '',
    city: '',
    postalCode: '',
    email: '',
    website: '',
    insta: '',
    hours: '',
    streetAddress2: '',
    tel: '',
    facebook: '',
    twitter: '',
    otherSocialMedia: '',
    details: '',
    businessName: '',
    restaurant: '',
    coordinate: [],
  },
  filter: {
    category: [],
    city: [],
  },
  filteredEvents: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchedItem: (state, action) => {
      state.item = action.payload;
    },
    setCityFilter: (state, action) => {
      // state.query = action.payload.query;
      state.filter.city = action.payload;
    },
    changeEvents: (state, action) => {
      state.filteredEvents = action.payload;
    },
  },
});

export const { setCityFilter, changeEvents, setSearchedItem } = filterSlice.actions;

export default filterSlice.reducer;
