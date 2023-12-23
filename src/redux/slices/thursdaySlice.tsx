import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../store";
import {item, Status} from "./mondaySlice";

type State = {
    items: item[];
    status: Status;
}


export const fetchThursdayTask = createAsyncThunk<item[]>(
    'pizza/fetchThursdayStatus',
    async (params) => {
        const { data } = await  axios.get<item[]>(
            `http://localhost:3002/thursday`,
        )
        return data;
    }
)

const initialState : State = {
    items:[],
    status: Status.LOADING,
};



const thursdaySlice = createSlice({
    name: 'thursday',
    initialState,

    reducers: {
        setItemsThursday(state, action){
            state.items = action.payload;
        },
        addItem(state, action:PayloadAction<item>){
            state.items.push({
                ...action.payload,
            })
        },
        removeItemThursday(state, action:PayloadAction<string>){
            state.items = state.items.filter((obj) => obj.id != action.payload);
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchThursdayTask.pending, (state) => {
            // Add user to the state array
            state.status = Status.LOADING;
            state.items =[];
        })
        builder.addCase(fetchThursdayTask.fulfilled, (state, action) => {
            // Add user to the state array
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchThursdayTask.rejected, (state, action) => {
            // Add user to the state array
            state.status = Status.ERROR,
                state.items =[];
        })
    },
})

export const selectThursday = (state: RootState) => state.thursday;
export const { setItemsThursday, addItem,removeItemThursday } = thursdaySlice.actions;


export default thursdaySlice.reducer;