import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {item, Status} from "./mondaySlice";

type State = {
    items: item[];
    status: Status;
}


export const fetchTuesdayTask = createAsyncThunk<item[]>(
    'pizza/fetchTuesdayStatus',
    async (params) => {
        const { data } = await  axios.get<item[]>(
            `http://localhost:3002/tuesday`,
        )
        return data;
    }
)

const initialState : State = {
    items:[],
    status: Status.LOADING,
};



const tuesdaySlice = createSlice({
    name: 'tuesday',
    initialState,

    reducers: {
        setItemsTuesday(state, action){
            state.items = action.payload;
        },
        addItem(state, action:PayloadAction<item>){
            state.items.push({
                ...action.payload,
            })
        },
        removeItemTuesday(state, action:PayloadAction<string>){
            state.items = state.items.filter((obj) => obj.id != action.payload);
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchTuesdayTask.pending, (state) => {
            // Add user to the state array
            state.status = Status.LOADING;
            state.items =[];
        })
        builder.addCase(fetchTuesdayTask.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchTuesdayTask.rejected, (state, action) => {
            // Add user to the state array
            state.status = Status.ERROR,
                state.items =[];
        })
    },
})

export const selectTuesday = (state: RootState) => state.tuesday;
export const { setItemsTuesday, addItem,removeItemTuesday } = tuesdaySlice.actions;

export default tuesdaySlice.reducer;