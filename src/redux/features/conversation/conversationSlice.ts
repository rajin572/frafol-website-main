/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { IConversation } from "@/types/conversation.type";
// import { IConversation } from "../../../types/conversation.type";

// Define types for each part of the state

interface ConversationState {
  onlineUser: any;
  typingUser: boolean;
  selectedChatUser: IConversation | null;
  chatMessages: any;
}

// Initial state
const initialState: ConversationState = {
  onlineUser: [],
  typingUser: false,
  selectedChatUser: null,
  chatMessages: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<any[]>) => {
      state.onlineUser = action.payload;
    },
    setTypingUser: (state, action: PayloadAction<boolean>) => {
      state.typingUser = action.payload;
    },
    setSelectedChatUser: (state, action: PayloadAction<any | null>) => {
      state.selectedChatUser = action.payload;
    },
    clearSelectedChatUser: (state) => {
      state.selectedChatUser = null;
    },
    setChatMessages: (state, action: PayloadAction<any[]>) => {
      state.chatMessages = action.payload;
    },
  },
});

// Action creators
export const {
  setOnlineUsers,
  setTypingUser,
  setSelectedChatUser,
  clearSelectedChatUser,
  setChatMessages,
} = conversationSlice.actions;

// Selectors
export const selectOnlineUsers = (state: RootState) =>
  state.conversation.onlineUser;
export const selectTypingUser = (state: RootState) =>
  state.conversation.typingUser;
export const selectSelectedChatUser = (state: RootState) =>
  state.conversation.selectedChatUser;
export const selectChatMessages = (state: RootState) =>
  state.conversation.chatMessages;

// Export reducer
export default conversationSlice.reducer;
