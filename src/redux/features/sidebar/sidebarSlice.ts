import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isCollapsed: true,
  },
  reducers: {
    toggleCollapse: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
  },
});

export const { toggleCollapse, setCollapsed } = sidebarSlice.actions;
export default sidebarSlice.reducer;

export const selectIsCollapsed = (state: {
  sidebar: { isCollapsed: boolean };
}) => state.sidebar.isCollapsed;
