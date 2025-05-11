import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  result: string;
  displaynumbers: string[];
}

const initialState: CounterState = {
  result: "",
  displaynumbers: [
    "c",
    "B",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    " 4",
    "5",
    "6",
    "+",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
  ],
};

const calcultorSlice = createSlice({
  name: "calcultor",
  initialState,
  reducers: {
    addCalcultion: (state, action: PayloadAction<string>) => {
      state.result = action.payload;
    },

    selectedButton: (state, action: PayloadAction<string>) => {
      //can not c and b, =
      state.result += Array.from(action.payload)
        .filter((el: string) => el !== "c" && el !== "B" && el !== "=")
        .join("");
    },
    backSpace: (state) => {
      state.result = state.result.slice(0, -1);
    },
    clear: (state) => {
      state.result = "";
    },
  },
});

export const { addCalcultion, selectedButton, backSpace, clear } =
  calcultorSlice.actions;
export default calcultorSlice.reducer;
