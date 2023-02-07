import React,{useEffect,useState} from "react";
import DynamicViewTable from "./DynamicViewTable";
import Popup from "reactjs-popup";
import { tripApiConfig } from "../config/apiConfig.js";
import {
  groupInfo,
  dataObject,
  tripChallanTableItems,
  tripChallanTableHeader,
  popupInfo,
} from "../config/tripConfig.js";
import { SERVER_URL } from "../config/config";
import { Prompt } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import "./Form.css";
import "./TripForm.css";
import "./AutoSuggest.css";
import useForm from "./useForm";
import "./popup.css";
import { validate } from "../config/tripConfig";
import DatePicker from "react-datepicker";
import FormColumn from "./FormColumn.js";
import print from "print-js";
import { useLocation } from "react-router-dom";

// Redux
import {useDispatch,useSelector} from "react-redux";
import { 
  pushPackage,
  popPackage,
  pushActualWeightSum,
  popActualWeightSum,
  pushCrossingWeightSum,
  popCrossingWeightSum,
  pushOurWeightSum,
  popOurWeightSum,
  pushChallan,
  popChallan,
  clearChallan,  
  // pushBilty,
  // clearBilty,
  // popBilty
} from "../slices/tripSlices"


const Trip = ({ sessionObject }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showTable,setShowTable] = useState(false);
  const [disableButton,setDisableButton] = useState(true);
  const [counter,setCounter] = useState(0);
  let variablesFromSession = {
    station_from: String(sessionObject.sessionVariables.branch_id),
    station_from_name: sessionObject.sessionVariables.branch_name,
    created_from: String(sessionObject.sessionVariables.branch_id),
    created_by: String(sessionObject.sessionVariables.user_id),
    login_user_id: String(sessionObject.sessionVariables.user_id),
    role_id: String(sessionObject.sessionVariables.role_id),
    company_id: sessionObject.sessionVariables.company_id ?? "1",
    fYear: sessionObject.sessionVariables.financial_year,
};

  useEffect(() => {
    console.log("PULKIT_USE_EFFECT------",variablesFromSession);
  },[])

  const myForm = useForm(
    "Trip",
    validate,
    { ...dataObject, ...variablesFromSession },
    tripApiConfig
  );

  const contentStyle = {
    maxWidth: "600px",
    width: "90%",
  };

  const reduxCall = () => {

    const package_val = useSelector(state => state.trip_reducers.total_package_sum);
    const actual_weight_val = useSelector(state => state.trip_reducers.actual_weight_sum);
    const crossing_weight_val = useSelector(state => state.trip_reducers.crossing_weight_sum);
    const our_weight_val = useSelector(state => state.trip_reducers.our_weight_sum);
    const total_challan = useSelector(state => state.trip_reducers.challan_sum)
  
    // all myForm after redux solutions

    console.log("PULKIT_VALFORM_INITIAL_VALUE ==============",myForm.pageState.challan_ids)
    

    let package_temp = 0;
    let actual_temp = 0;
    let cross_temp = 0;
    let our_temp = 0;
    
    if(total_challan.length > 0){      
      for(let i=0;i<total_challan.length;i++){      
        package_temp += total_challan[i].total_pkgs;
        actual_temp += total_challan[i].total_weight;
        if(total_challan[i].is_crossing_challan){
          cross_temp += total_challan[i].total_weight
        }
        if(!total_challan[i].is_crossing_challan){
          our_temp += total_challan[i].total_weight
        }
      }
    }

   
    myForm.pageState.total_pkg = package_temp;
    myForm.pageState.actual_weight = actual_temp;
    myForm.pageState.our_weight = our_temp;
    myForm.pageState.crossing_weight = cross_temp;
    
  }
  
  reduxCall();

  useEffect(() => {
    if(myForm.pageState.vehicle_no.length > 5){
      setDisableButton(false);
    }
  },[myForm.pageState.vehicle_no])

  // useEffect(() => {

  // },[myForm.pageState.])

  // const calculatingChallandIds = () => {
  //   console.log("PULKIT_CHALLAN_LENGTH",myForm.pageState.challan_ids)
  //   for(let i=0;i<myForm.pageState.challan_ids.length;i++){
  //     let temp_arr = myForm.pageState.challan_ids[i];
  //     let key = temp_arr.booking_chalan_no
  //     if(temp_arr.total_pkgs){
  //       let new_state = {}
  //       new_state[key] = temp_arr.total_pkgs
  //       dispatch(pushPackage(new_state));        
  //     }
  //     if(temp_arr.total_weight){
  //       let new_state = {}
  //       new_state[key] = temp_arr.total_weight
  //       dispatch(pushActualWeightSum(new_state));
  //     }
  //     if(temp_arr.is_crossing_challan){        
  //       let new_state = {}
  //       new_state[key] = temp_arr.total_weight;          
  //       dispatch(pushCrossingWeightSum(new_state))
  //     }
  //     if(!temp_arr.is_crossing_challan){          
  //       let new_state = {}
  //       new_state[key] = temp_arr.total_weight;
  //       dispatch(pushOurWeightSum(new_state))
  //     }
  //   }
  //   setShowTable(true);
  // }

  // useEffect(() =>{
  //   calculatingChallandIds();
  // },[myForm.pageState.is_redux_call])

  // useEffect(() => {
  //   calculatingChallandIds();
  // },[])


  // For redux Test

  useEffect(() =>{
    for(let i=0;i<myForm.pageState.challan_ids.length;i++){
      let temp_arr = myForm.pageState.challan_ids[i];
      dispatch(pushChallan(temp_arr))
      // console.log("PULKIT_VALFORM_INSIDE_IS_REDUX_CALL",temp_arr)
      // let key = temp_arr.booking_chalan_no
      // if(temp_arr.total_pkgs){
      //   let new_state = {}
      //   new_state[key] = temp_arr.total_pkgs
      //   dispatch(pushPackage(new_state));        
      // }
      // if(temp_arr.total_weight){
      //   let new_state = {}
      //   new_state[key] = temp_arr.total_weight
      //   dispatch(pushActualWeightSum(new_state));
      // }
      // if(temp_arr.is_crossing_challan){        
      //   let new_state = {}
      //   new_state[key] = temp_arr.total_weight;          
      //   dispatch(pushCrossingWeightSum(new_state))
      // }
      // if(!temp_arr.is_crossing_challan){          
      //   let new_state = {}
      //   new_state[key] = temp_arr.total_weight;
      //   dispatch(pushOurWeightSum(new_state))
      // }
    }
    setShowTable(true);
  },[myForm.pageState.is_redux_call])

  const fetchDataTemp = async () => {
    dispatch(clearChallan())
    if(myForm.pageState.vehicle_no!=undefined || myForm.pageState.vehicle_no!=""){
      const url = SERVER_URL + "/challan/multi_trip_in/"+myForm.pageState.vehicle_id+"?fyear="+variablesFromSession.fYear+"&companyId="+variablesFromSession.company_id
      
      const res = await fetch(url);
      const response = await res.json();
      console.log("RESPONSE",typeof response.data);
      linkBilty({},response.data)
      setDisableButton(true)
    }
  }
  
  const calculationCall = () => {

    let p = myForm.pageState;

    if( parseFloat(myForm.pageState.truck_weight)  && myForm.pageState.rate_on == "1"){
      myForm.pageState.truck_hire = parseFloat(myForm.pageState.truck_weight) * parseFloat(myForm.pageState.rate) || 0;
    }
    if((parseFloat(myForm.pageState.rate) && parseFloat(myForm.pageState.total_pkg)) && myForm.pageState.rate_on == "2"){
      myForm.pageState.truck_hire = parseFloat(myForm.pageState.total_pkg) * parseFloat(myForm.pageState.rate) || 0;
    }
    if(myForm.pageState.rate_on == "3"){
      myForm.pageState.truck_hire =  parseFloat(myForm.pageState.rate) || 0;
    }
  
    // if((parseFloat(myForm.pageState.rate) > 0) && (parseFloat(myForm.pageState.other_charge) > 0) && (parseFloat(myForm.pageState.cash_received_by_driver) > 0)) {
    //   myForm.pageState.gross_amount = parseFloat(myForm.pageState.rate) + parseFloat(myForm.pageState.other_charge) + parseFloat(myForm.pageState.cash_received_by_driver);
    // }else{myForm.pageState.gross_amount = 0}
  
    
    myForm.pageState.gross_amount = Math.ceil(parseFloat(myForm.pageState.truck_hire) + parseFloat(myForm.pageState.other_charge) + parseFloat(myForm.pageState.cash_received_by_driver) + parseFloat(p.labour_calculation)) || 0;
    
   
    myForm.pageState.labour_calculation = parseInt((parseFloat(myForm.pageState.labour) * parseFloat(myForm.pageState.actual_weight))/100) || 0;
    
    myForm.pageState.rebate_calculation = parseInt((parseFloat(myForm.pageState.rebate) * parseFloat(myForm.pageState.our_weight))/100) || 0;
    
    myForm.pageState.crossing_calculation = parseInt((parseFloat(myForm.pageState.crossing) * parseFloat(myForm.pageState.crossing_weight))/100) || 0;
    
    p.tds_amount = Math.ceil((((p.truck_hire + p.labour_calculation) * p.tds_rate)/100)) || 0;

    // if(parseFloat(myForm.pageState.tds_rate) >= 0){      
    //   p.truck_hire = parseFloat(p.truck_hire);
    //   p.labour_calculation = parseFloat(p.labour_calculation);
    //   p.tds_rate = parseFloat(p.tds_rate);
    // }



    console.log("AFTER_FORMS-> ",myForm.pageState)

    
    p.pay_to_driver =  parseInt(myForm.pageState.gross_amount) - parseFloat(myForm.pageState.advance_bhada) - parseFloat(myForm.pageState.tds_amount) || 0;
    
    // net_amount = total_to_pay - rebate - crossing_calculation - pay_to_driver
    // if(parseFloat(p.rebate_calculation) > 0  && parseFloat(p.total_to_pay) > 0 && p.crossing_calculation!=undefined ){
    p.net_amount = (parseInt(p.total_to_pay) - parseInt(p.rebate_calculation) - parseInt(p.crossing_calculation)  - parseInt(p.pay_to_driver)) || 0;

    // Test Remain
    // if(myForm.pageState.challan_ids.length>0){
    let total = 0;
    let paid = 0;
    let to_be = 0;
    let len = myForm.pageState.challan_ids
    
    
    for(let i=0;i<len.length;i++){                
      
      let llen = len[i].bilty_info;
      
      for(let j=0;j<llen.length;j++){
        if(llen[j].pay_type_name == "To Pay"){            
          total += parseFloat(llen[j].total_amount);            
        }
        if(llen[j].pay_type_name == "PAID"){            
          paid += parseFloat(llen[j].total_amount);            
        }
        if(llen[j].pay_type_name == "To Be Billed"){            
          to_be += parseFloat(llen[j].total_amount);            
        }
      }          
    }
    myForm.pageState.total_to_pay = total? total : 0;
    myForm.pageState.total_to_paid = paid;
    myForm.pageState.to_be_billed = to_be;
    // } 
  }

  calculationCall();

  

  useEffect(() => {    
    console.log("REDUX_CALL_DELETED_CHALLAN_NO",myForm.pageState.deleted_chalan_no)
    let p = myForm.pageState;
    
    // // if(myForm.pageState.challan_ids.length>0){
    //   let total = 0;
    //   let paid = 0;
    //   let to_be = 0;
    //   let len = myForm.pageState.challan_ids
      
    //   for(let i=0;i<len.length;i++){                
        
    //     let llen = len[i].bilty_info;
        
    //     for(let j=0;j<llen.length;j++){
    //       if(llen[j].pay_type_name == "To Pay"){            
    //         total += parseFloat(llen[j].total_amount);            
    //       }
    //       if(llen[j].pay_type_name == "PAID"){            
    //         paid += parseFloat(llen[j].total_amount);            
    //       }
    //       if(llen[j].pay_type_name == "To Be Billed"){            
    //         to_be += parseFloat(llen[j].total_amount);            
    //       }
    //     }          
    //   }
    //   myForm.pageState.total_to_pay = total;
    //   myForm.pageState.total_to_paid = paid;
    //   myForm.pageState.to_be_billed = to_be;
    // // }   
  },[myForm.pageState])

  

  console.log("PAGE",myForm.pageState);

  useEffect(() => {
    console.log("Ratees => ",myForm.pageState.rate_on);
    if((myForm.pageState.rate && myForm.pageState.truck_weight) && myForm.pageState.rate_on == "1"){
      myForm.pageState.truck_hire = parseInt(myForm.pageState.truck_weight) * parseInt(myForm.pageState.rate)
    }
    if((myForm.pageState.rate && myForm.pageState.total_pkg) && myForm.pageState.rate_on == "2"){
      myForm.pageState.truck_hire = parseInt(myForm.pageState.total_pkg) * parseInt(myForm.pageState.rate)
    }
    if(myForm.pageState.rate_on == "3"){
      myForm.pageState.truck_hire =  parseInt(myForm.pageState.rate)
    }
  },[myForm.pageState.rate_on])
  
  useEffect(() => {

    console.log("PULKIT_VALFORM",myForm.pageState.idDelete," INIT",myForm.pageState.deleted_chalan_no);
    
    
    dispatch(popPackage(myForm.pageState.deleted_chalan_no));
    dispatch(popActualWeightSum(myForm.pageState.deleted_chalan_no));
    dispatch(popChallan(myForm.pageState.deleted_chalan_no))

    if(myForm.pageState.deleted_crossing_weight){
      dispatch(popCrossingWeightSum(myForm.pageState.deleted_chalan_no));
    }else{
      dispatch(popOurWeightSum(myForm.pageState.deleted_chalan_no));
    }
    
    console.log("PULKIT_VALFORM",myForm.pageState.challan_ids);

  },[myForm.pageState.deleted_chalan_no]);





  React.useEffect(() => {
    // console.log(myForm.pageState);
    const defaultTripNo = location.state ?? "";
    console.log(defaultTripNo);
    if(defaultTripNo != "") {
        myForm.setPageState((oldPageState) =>({
            ...oldPageState,
            "trip_no": defaultTripNo,
        }))

        const fakeKey = { key: "Enter" }
        myForm.getPageOnKeyEnter(fakeKey, defaultTripNo);
    }
}, []);


// if(myForm.pageState.deleted_chalan_no ===undefined && myForm.pageState.is_redux_call === 1){
//   console.log("REDUX_CALL_CALLED",myForm.pageState.challan_ids.length,"AND ->",myForm.pageState.deleted_chalan_no);
  
//   // reduxCall();
// }

  const checkIfFieldAlreadyExists = (fieldKey, fieldValue, arrayToCheck) => {
    let dummyObject = {};
    for (let i = 0; i < arrayToCheck.length; i++) {
      dummyObject = arrayToCheck[i];
      if (fieldKey in dummyObject && dummyObject[fieldKey] == fieldValue) {
        return true;
      }
    }
    return false;
  };

  const checkVisibilityCondition = (fieldInfo) => {
    // console.log("field info", fieldInfo, myForm.pageState.role_id)
    if (fieldInfo.name == "edit_button" && myForm.pageState.role_id != "1") {
      return false;
    } else {
      return true;
    }
  };

  const checkDisabledCondition = (fieldInfo) => {
    if (myForm.pageMode == "view") {
      return "disabled";
    } else if (fieldInfo.name == "balance_bhada" || fieldInfo.name == "tds_amount" || fieldInfo.name == "net_balance") {
      return "disabled";
    } else if (fieldInfo.name == "bhada_paid_branch_name") {
      return "disabled";
    } else if (myForm.pageMode == "edit" && fieldInfo.name == "input_date" && myForm.pageState.role_id != 1) {
      return "disabled";
    } else if(fieldInfo.name == "total_pkg" || fieldInfo.name == "actual_weight" || fieldInfo.name == "our_weight" || fieldInfo.name == "crossing_weight" || fieldInfo.name == "truck_hire" || fieldInfo.name == "total_to_pay") {
      return "disabled";
    }
    else {
      return "";
    }
  };

  const getAdditionalInfoForSuggestionFetch = (fieldInfoObject) => {
    // if (fieldInfoObject.name == "vehicle_no"){
    //   return {"limit": "10"};
    // }
    let additionalInfoObject = {};
    if (fieldInfoObject.name == "station_from_name") {
      additionalInfoObject.is_branch = true;
      // additionalInfoObject.pay_type = myForm.pageState.pay_type;
      return additionalInfoObject;
    }
    return null;
  };

  // const linkBilty = async (e) => {
  //   if (e.target.value == "" && e.key == "Enter") {
  //     myForm.makeFocusOnParticularField("save_button");
  //     return;
  //   }
  //   if (e.key == "Enter") {
  //       const fYear_fetch = JSON.parse(sessionStorage.getItem("financial_year_for_fetch")).financial_year_for_fetch;
  //     // TODO: hit api here, changes for bilty_info
  //     const url = SERVER_URL + "/challan/trip_in/" + e.target.value
  //                   + "?fyear=" + fYear_fetch + "&companyId=" + myForm.pageState.company_id;
  //     const response = await fetch(url);

  //     console.log("Response", response);
  //     if (!response.ok) {
  //       myForm.setPageState({
  //         ...myForm.pageState,
  //         ["No"]: "Invalid Challan",
  //       });
  //       return;
  //     }
  //     const temp_response = await response.json();
  //     if (temp_response.check_fail) {
  //       myForm.setPageState({
  //         ...myForm.pageState,
  //         ["No"]: "Not possible to add this challan",
  //       });
  //       return;
  //     }
  //     if (
  //       checkIfFieldAlreadyExists(
  //         "booking_chalan_no",
  //         temp_response.booking_chalan_no,
  //         myForm.pageState.challan_ids
  //       )
  //     ) {
  //       myForm.setPageState({
  //         ...myForm.pageState,
  //         ["No"]: "Already Present",
  //       });
  //       return;
  //     }
  //     const newState = {
  //       challan_ids: [...myForm.pageState["challan_ids"], temp_response],
  //       ["No"]: "",
  //     };
  //     myForm.setPageState({
  //       ...myForm.pageState,
  //       ...newState,
  //     });
  //   }
  // };

  const linkBilty = async (e, argResponse) => {
    console.log("TET_DATA_LINKBILTY",argResponse);
    const fYear_fetch = JSON.parse(sessionStorage.getItem("financial_year_for_fetch")).financial_year_for_fetch;
    let temp_response;
    if(argResponse) {
        temp_response = argResponse;
    }
    else {
        if (myForm.pageState.No == "" && e.key == "Enter") {
            myForm.makeFocusOnParticularField("save_button");
            return;
        }
        if (e.key == "Enter") {
            let flag = 0;
            if (
                myForm.pageState.bilty_type == "c" ||
                myForm.pageState.bilty_type == "C"
            ) {
                flag = 1;
            }
            let suffix = myForm.pageState.suffix;
            if (suffix == "") {
                suffix = "null";
            }
            const url = SERVER_URL + "/challan/trip_in/" + e.target.value+ "?fyear=" + fYear_fetch + "&companyId=" + myForm.pageState.company_id;
            const response = await fetch(url);
            console.log("Response", response);
            if (!response.ok) {
                const temp_error = await response.json();
                if ("detail" in temp_error) {
                    if (temp_error.detail == "Bilty not found") {
                        myForm.makeFocusOnParticularField("bilty_no");
                        return;
                    }
                    myForm.setPreviousPageMode(myForm.pageMode);
                    myForm.setPageMode("error");
                    myForm.setPopupError(String(temp_error.detail));
                } else {
                    myForm.setPreviousPageMode(myForm.pageMode);
                    myForm.setPageMode("error");
                    myForm.setPopupError("Invalid Bilty");
                }
                myForm.setPageState({
                    ...myForm.pageState,
                    ["No"]: "",
                    ["suffix"]: "",
                });
                return;
            }
            temp_response = await response.json();
            console.log("PULKIT_ERESPONSE",temp_response)
        }
    }
   
    if (temp_response.check_fail) {
      myForm.setPageState({
        ...myForm.pageState,
        ["No"]: "Not possible to add this challan",
      });
      return;
    }
    if (
      checkIfFieldAlreadyExists(
        "booking_chalan_no",
        temp_response.booking_chalan_no,
        myForm.pageState.challan_ids
      )
    ) {
      myForm.setPageState({
        ...myForm.pageState,
        ["No"]: "Already Present",
      });
      return;
    }
    

    // dispatch(pushBilty(temp_response))
    // const newState = {
    //     bilty_ids: [temp_response, ...myForm.pageState["bilty_ids"]],
    //     ["No"]: "",
    //     ["suffix"]: "",
    // };
    // console.log("DYNAMIC_VIEW_TABLE_NEW_STATE",newState);
    // myForm.setPageState({
    //     ...myForm.pageState,
    //     ...newState,
    // });
    // myForm.makeFocusOnParticularField("bilty_type");
     
    console.log("DYNAMIC_VIEW_TABLE AND->",myForm.pageState)
    if(temp_response.length>1){
      let newState = {};
      console.log("PULKIT_TEST_BEFORE_REDUX",myForm.pageState)
      console.log("TEST_1_DYNAMIC_VIEW_TABLE",myForm.pageState,"temp_response",temp_response)
      for(let i=0;i<temp_response.length;i++){                 
          dispatch(pushChallan(temp_response[i]));  
          setCounter(counter+1);              
          newState = {
              challan_ids: [...temp_response],
              // bilty_ids: [temp_response],
              ["No"]: "",
              ["suffix"]: "",
              ["redux_challan"]:1,
              ['is_redux_call']:counter
          };                                                
          console.log("PULKIT_DYNAMIC_VIEW_TABLE_TEST_AFTER_ONE_BIKLTY",newState);
          myForm.setPageState({
              ...myForm.pageState,
              ...newState,
          });                
      }            
    }else{
      let newState = {}

      const innerStorageFunction = () => {
        dispatch(pushChallan(temp_response));        
        setCounter(counter+1);              
        newState = {
            challan_ids: [temp_response, ...myForm.pageState["challan_ids"]],
            // bilty_ids: [temp_response],
            ["No"]: "",
            ["suffix"]: "",
            ["redux_bilty"]:1,
            ['is_redux_call']:counter
        };
      }
      console.log("TEST_1_DYNAMIC_VIEW_TABLE",myForm.pageState,"temp_response",temp_response)
      if(myForm.pageState.challan_ids.length>0){
        for(let i=0;i<myForm.pageState.challan_ids.length;i++){
          if(temp_response.booking_chalan_no !== myForm.pageState.challan_ids[i].booking_chalan_no){
            innerStorageFunction()      
          }
        }
      }else{
        innerStorageFunction();
      }

      myForm.setPageState({
          ...myForm.pageState,
          ...newState,
      });
    } 

    console.log("TET_AFTER",myForm.pageState);

    myForm.makeFocusOnParticularField("rate");
};



  // const linkBilty = async (e,argResponse) => {

  //   let tempResponse;
  //   console.log("PULKIT_JUST_TEMP_RESPONSE",tempResponse)
  //   if(tempResponse){
  //     tempResponse = argResponse
  //   }else{

  //     // console.log("PULKIT_E",e.key)
  //     // if (e.length == undefined && e.key == "Enter") {
  //     //   myForm.makeFocusOnParticularField("rate_on");
  //     //   return;
  //     // }
  //     if(e){
  //       console.log("PULKIT_E_JUST",e)
  //       if (myForm.pageState.No == "" && e.key == "Enter") {
  //         myForm.makeFocusOnParticularField("rate_on");
  //         return;
  //       }
  //       if (e.key == "Enter") {
  //           const fYear_fetch = JSON.parse(sessionStorage.getItem("financial_year_for_fetch")).financial_year_for_fetch;
  //         // TODO: hit api here, changes for bilty_info
  //         const url = SERVER_URL + "/challan/trip_in/" + e.target.value
  //                       + "?fyear=" + fYear_fetch + "&companyId=" + myForm.pageState.company_id;
  //         const response = await fetch(url);
    
  //         console.log("Response", response);
  //         if (!response.ok) {
  //           myForm.setPageState({
  //             ...myForm.pageState,
  //             ["No"]: "Invalid Challan",
  //           });
  //           return;
  //         }
    
  //         const temp_response = await response.json();
  //         if (temp_response.check_fail) {
  //           myForm.setPageState({
  //             ...myForm.pageState,
  //             ["No"]: "Not possible to add this challan",
  //           });
  //           return;
  //         }
  //         if (
  //           checkIfFieldAlreadyExists(
  //             "booking_chalan_no",
  //             temp_response.booking_chalan_no,
  //             myForm.pageState.challan_ids
  //           )
  //         ) {
  //           myForm.setPageState({
  //             ...myForm.pageState,
  //             ["No"]: "Already Present",
  //           });
  //           return;
  //         }
    
  //         let temp_state = [...myForm.pageState["challan_ids"], temp_response];
          
  //         console.log("TEMP_STATE",temp_state);
    
  //         for (var key in temp_state) {
  //           console.log("temp_key " + key);
  //         }
    
  //         if(temp_state.length > 0){
    
            
  //           let temp_arr = temp_state.slice(-1).pop();
    
  //           let key = temp_arr.booking_chalan_no
            
            
  //           if(temp_arr.total_pkgs){
  //             let new_state = {}
  //             new_state[key] = temp_arr.total_pkgs
  //             dispatch(pushPackage(new_state));        
  //           }
  //           if(temp_arr.total_weight){
  //             let new_state = {}
  //             new_state[key] = temp_arr.total_weight
  //             dispatch(pushActualWeightSum(new_state));
  //           }
  //           if(temp_arr.is_crossing_challan){        
  //             let new_state = {}
  //             new_state[key] = temp_arr.total_weight;          
  //             dispatch(pushCrossingWeightSum(new_state))
  //           }
  //           if(!temp_arr.is_crossing_challan){          
  //             let new_state = {}
  //             new_state[key] = temp_arr.total_weight;
  //             dispatch(pushOurWeightSum(new_state))
  //           }
  //           temp_state.pop();
  //         }
    
          
    
  //         const newState = {
  //           challan_ids: [...myForm.pageState["challan_ids"], temp_response],
  //           ["No"]: "",
  //         };
          
          
  //         myForm.setPageState({
  //           ...myForm.pageState,
  //           ...newState,
  //         });
  //       }
  //     }
  //   }



  //   // To add more than one bilty in table

  //   if(tempResponse){
  //     if(tempResponse.length>1){
  //         let newState = {};
  //         console.log("PULKIT_TEST_BEFORE_REDUX",myForm.pageState)
  //         for(let i=0;i<tempResponse.length;i++){            
  //             dispatch(pushChallan(tempResponse[i]));                
  //             newState = {
  //                 challan_ids: [...tempResponse, ...myForm.pageState["challan_ids"]],
  //                 // bilty_ids: [temp_response],
  //                 ["No"]: "",
  //                 ["suffix"]: "",
  //                 ["redux_challan"]:1,
  //                 ['is_redux_call']:1
  //             };                                                
  //             console.log("PULKIT_DYNAMIC_VIEW_TABLE_TEST_AFTER_ONE_BIKLTY",newState);
  //             myForm.setPageState({
  //                 ...myForm.pageState,
  //                 ...newState,
  //             });                
  //         }            
  
  //         // console.log("DYNAMIC_VIEW_TABLE BEFORE NEW STATE and its bilty_arr",redux_bilty_arr);
  
  //         console.log("PULKIT_DYNAMIC_VIEW_TABLE",myForm.pageState)
  //     }else{
  //         console.log("TEST_1_DYNAMIC_VIEW_TABLE",myForm.pageState)
  //         dispatch(pushChallan(tempResponse));
  //         const newState = {
  //             challan_ids: [tempResponse, ...myForm.pageState["challan_ids"]],
  //             // bilty_ids: [temp_response],
  //             ["No"]: "",
  //             ["suffix"]: "",
  //             ["redux_bilty"]:1,
  //             ['is_redux_call']:1
  //         };
  
  //         myForm.setPageState({
  //             ...myForm.pageState,
  //             ...newState,
  //         });
  //     }
  //   }


  // };

  const handleDelete = async () => {
    const url = SERVER_URL + "/trip/?trip_no=" + myForm.pageState.trip_no
                + "&fyear=" + myForm.pageState.fYear_get + "&companyId=" + myForm.pageState.company_id;
    const response = await fetch(url, { method: "DELETE" });
    if (!response.ok) {
      console.log("Not able to delete challan");
      return;
    }
    const temp_response = await response.json();
    if (temp_response.is_deleted) {
      myForm.setPageState({ ...dataObject, ...variablesFromSession });
      myForm.setPageMode("write");
      window.location.reload();
      return;
    }
  };

  // let isBlocking = (myForm.pageState!=dataObject);
  // return (
  //   <div className="challan-form-container">
  //     {/* <Prompt
  //       when={
  //         JSON.stringify(myForm.pageState) !=
  //         JSON.stringify({ ...dataObject, ...variablesFromSession })
  //       }
  //       message={
  //         (location) =>
  //           `There is some unsaved data are you sure you want to leave it? ${myForm.pageState["Vehicle No."]}, 2132, ${dataObject["Vehicle No."]}`
  //         // `Are you sure you want to go to ${location.pathname}`
  //       }
  //     /> */}
  //     <div>
  //       <Popup
  //         // trigger={<button className="button"> Open Modal </button>}
  //         open={myForm.pageMode == "submitted" || myForm.pageMode == "error"}
  //         modal
  //         contentStyle={contentStyle}
  //         closeOnDocumentClick={false}
  //       >
  //         {(close) => (
  //           <div className="pop-up-container">
  //             <div className="pop-up-header">
  //               {" "}
  //               {myForm.pageMode == "submitted" ? (
  //                 <div>{popupInfo.success_header}</div>
  //               ) : (
  //                 <div>{popupInfo.error_header}</div>
  //               )}
  //               <div>
  //                 <a className="pop-up-close btn" onClick={close}>
  //                   &times;
  //                 </a>
  //               </div>
  //             </div>
  //             {myForm.pageMode == "submitted" ? (
  //               <div className="pop-up-content">
  //                 {popupInfo.success_title}
  //                 <br />
  //                 <div className="pop-up-fields">
  //                   <div className="pop-up-field">
  //                     <div className="pop-up-field-label">
  //                       {popupInfo.field_label_success}
  //                     </div>
  //                     <div className="pop-up-field-value">
  //                       {myForm.pageState[popupInfo.field_name_success]}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             ) : (
  //               <div className="pop-up-content">
  //                 {popupInfo.error_title}
  //                 <br />
  //                 <div className="pop-up-fields">
  //                   <div className="pop-up-field">
  //                     <div className="pop-up-field-label">
  //                       {popupInfo.field_label_error}
  //                     </div>
  //                     <div className="pop-up-field-value">
  //                       {myForm.popupError}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             )}
  //             <div className="pop-up-actions">
  //               <button
  //                 className="pop-up-button"
  //                 onClick={() => {
  //                   if (myForm.pageMode == "submitted") {
  //                     // sessionObject.saveSessionVariableByField("last_bilty_no", {"last_bilty_no":myForm.pageState.bilty_no})
  //                     myForm.setPageState({
  //                       ...dataObject,
  //                       ...variablesFromSession,
  //                     });
  //                     myForm.setPageMode("write");
  //                     window.location.reload();
  //                     close();
  //                   } else {
  //                     if (myForm.previousPageMode != "") {
  //                       myForm.setPageMode(myForm.previousPageMode);
  //                       myForm.setPreviousPageMode("");
  //                     } else {
  //                       myForm.setPageMode("write");
  //                     }
  //                     close();
  //                   }
  //                 }}
  //               >
  //                 Okay
  //               </button>
  //             </div>
  //           </div>
  //         )}
  //       </Popup>
  //     </div>

  //     <div className="form-header">Bhada Chitthi</div>
  //     <div onSubmit={myForm.handleSubmit} className="form" noValidate>
  //       <div className="form-title">
  //         <div className="form-row">
  //           <label className="form-label">Trip No:</label>
  //           <input
  //             className="form-input"
  //             type="text"
  //             name="trip_no"
  //             placeholder=""
  //             value={myForm.pageState.trip_no}
  //             onChange={myForm.handleChange}
  //             onBlur={() => {}}
  //             onKeyPress={(a) =>
  //               myForm.getPageOnKeyEnter(a, myForm.pageState.trip_no)
  //             }
  //             disabled={checkDisabledCondition({ name: "trip_no" })}
  //             ref={(a) => myForm.storeInputReferenceForSelect(a, "trip_no")}
  //           />
  //           {myForm.internalValidationErrors["trip_no"] && (
  //             <p>{myForm.internalValidationErrors["trip_no"]}</p>
  //           )}
  //           {myForm.pageMode == "view" && (
  //             <>
  //               {checkVisibilityCondition({ name: "edit_button" }) && (
  //                 <button
  //                   onClick={() => {
  //                     myForm.setPageMode("edit");
  //                   }}
  //                 >
  //                   Edit
  //                 </button>
  //               )}
  //               <button
  //                 onClick={() => {
  //                   myForm.setPageState({
  //                     ...dataObject,
  //                     ...variablesFromSession,
  //                   });
  //                   window.location.reload();
  //                   myForm.setPageMode("write");
  //                 }}
  //               >
  //                 Clear
  //               </button>
  //               {/* <button onClick={handleDelete}>Delete</button> */}
  //             </>
  //           )}
  //         </div>
  //         <div>
  //           <label className="form-label">Trip Date:</label>
  //           <input
  //             className="form-input-mr-statement-date"
  //             type="date"
  //             name="input_date"
  //             placeholder=""
  //             value={myForm.pageState.input_date}
  //             onChange={myForm.handleChange}
  //             ref={(a) => myForm.storeInputReferenceForSelect(a, "input_date")}
  //             disabled={checkDisabledCondition({ name: "input_date" })}
  //             // onKeyPress={(a) => {
  //             //   console.log("Here");
  //             //   if (a.key == "Enter") {
  //             //     myForm.makeFocusOnParticularField("consignor_name");
  //             //   }
  //             // }}
  //           />
  //         </div>
  //         <div className="form-row">
  //           <label className="form-last_bilty">Last Trip No:</label>
  //           <label className="form-last_bilty">
  //             {myForm.pageState.last_trip_no}
  //           </label>
  //         </div>
  //       </div>
  //       <div className="form-input-content-block-0">
  //         <div className="form-field-left">
  //           <FormColumn
  //             groupInfo={groupInfo}
  //             groupName="group-1"
  //             checkDisabledCondition={checkDisabledCondition}
  //             checkVisibilityCondition={checkVisibilityCondition}
  //             myFormObj={myForm}
  //             getAdditionalInfoForSuggestionFetch={
  //               getAdditionalInfoForSuggestionFetch
  //             }
  //           />
  //         </div>
  //         <div className="form-field-right">
  //           <FormColumn
  //             groupInfo={groupInfo}
  //             groupName="group-2"
  //             checkDisabledCondition={checkDisabledCondition}
  //             checkVisibilityCondition={checkVisibilityCondition}
  //             myFormObj={myForm}
  //             getAdditionalInfoForSuggestionFetch={
  //               getAdditionalInfoForSuggestionFetch
  //             }
  //           />
  //         </div>
  //       </div>
  //       <div className="chform-row">
  //         <label className="chform-label">Challan No:</label>
  //         <input
  //           className="chform-input"
  //           type="text"
  //           name="No"
  //           placeholder=""
  //           value={myForm.pageState["No"]}
  //           onChange={myForm.handleChange}
  //           onKeyPress={linkBilty}
  //           ref={(a) => myForm.storeInputReferenceForSelect(a, "challan_no")}
  //         />
  //       </div>
  //       <div className="table-container">
  //         <DynamicViewTable
  //           tableHeader={tripChallanTableHeader}
  //           tableItems={tripChallanTableItems}
  //           tableValues={myForm.pageState["challan_ids"]}
  //           setPageStateByField={myForm.setPageStateByField}
  //           pageStateArray={myForm.pageState["challan_ids"]}
  //           fieldMapping="challan_ids"
  //         />
  //       </div>
  //       <div className="form-footer">
  //         <button
  //           onClick={(e) => {
  //             console.log("Values", myForm.pageState);
  //             console.log("Values", myForm.pageState);
  //             myForm.setServerPrintNeeded(true);
  //             myForm.handleSubmit(e);
  //           }}
  //           type="button"
  //           ref={(a) => myForm.storeInputReferenceForSelect(a, "print_button")}
  //           className="btn btn-primary"
  //         >
  //           Print
  //         </button>
  //         <button
  //           onClick={myForm.handleSubmit}
  //           type="button"
  //           className="btn btn-primary"
  //           ref={(a) => myForm.storeInputReferenceForSelect(a, "save_button")}
  //         >
  //           Save
  //         </button>
  //         <button
  //           onClick={async () => {
  //             let url =
  //               SERVER_URL +
  //               "/trip/multiple_print/" +
  //               String(myForm.pageState.trip_no) +
  //               "?branch_id=" +
  //               String(myForm.pageState.created_from) + 
  //               "&fyear=" + myForm.pageState.fYear_get + "&companyId=" + myForm.pageState.company_id;

  //             let response = await fetch(url, {
  //               headers: {
  //                 Accept: "application/json",
  //                 "Content-Type": "application/json",
  //               },
  //             }).then((r) => r.blob());
  //             console.log("response", response);
  //             print({
  //               printable: URL.createObjectURL(response),
  //               type: "pdf",
  //               showModal: false,
  //             });
  //           }}
  //           type="button"
  //           className="btn btn-primary"
  //           // ref={(a) => myForm.storeInputReferenceForSelect(a, "save_button")}
  //         >
  //           Print All Memo
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="challan-form-container">
      {/* <Prompt
        when={
          JSON.stringify(myForm.pageState) !=
          JSON.stringify({ ...dataObject, ...variablesFromSession })
        }
        message={
          (location) =>
            `There is some unsaved data are you sure you want to leave it? ${myForm.pageState["Vehicle No."]}, 2132, ${dataObject["Vehicle No."]}`
          // `Are you sure you want to go to ${location.pathname}`
        }
      /> */}
      <div>
        <Popup
          // trigger={<button className="button"> Open Modal </button>}
          open={myForm.pageMode == "submitted" || myForm.pageMode == "error"}
          modal
          contentStyle={contentStyle}
          closeOnDocumentClick={false}
        >
          {(close) => (
            <div className="pop-up-container">
              <div className="pop-up-header">
                {" "}
                {myForm.pageMode == "submitted" ? (
                  <div>{popupInfo.success_header}</div>
                ) : (
                  <div>{popupInfo.error_header}</div>
                )}
                <div>
                  <a className="pop-up-close btn" onClick={close}>
                    &times;
                  </a>
                </div>
              </div>
              {myForm.pageMode == "submitted" ? (
                <div className="pop-up-content">
                  {popupInfo.success_title}
                  <br />
                  <div className="pop-up-fields">
                    <div className="pop-up-field">
                      <div className="pop-up-field-label">
                        {popupInfo.field_label_success}
                      </div>
                      <div className="pop-up-field-value">
                        {myForm.pageState[popupInfo.field_name_success]}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pop-up-content">
                  {popupInfo.error_title}
                  <br />
                  <div className="pop-up-fields">
                    <div className="pop-up-field">
                      <div className="pop-up-field-label">
                        {popupInfo.field_label_error}
                      </div>
                      <div className="pop-up-field-value">
                        {myForm.popupError}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="pop-up-actions">
                <button
                  className="pop-up-button"
                  onClick={() => {
                    if (myForm.pageMode == "submitted") {
                      // sessionObject.saveSessionVariableByField("last_bilty_no", {"last_bilty_no":myForm.pageState.bilty_no})
                      myForm.setPageState({
                        ...dataObject,
                        ...variablesFromSession,
                      });
                      myForm.setPageMode("write");
                      window.location.reload();
                      close();
                    } else {
                      if (myForm.previousPageMode != "") {
                        myForm.setPageMode(myForm.previousPageMode);
                        myForm.setPreviousPageMode("");
                      } else {
                        myForm.setPageMode("write");
                      }
                      close();
                    }
                  }}
                >
                  Okay
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>

      <div className="form-header">Bhada Chitthi</div>
      <div onSubmit={myForm.handleSubmit} className="form" noValidate>
        <div className="form-title">
          <div className="form-row">
            <label className="form-label">Trip No:</label>
            <input
              className="form-input"
              type="text"
              name="trip_no"
              placeholder=""
              value={myForm.pageState.trip_no}
              onChange={myForm.handleChange}
              onBlur={() => {}}
              onKeyPress={(a) =>
                myForm.getPageOnKeyEnter(a, myForm.pageState.trip_no)
              }
              disabled={checkDisabledCondition({ name: "trip_no" })}
              ref={(a) => myForm.storeInputReferenceForSelect(a, "trip_no")}
            />
            {myForm.internalValidationErrors["trip_no"] && (
              <p>{myForm.internalValidationErrors["trip_no"]}</p>
            )}
            {myForm.pageMode == "view" && (
              <>
                {checkVisibilityCondition({ name: "edit_button" }) && (
                  <button
                    onClick={() => {
                      myForm.setPageMode("edit");
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => {
                    myForm.setPageState({
                      ...dataObject,
                      ...variablesFromSession,
                    });
                    window.location.reload();
                    myForm.setPageMode("write");
                  }}
                >
                  Clear
                </button>
                {/* <button onClick={handleDelete}>Delete</button> */}
              </>
            )}
          </div>
          <div>
            <label className="form-label">Trip Date:</label>
            <input
              className="form-input-mr-statement-date"
              type="date"
              name="input_date"
              placeholder=""
              value={myForm.pageState.input_date}
              onChange={myForm.handleChange}
              ref={(a) => myForm.storeInputReferenceForSelect(a, "input_date")}
              disabled={checkDisabledCondition({ name: "input_date" })}
              // onKeyPress={(a) => {
              //   console.log("Here");
              //   if (a.key == "Enter") {
              //     myForm.makeFocusOnParticularField("consignor_name");
              //   }
              // }}
            />
          </div>
          <div className="form-row">
            <label className="form-last_bilty">Last Trip No:</label>
            <label className="form-last_bilty">
              {myForm.pageState.last_trip_no}
            </label>
          </div>
        </div>
        <div className="form-input-content-block-0">
          <div className="form-field-left">
            <FormColumn
              groupInfo={groupInfo}
              groupName="group-1"
              checkDisabledCondition={checkDisabledCondition}
              checkVisibilityCondition={checkVisibilityCondition}
              myFormObj={myForm}
              getAdditionalInfoForSuggestionFetch={
                getAdditionalInfoForSuggestionFetch
              }
            />
          </div>
          <div className="form-field-right">
            <FormColumn
              groupInfo={groupInfo}
              groupName="group-2"
              checkDisabledCondition={checkDisabledCondition}
              checkVisibilityCondition={checkVisibilityCondition}
              myFormObj={myForm}
              getAdditionalInfoForSuggestionFetch={
                getAdditionalInfoForSuggestionFetch
              }
            />
          </div>
        </div>
        <div className="chform-row">
          <label className="chform-label">Challan No:</label>
          <input
            className="chform-input"
            type="text"
            name="No"
            placeholder=""
            value={myForm.pageState["No"]}
            onChange={myForm.handleChange}
            // onKeyPress={linkBilty}
            onKeyPress={(e) => {
              if(e.key == "Enter") {
                  e.preventDefault();
                  linkBilty(e);
              }
            }}
            ref={(a) => myForm.storeInputReferenceForSelect(a, "challan_no")}
          />
           <button onClick={fetchDataTemp} disabled={disableButton}>
              Auto Fetch
            </button>
        </div>
        <div className="table-container">
          {/* {showTable && ( */}
            <DynamicViewTable
              // edit={1}
              // editRowFunction={handleEditSpecificRow}
              tableHeader={tripChallanTableHeader}
              tableItems={tripChallanTableItems}
              tableValues={myForm.pageState["challan_ids"]}
              setPageStateByField={myForm.setPageStateByField}
              pageStateArray={myForm.pageState["challan_ids"]}
              fieldMapping="challan_ids"
            />
          {/* )} */}
        </div>
        <div className="form-input-content-block-0">

          <div className="form-field-left-most">            
            <FormColumn
              groupInfo={groupInfo}
              groupName="group-3"
              checkDisabledCondition={checkDisabledCondition}
              checkVisibilityCondition={checkVisibilityCondition}
              myFormObj={myForm}
              getAdditionalInfoForSuggestionFetch={
                getAdditionalInfoForSuggestionFetch
              }
            />
          </div>

          <div className="form-field-left">            
            <FormColumn
              groupInfo={groupInfo}
              groupName="group-4"
              checkDisabledCondition={checkDisabledCondition}
              checkVisibilityCondition={checkVisibilityCondition}
              myFormObj={myForm}
              getAdditionalInfoForSuggestionFetch={
                getAdditionalInfoForSuggestionFetch
              }
            />
          </div>              
          <div className="form-field-left">            
            <FormColumn
              groupInfo={groupInfo}
              groupName="group-5"
              checkDisabledCondition={checkDisabledCondition}
              checkVisibilityCondition={checkVisibilityCondition}
              myFormObj={myForm}
              getAdditionalInfoForSuggestionFetch={
                getAdditionalInfoForSuggestionFetch
              }
            />
          </div>
        </div>
        <div className="form-footer">
          <button
            onClick={(e) => {
              console.log("PULKIT_VALA_Values", myForm.pageState);
              console.log("Values", myForm.pageState);
              myForm.setServerPrintNeeded(true);
              myForm.handleSubmit(e);
            }}
            type="button"
            ref={(a) => myForm.storeInputReferenceForSelect(a, "print_button")}
            className="btn btn-primary"
          >
            Print
          </button>
          <button
            onClick={myForm.handleSubmit}
            type="button"
            className="btn btn-primary"
            ref={(a) => myForm.storeInputReferenceForSelect(a, "save_button")}
          >
            Save
          </button>
          <button
            onClick={async () => {
              let url =
                SERVER_URL +
                "/trip/multiple_print/" +
                String(myForm.pageState.trip_no) +
                "?branch_id=" +
                String(myForm.pageState.created_from) + 
                "&fyear=" + myForm.pageState.fYear_get + "&companyId=" + myForm.pageState.company_id;

              let response = await fetch(url, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }).then((r) => r.blob());
              console.log("response", response);
              print({
                printable: URL.createObjectURL(response),
                type: "pdf",
                showModal: false,
              });
            }}
            type="button"
            className="btn btn-primary"
            // ref={(a) => myForm.storeInputReferenceForSelect(a, "save_button")}
          >
            Print All Memo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trip;
