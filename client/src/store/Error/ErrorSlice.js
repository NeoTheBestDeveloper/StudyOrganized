import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: 'error',
    initialState: {
        messages: [],
        hidden: true,
        shownCount: 0,
    },
    reducers: {
        showMessages(state, action) {
            state.messages = action.payload;
            state.hidden = false;
        },
        closeMessage(state) {
            state.messages = [];
            state.hidden = true;
            state.shownCount = 0;
        },
        incrementShownMessages(state) {
            state.shownCount++;
        },
    },
});

export default errorSlice.reducer;
export const { showMessages, closeMessage, incrementShownMessages } = errorSlice.actions;
