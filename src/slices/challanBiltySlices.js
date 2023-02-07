import { createSlice } from "@reduxjs/toolkit"

const biltySlices = createSlice({
    name:"bilty",
    initialState:{
        bilty_arr:[]
    },
    reducers:{
        pushBilty:(state,action) => {
            let flag = false;
            // for not letting duplicate items
            for(let i=0;i<state.bilty_arr.length;i++){
                if(state.bilty_arr[i].bilty_no === action.payload.bilty_no){
                    flag = true;
                }
            }

            //finding index and replace
            let idx = state.bilty_arr.length;
            for(let i=0;i<state.bilty_arr.length;i++){
                if(state.bilty_arr[i].bilty_no > action.payload.bilty_no){
                    console.log("REDUX_TEST_ID",i)
                    idx = i;
                    break;
                }
            }

            if(!flag){
                console.log("REDUX_TEST",idx)
                state.bilty_arr.splice(idx,0,action.payload);
            }
        },

        popBilty:(state,action) => {
        //     let idx = undefined;             
        //     console.log("ID_PAYLOAD",action.payload);
        //    for(let i=0;i<state.bilty_arr.length;i++){
        //         if(state.bilty_arr[i].bilty_no === action.payload){
        //             idx = i;
        //         }
        //    }
           state.bilty_arr.splice(action.payload,1);
           console.log("")
        },

        clearBilty:(state)=>{
            state.bilty_arr.splice(0,state.bilty_arr.length);
        }
    }
});

export const { 
    pushBilty,
    popBilty,
    clearBilty
} = biltySlices.actions;

export default biltySlices.reducer;
