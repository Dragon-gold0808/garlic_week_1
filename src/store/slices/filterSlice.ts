import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  filter: {
    category: [],
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      // state.query = action.payload.query;
      state.filter.category = action.payload;
    },
  },
});

export const { changeFilter } = filterSlice.actions;

export default filterSlice.reducer;
