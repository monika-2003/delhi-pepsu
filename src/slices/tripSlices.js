
import { createSlice } from "@reduxjs/toolkit";

const tripSlices = createSlice({
    name: "trip",
    initialState: {
     challan_sum:[],
     total_package_sum:[],
     actual_weight_sum:[],
     crossing_weight_sum:[],
     our_weight_sum:[],
     index:undefined,
     challan_id_arr:[]
    },
    reducers: {
        // pushChaal:(state,action) => {
        //     state.bilty_arr.push(action.payload);
        // },
        // popBilty:(state,action)=>{
        //     state.bilty_arr.splice(action.payload,1);
        //     console.log("")
        // },
        clearChallan:(state)=>{
            state.challan_sum.splice(0,state.challan_sum.length);
        },
        pushChallan:(state,action) => {
            let flag = true;
            
            for(let i=0;i<state.challan_sum.length;i++){
                if(action.payload.booking_chalan_no === state.challan_sum[i].booking_chalan_no){
                    flag=false;
                }
            }

            if(flag){
                state.challan_sum.push(action.payload);
            }
        },
        popChallan:(state,action) => {
            let idx = undefined
            for(let i=0;i<state.challan_sum.length;i++){
                if(action.payload === state.challan_sum[i].booking_chalan_no){
                    idx = i;
                }
            }
            state.challan_sum.splice(idx,1);
        },
        // Package and pop package
        pushPackage:(state,action) => {
            // let flag = false;
            // // for not letting duplicate items
            // for(let i=0;i<state.total_package_sum.length;i++){
            //     if(state.bilty_arr[i].bilty_no === action.payload.bilty_no){
            //         flag = true;
            //     }
            // }

            // //finding index and replace
            // let idx = state.bilty_arr.length;
            // for(let i=0;i<state.bilty_arr.length;i++){
            //     if(state.bilty_arr[i].bilty_no > action.payload.bilty_no){
            //         console.log("REDUX_TEST_ID",i)
            //         idx = i;
            //         break;
            //     }
            // }

            // if(!flag){
            //     console.log("REDUX_TEST",idx)
            //     state.bilty_arr.splice(idx,0,action.payload);
            // }
            let flag = false
            state.total_package_sum.forEach((el,ind) => {
                if(state.total_package_sum[ind][action.payload]){                                                          
                    flag=true
                }
            });  

            if(!flag){
                state.total_package_sum.push(action.payload);
            }
        },
        popPackage:(state,action) => {      
            let idx = undefined;

            state.total_package_sum.forEach((el,ind) => {
                if(state.total_package_sum[ind][action.payload]){                                                          
                    idx = ind;
                }
            });  

            // for(let i=0;i<=state.total_package_sum.length;i++){
            //     for (var key in state.total_package_sum[i]){
            //         if(key == action.payload)
            //             delete state.total_package_sum[i][key]
            //     }
            // }
            state.total_package_sum.splice(idx,1);
        },
        // Actual Weight
        pushActualWeightSum:(state,action) => {
            state.actual_weight_sum.push(action.payload);
        },
        popActualWeightSum:(state,action) => {      
            let idx = undefined;             
            state.actual_weight_sum.forEach((el,ind) => {
                if( state.actual_weight_sum[ind][action.payload]){                                                          
                    idx = ind;
                }
            });  
           state.actual_weight_sum.splice(idx,1);
        },
        // Crossing Weight
        pushCrossingWeightSum:(state,action) => {
            state.crossing_weight_sum.push(action.payload);
        },
        popCrossingWeightSum:(state,action) => {
            let idx = undefined;             
            state.crossing_weight_sum.forEach((el,ind) => {
                if( state.crossing_weight_sum[ind][action.payload]){                                                          
                    idx = ind;
                }
            });  
           state.crossing_weight_sum.splice(idx,1);
            
        },
        // Our Weight
        pushOurWeightSum:(state,action) => {
            state.our_weight_sum.push(action.payload);
        },
        popOurWeightSum:(state,action) => {
            let idx = undefined;             
            state.our_weight_sum.forEach((el,ind) => {
                if( state.our_weight_sum[ind][action.payload]){                                                          
                    idx = ind;
                }
            });  
           state.our_weight_sum.splice(idx,1);
        },
        // isAuth:state => {
        //     state.loggedInValue = true;
        // },
        // loggedOutFromReducers: state => {
        //     state.loggedInValue = false;
        // }
    }
});
export const { 
    pushChallan,
    popChallan,
    pushPackage,
    popPackage,
    pushActualWeightSum,
    popActualWeightSum,
    pushCrossingWeightSum,
    popCrossingWeightSum,
    pushOurWeightSum,
    popOurWeightSum,
    // pushBilty,
    clearChallan,
    // popBilty
} = tripSlices.actions;

export default tripSlices.reducer;