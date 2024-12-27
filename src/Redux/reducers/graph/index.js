import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loseBallTypeData: []
};

const graphSlice = createSlice({
  name: 'graph',
  initialState: initialState,
  reducers: {
    setLoseBallTypeData: (state, action) => ({ loseBallTypeData: action.payload })
  }
});

export const { setLoseBallTypeData } = graphSlice.actions;

export default graphSlice.reducer;
