import { createSlice } from "@reduxjs/toolkit"

const unloadingBiltySlices = createSlice({
    name:"unloading",
    initialState:{
        unloading_bilty_arr:[]
    },
    reducers:{
        pushUnloadingBilty:(state,action) => {
            state.unloading_bilty_arr.push(action.payload);
        },

        popUnloadingBilty:(state,action) => {        
           state.unloading_bilty_arr.splice(action.payload,1);           
        },

        clearUnloadingBilty:(state)=>{
            state.unloading_bilty_arr.splice(0,state.unloading_bilty_arr.length);
        }
    }
});

export const { 
    pushUnloadingBilty,
    popUnloadingBilty,
    clearUnloadingBilty
} = unloadingBiltySlices.actions;

export default unloadingBiltySlices.reducer;
