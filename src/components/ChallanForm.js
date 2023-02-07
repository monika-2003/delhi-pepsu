import React, { useRef, useState } from "react";
import DynamicViewTable from "./DynamicViewTable";
import Popup from "reactjs-popup";
import { challanApiConfig } from "../config/apiConfig.js";
import LoadingOverlay from "react-loading-overlay";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import { saveAs } from 'file-saver'

import print from "print-js";
import {
    groupInfo,
    dataObject,
    challanBiltyOriginalTableHeader,
    challanBiltyOriginalTableItems,
    validate,
    popupInfo,
    createChallanTableHeader,
    createChallanTableItems
} from "../config/challanForm.js";
import DatePicker from "react-datepicker";
import { SERVER_URL, USE_OVERLAY } from "../config/config";
import { Prompt } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import "./Form.css";
import "./ChallanForm.css";
import "./AutoSuggest.css";
import useForm from "./useForm";
import "./popup.css";
import ReactToPrint from "react-to-print";
import TableToPrint from "./ChallanPrint";
import FormColumn from "./FormColumn.js";
import { useHistory } from "react-router-dom";
import useSessionVariables from "./useSessionVariables";
let checkCwbResult = {};
// Redux
import {useDispatch,useSelector} from "react-redux";
import {
    pushBilty,
    popBilty,
    clearBilty
} from "./../slices/challanBiltySlices"

const ChallanForm = ({ sessionObject }) => {
    const dispatch = useDispatch();
    
    const history = useHistory();
    const location = useLocation();
    const [checkCwbSubmitted, setcheckCwbSubmitted] = React.useState(false);
    const contentStyle = {
        maxWidth: "600px",
        width: "90%",
    };


    useEffect(()=> {(async () => {
        console.log("PAGE_PAGE",myForm.pageState);
        const defaultChallanNo = location.state ?? "";
        console.log(defaultChallanNo);
        if (defaultChallanNo != "") {
            myForm.setPageStateByField("challan_no", defaultChallanNo);

            const fakeKey = { key: "Enter" }
            // myForm.getPageOnKeyEnter(fakeKey, defaultChallanNo);
            myForm.setOverlay(true);
            let data = {
                apiUrlTail: defaultChallanNo + "?branch_id=" + myForm.pageState.created_from,
                apiType: "getChallan",
                apiConfig: challanApiConfig["getChallan"],
            };
            const fYear_fetch = JSON.parse(sessionStorage.getItem("financial_year_for_fetch")).financial_year_for_fetch;
            data.apiUrlTail += "&fyear=" + fYear_fetch + "&companyId=" + myForm.pageState.company_id;
            myForm.performSuggestions(data);
        }
        
    })();
}, []);



    //code for check button
    const [checked,setChecked] = useState(false);
    const checkBoxRef = useRef("");
    const [crossChallan,setCrossChallan] = useState('');
    const [showTable,setShowTable] = useState(false);

    // less weight
    const [lessWeight , setLessWeight] = useState(0);
    const redux_bilty_arr = useSelector(state => state.bilty_reducers.bilty_arr);

    const reduxCall = () => {

        const redux_bilty_temp = useSelector(state => state.bilty_reducers.bilty_arr)
        let total_bilty = 0
        let total_pkgs = 0
        let total_weight=0
        let total_eway= 0
        
        // let new_bilty_arr = [];
        let p = redux_bilty_temp;
        console.log("TET_JUST_LENGTH",p.length)
        
        for (let i = 0; i < p.length; i++) {
            total_bilty += 1
            total_pkgs += parseInt(p[i].no_of_package) || 0
            total_weight += parseInt(p[i].actual_weight) || 0
            if(p[i].eway_bill_info!=undefined){
                total_eway += p[i].eway_bill_info.length || 0
            }
        }               
    

        myForm.pageState.total_bilty = total_bilty;
        myForm.pageState.total_pkgs = total_pkgs;
        myForm.pageState.total_weight = total_weight;
        myForm.pageState.total_eway = total_eway;
        console.log("LAST_STATE",myForm.pageState);
    }

    



    const fetchDataTemp = async () => {
        
        // console.log("FTCH_DATA",myForm.pageState)
        // const resp = await fetch(`http://localhost:8000/branch/name/${myForm.pageState.station_to_name}`)
        // const resp_data = await resp.json();
        // console.log("RESP_DATA",resp_data);
        
        const postData = {
            "companyId":"1",
            "station_to":myForm.pageState.station_to.toString() || "",
            "suffix":null,
            "owned_by":sessionObject.sessionVariables.branch_id.toString(),       
            "module":"chalan",
            "branch_id":sessionObject.sessionVariables.branch_id.toString(),
            "fyear":sessionObject.sessionVariables.financial_year_for_fetch,
            "flag":0
        }

        const res = await fetch(
            SERVER_URL + "/bilty/multi_option",{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "token-value",  
            },
            body: JSON.stringify(postData),
        })

        const data = await res.json(); 
        console.log("TEST_1_DATA",data); 


        if(parseInt(myForm.pageState.station_to) > 0){           
            console.log("TEST_1",myForm.pageState)            
            if(data.length>0){
                linkBilty({},data)
                setShowTable(true)
            }                        
            myForm.setOverlay(false);
        }else{
            if(data.length>0){
                linkBilty({},data)
                setShowTable(true)
            }                        
            myForm.setOverlay(false);
        }
        
    }
    // }
    


    
   
    useEffect(() => {
        if(checked){
            setCrossChallan("Cross Challan");
        }        
    },[checked])
    // code end 

    useEffect(()=> {
        if(myForm.pageState.is_crossing_challan){
            setChecked(myForm.pageState.is_crossing_challan);
        }
        console.log("CROSSING-+",myForm.pageState["is_crossing_challan"]);
    },[])

  

    const handleChangeCheckbox = () => {
        myForm.pageState["is_crossing_challan"] = !checked;
       setChecked(!checked);
    }

    let variablesFromSession = {
        station_from: String(sessionObject.sessionVariables.branch_id),
        station_from_name: sessionObject.sessionVariables.branch_name,
        created_from: String(sessionObject.sessionVariables.branch_id),
        created_by: String(sessionObject.sessionVariables.user_id),
        role_id: String(sessionObject.sessionVariables.role_id),
        created_by_name: String(sessionObject.sessionVariables.user_name),
        company_id: sessionObject.sessionVariables.company_id ?? "1",
        fYear: sessionObject.sessionVariables.financial_year,
    };

    const myForm = useForm(
        "Challan",
        validate,
        { ...dataObject, ...variablesFromSession },
        challanApiConfig
    );


    reduxCall();


    useEffect(() => {
        dispatch(clearBilty());        
    },[]);

    useEffect(() => {          
        console.log("TEST_CHALLAN",myForm.pageState.deleted_bilty_no);        
        dispatch(popBilty(myForm.pageState.deleted_bilty_no));
    },[myForm.pageState.deleted_bilty_number])

    useEffect(() => {
        if(myForm.pageState.bilty_ids.length > 0){
            setShowTable(true);
            for(let i=0;i<myForm.pageState.bilty_ids.length;i++){
                dispatch(pushBilty(myForm.pageState.bilty_ids[i]));
            }                        
        }
    },[myForm.pageState.challan_no]);

    useEffect(() => {
        let newObj = {
            total_bilty: 0,
            total_pkgs: 0,
            total_weight: 0,
            total_eway: 0,
        }
        // let new_bilty_arr = [];

        let p = redux_bilty_arr;
        console.log("TET_JUST_LENGTH",p.length)
        if(p.length>0){

            for (let i = 0; i < p.length; i++) {
                newObj.total_bilty += 1
                newObj.total_pkgs += parseInt(p[i].no_of_package) || 0
                newObj.total_weight += parseInt(p[i].charge_weight) || 0
                newObj.total_eway += p[i].eway_bill_info.length
            }
    
            myForm.setPageState({
                ...myForm.pageState, ...newObj
            });
    
        }
        
        // if(redux_bilty_arr.lenght>0){        

        //     for(let i=0;i<p.length;i++){
        //         console.log("TET_EL",myForm.pageState.bilty_ids[i])
        //     }
        //     console.log("TET_USEEFFECT",myForm.pageState.bilty_ids[0].length)
        //     for(let i=0;i<myForm.pageState.bilty_ids[0].length;i++){
        //         new_bilty_arr.push(myForm.pageState.bilty_ids[0][i]);
        //     }
        // }
        // console.log("TET_AFTER_BILTY",new_bilty_arr);

    }, [myForm.pageState.bilty_ids]);

    



    useEffect(() => {
        if(parseInt(myForm.pageState.station_to) > 0){
            setShowTable(true);
        }
    },[myForm.pageState]);

    const showTableChange = (e) =>{
        setShowTable(true);
        myForm.handleChange(e);
    }


    const saveHandleSubmit = async (e) => {
        let p = myForm.pageState;
        let putDate = p.input_date.toISOString().slice(0, 19);        
        for(let i=0;i<p.unloading_bilty_table.length;i++){
            p.unloading_bilty_table[i].send = p.unloading_bilty_table[i].excess
        }
        const payload = {
            chalan_no:p.challan_no,
            unloading_info:myForm.pageState.unloading_bilty_table,
            fyear:p.fYear,
            companyID:p.company_id,
            branch_id:p.station_from,
            unloading_date:putDate,
            branch_id:JSON.parse(sessionStorage.getItem("branch_id")).branch_id
        }

        const url = SERVER_URL+"/unloading/update_short";
        const response = await fetch(url,{
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },            
            body: JSON.stringify(payload),
        })
        const resp = await response.json();
        console.log("PULKIT_TEST_RESPONSE",resp);

        myForm.handleSubmit(e)
    }



    const selectAll = () => {
        let dummy = myForm.pageState.unloading_bilty_table;
        // const clearanceDate = isoToDash(myForm.pageState.clearance_date.toISOString());
        // 1 - clearance
        let totalAmt = 0;
        dummy.forEach(row => {
            console.log("PULKIT_ROW",row)
            // totalAmt += parseInt(row.amount);

            // row.clearance_status = "1";
            // row.checked = "1";
            // row.clearance_date = clearanceDate;
        });

        myForm.setPageState({
            ...myForm.pageState,
            "clearance_entries": dummy,
            "clear": totalAmt,
            "unclear": 0,
        })
    }



    const deselectAll = () => {
        let dummy = myForm.pageState.unloading_bilty_table;
        // 0 - unclearance
        let totalAmt = 0;
        dummy.forEach(row => {
            totalAmt += parseInt(row.amount);
            row.clearance_status = "0";
            row.checked = "0";
            row.clearance_date = null;
        });
        myForm.setPageState({
            ...myForm.pageState,
            "clearance_entries": dummy,
            "clear": 0,
            "unclear": totalAmt,
        })
    }

    const getSelectAllValue = () => {
        for (let i = 0; i < myForm.pageState.unloading_bilty_table.length; i++) {
            if (myForm.pageState.unloading_bilty_table[i].checked != "1") {
                return false;
            }
        }
        return true;
    };



    const handleCheckboxChange = (arr, item, idx) => {

        // console.log({arr, item, idx});
        let dummy = myForm.pageState.unloading_bilty_table;        
        console.log("PULKIT_YESY",arr," 0->",item," -> ",idx)

        let bilty_change = prompt("Enter a bilty number", "");

        console.log("PULKIT_BILTY_NO",bilty_change)
        dummy[idx].bilty_no = bilty_change



        // clearance
        // if (dummy[idx].clearance_status == "1") {
        //     dummy[idx].clearance_status = dummy[idx].checked = "0";
        //     dummy[idx].clearance_date = null;
        //     // console.log("!!!!!!!!!!!!!!!!", dummy[idx].clearance_date);

        //     // const amt = parseInt(dummy[idx].amount);
        //     // clear -= amt;
        //     // unClear += amt;
        // }
        // else {
        //     // console.log(myForm.pageState.clearance_date.toISOString().split('T')[0]);
        //     dummy[idx].clearance_status = dummy[idx].checked = "1";
        //     // dummy[idx].clearance_date = isoToDash(myForm.pageState.clearance_date.toISOString());

        //     // const amt = parseInt(dummy[idx].amount);
        //     // clear += amt;
        //     // unClear -= amt;
        // }

        myForm.setPageState({
            ...myForm.pageState,
            "unloading_bilty_table": dummy,            
        })
    }

    


    const getAdditionalInfoForSuggestionFetch = (fieldInfoObject) => {
        let additionalInfoObject = {};
        if (fieldInfoObject.name == "station_from_name") {
            additionalInfoObject.is_branch = true;
            return additionalInfoObject;
        }
        return null;
    };

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

    const getFyearsOnKeyEnter = async (e, myFormName, page_id) => {
        if(e.key == "Enter") {
            e.persist();
            myForm.setOverlay(true);
            myForm.setPageStateByField("enterEvent", {...e});

            // console.log(refStoreObject.current[e.target.name]);
            // console.log(e.target.name);
            // refStoreObject.current[e.target.name].blur();

            const company_id = myForm.pageState.company_id;
            let url = SERVER_URL;
            let dataToSend = {};
            let finalFyearList = [];

            if(myFormName == "Bilty Inquiry") {
                myForm.refStoreObject.current["bilty_no"].blur();
                // if (page_id == "") {
                //     setOverlay(false);
                //     makeFocusOnParticularFieldForItem("eway_bill_no", 0, "eway_bill_no");
                //     return;
                // }
                url += "/bilty/option";
                
                let flag = 0;
                if (
                    myForm.pageState.bilty_type == "c" ||
                    myForm.pageState.bilty_type == "C"
                ) {
                    flag = 1;
                }

                dataToSend = {
                    companyId: company_id,
                    bilty_no: page_id,
                    suffix: null,
                };
                dataToSend.owned_by = myForm.pageState.created_from;
                dataToSend.branch_id = myForm.pageState.created_from;
                dataToSend.module = "chalan";
                dataToSend.flag = flag;
            }

            const resp = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            })

            const respData = await resp.json();
            console.log("RESP",respData)
            
            if(Array.isArray(respData)) {
                const fYearList = respData;
                console.log(fYearList);
    
                fYearList.forEach(obj => {
                    if("fyear" in obj) {
                        finalFyearList.push(obj.fyear);
                    }
                })

                if(finalFyearList.length == 1) {
                    myForm.getSuffixesOfBilty(page_id, finalFyearList[0]);
                }
                else {
                    myForm.setPageStateByField("fyearList", finalFyearList);      
                }
            }
            else {
                if (!resp.ok) {
                    
                    const temp_error = respData;
                    if ("detail" in temp_error) {
                        if (temp_error.detail == "Bilty not found") {
                            myForm.makeFocusOnParticularField("bilty_no");
                            myForm.setOverlay(false);
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
                    console.log("MYYFORM",myForm.pageState);
                    myForm.setOverlay(false);
                    return;
                }

                console.log("BBILTY",myForm.pageState['bilty'])
                linkBilty({}, respData);                                
            }
            myForm.setOverlay(false);
        }
    }

    // const linkBilty = async (e, argResponse) => {
    //     console.log(e, argResponse);
    //     let temp_response;
    //     if(argResponse) {
    //         temp_response = argResponse;
    //     }
    //     else {
    //         if (myForm.pageState.No == "" && e.key == "Enter") {
    //             myForm.makeFocusOnParticularField("save_button");
    //             return;
    //         }
    //         if (e.key == "Enter") {
    //             let flag = 0;
    //             if (
    //                 myForm.pageState.bilty_type == "c" ||
    //                 myForm.pageState.bilty_type == "C"
    //             ) {
    //                 flag = 1;
    //             }
    //             let suffix = myForm.pageState.suffix;
    //             if (suffix == "") {
    //                 suffix = "null";
    //             }
    //             const url =
    //                 SERVER_URL +
    //                 "/bilty/chalan_in/" +
    //                 myForm.pageState.No +
    //                 "?branch_id=" +
    //                 myForm.pageState.created_from +
    //                 "&suffix=" +
    //                 suffix +
    //                 "&flag=" +
    //                 flag + 
    //                 "&fyear=" + myForm.pageState.fyear_get_bilty + "&companyId=" + myForm.pageState.company_id;
    //             const response = await fetch(url);
    //             console.log("Response", response);
    //             if (!response.ok) {
    //                 const temp_error = await response.json();
    //                 if ("detail" in temp_error) {
    //                     if (temp_error.detail == "Bilty not found") {
    //                         myForm.makeFocusOnParticularField("bilty_no");
    //                         return;
    //                     }
    //                     myForm.setPreviousPageMode(myForm.pageMode);
    //                     myForm.setPageMode("error");
    //                     myForm.setPopupError(String(temp_error.detail));
    //                 } else {
    //                     myForm.setPreviousPageMode(myForm.pageMode);
    //                     myForm.setPageMode("error");
    //                     myForm.setPopupError("Invalid Bilty");
    //                 }
    //                 myForm.setPageState({
    //                     ...myForm.pageState,
    //                     ["No"]: "",
    //                     ["suffix"]: "",
    //                 });
    //                 return;
    //             }
    //             temp_response = await response.json();
    //         }
    //     }

    //     console.log(temp_response);

    //     // if("flag" in temp_response) {
    //     //     myForm.makeFocusOnParticularField("suffix");
    //     //     return;
    //     // }

    //     if (temp_response.check_fail) {
    //         myForm.setPageState({
    //             ...myForm.pageState,
    //             ["No"]: "",
    //             ["suffix"]: "",
    //         });
    //         myForm.setPreviousPageMode(myForm.pageMode);
    //         myForm.setPageMode("error");
    //         myForm.setPopupError("Not possible to add this bilty");
    //         return;
    //     }
    //     if (
    //         checkIfFieldAlreadyExists(
    //             "bilty_id",
    //             temp_response.bilty_id,
    //             myForm.pageState.bilty_ids
    //         )
    //     ) {
    //         myForm.setPageState({
    //             ...myForm.pageState,
    //             ["No"]: "",
    //             ["suffix"]: "",
    //         });
    //         myForm.setPreviousPageMode(myForm.pageMode);
    //         myForm.setPageMode("error");
    //         myForm.setPopupError("Already present");
    //         return;
    //     }
    //     const newState = {
    //         bilty_ids: [temp_response, ...myForm.pageState["bilty_ids"]],
    //         ["No"]: "",
    //         ["suffix"]: "",
    //     };
    //     myForm.setPageState({
    //         ...myForm.pageState,
    //         ...newState,
    //     });
    //     myForm.makeFocusOnParticularField("bilty_type");
    // };

    const linkBilty = async (e, argResponse) => {
        console.log("TET_DATA_LINKBILTY",argResponse);
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
                const url =
                    SERVER_URL +
                    "/bilty/chalan_in/" +
                    myForm.pageState.No +
                    "?branch_id=" +
                    myForm.pageState.created_from +
                    "&suffix=" +
                    suffix +
                    "&flag=" +
                    flag + 
                    "&fyear=" + myForm.pageState.fyear_get_bilty + "&companyId=" + myForm.pageState.company_id;
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
            }
        }

    
        if (temp_response.check_fail) {
            myForm.setPageState({
                ...myForm.pageState,
                ["No"]: "",
                ["suffix"]: "",
            });
            myForm.setPreviousPageMode(myForm.pageMode);
            myForm.setPageMode("error");
            myForm.setPopupError("Not possible to add this bilty");
            return;
        }
        if (
            checkIfFieldAlreadyExists(
                "bilty_id",
                temp_response.bilty_id,
                myForm.pageState.bilty_ids
            )
        ) {
           
            myForm.setPageState({
                ...myForm.pageState,
                ["No"]: "",
                ["suffix"]: "",
            });
            myForm.setPreviousPageMode(myForm.pageMode);
            myForm.setPageMode("error");
            myForm.setPopupError("Already present");
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

            for(let i=0;i<temp_response.length;i++){            
                dispatch(pushBilty(temp_response[i]));                
                newState = {
                    bilty_ids: [...temp_response, ...myForm.pageState["bilty_ids"]],
                    // bilty_ids: [temp_response],
                    ["No"]: "",
                    ["suffix"]: "",
                    ["redux_bilty"]:1
                };                                                
                console.log("DYNAMIC_VIEW_TABLE_TEST_AFTER_ONE_BIKLTY",newState);
                myForm.setPageState({
                    ...myForm.pageState,
                    ...newState,
                });                
            }            

            console.log("DYNAMIC_VIEW_TABLE BEFORE NEW STATE and its bilty_arr",redux_bilty_arr);

            console.log("DYNAMIC_VIEW_TABLE",myForm.pageState)
        }else{
            console.log("TEST_1_DYNAMIC_VIEW_TABLE",myForm.pageState)
            dispatch(pushBilty(temp_response));
            const newState = {
                bilty_ids: [temp_response, ...myForm.pageState["bilty_ids"]],
                // bilty_ids: [temp_response],
                ["No"]: "",
                ["suffix"]: "",
                ["redux_bilty"]:1
            };
    
            console.log("LEN", newState.bilty_ids.length)
            console.log("DYNAMIC_VIEW_TABLE AFTER ONE BILTY",myForm.pageState)
    
            myForm.setPageState({
                ...myForm.pageState,
                ...newState,
            });
        }    

        console.log("TET_AFTER",myForm.pageState);

        myForm.makeFocusOnParticularField("bilty_type");
    };

    const handleDelete = async () => {
        const fYear_fetch = JSON.parse(sessionStorage.getItem("financial_year_for_fetch")).financial_year_for_fetch;
        const url =
            SERVER_URL + "/challan/?booking_chalan_no=" + myForm.pageState.challan_no
            + "&fyear=" + fYear_fetch + "&companyId=" + myForm.pageState.company_id;
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

    const checkDisabledCondition = (fieldInfo) => {
        if (myForm.pageMode == "view") {
            return "disabled";
        } else if (fieldInfo.name == "cewb_no") {
            return "disabled";
        }
        // else if (myForm.pageMode == "edit" && fieldInfo.name == "input_date") {
        //   return "disabled";
        // } 
        else {
            return "";
        }
    };

    const checkVisibilityCondition = (fieldInfo) => {

        if(fieldInfo.name == "edit_button") {
            if(myForm.pageMode != "view") {
                return false;
            }

            if(myForm.pageState.is_inwarded != "1") {
                return true;
            }
            
            const roleId = sessionObject.sessionVariables.role_id;
            // console.log({roleId});
            if(roleId == "1" || roleId == "2") {
                return true;
            }
            return false;
        } 

        if (
            fieldInfo.name == "delete_button" &&
            myForm.pageState.is_inwarded == "1"
        ) {
            return false;
        }
        return true;
    };

    const takeInwardChallan = (row) => {
        let dummyObject = {
            multiple_popup: "0",
            multiple_popup_data: [],

        }
        myForm.setPageState({
            ...myForm.pageState,
            ...dummyObject,
        });
        let data = {
            apiUrlTail: row.booking_chalan_no + "?branch_id=" + myForm.pageState.created_from,
            apiType: "getChallan",
            apiConfig: challanApiConfig["getChallan"],
        };
        console.log("Get page data fff", data);
        myForm.performSuggestions(data);
    }



    const handlePrintCewb = async () => {
        myForm.setOverlay(true);
        const url = SERVER_URL + "/challan/print-cweb"
            + `?cweb_no=${myForm.pageState.cewb_no}`;


        let response = await fetch(url)
            .then((r) => {
                console.log(r, typeof r);
                return r.blob();
            });
        print({ printable: URL.createObjectURL(response), type: "pdf", showModal: false });
        myForm.setOverlay(false);
    }

    const handleLessWeight = (event)=> {
        let weight = event.target.value;
        if(weight*myForm.pageState.total_pkgs < myForm.pageState.total_weight)
            setLessWeight(weight);
        myForm.pageState.less_wgt_by_pkg = weight;
        // myForm.handleChange();

        var totalWeight =  (myForm.pageState.total_weight - ( myForm.pageState.less_wgt_by_pkg*myForm.pageState.total_pkgs));

        myForm.pageState.total_less_wgt = totalWeight;
    }

    return (
        <div className="challan-form-container">
            {
                USE_OVERLAY && (
                    <LoadingOverlay
                        active={myForm.overlay}
                        spinner
                        text="Loading your content..."
                        styles={{
                            wrapper: {
                                // width: '400px',
                                // height: '400px',
                                overflow: true ? "hidden" : "scroll",
                            },
                        }}
                    ></LoadingOverlay>
                )
            }
            <div>
                <div>
                    <Popup
                        open={myForm.pageState.fyearList.length > 0}
                        modal
                        closeOnDocumentClick={false}
                    >
                        {(close) => myForm.displayFyearPopup(close)}  
                    </Popup>
                </div>
                <div>
                    <Popup
                        // trigger={<button className="button"> Open Modal </button>}
                        open={checkCwbSubmitted}
                        modal
                        contentStyle={contentStyle}
                        closeOnDocumentClick={false}
                    >
                        {(close) => (
                            <div className="pop-up-container">
                                <div className="pop-up-header">
                                    {" "}
                                    <div> Result of check EWB </div>
                                    <div>
                                        <a className="pop-up-close btn" onClick={close}>
                                            &times;
                                        </a>
                                    </div>
                                </div>
                                <div className="pop-up-content">
                                    Information:
                                    <br />
                                    <div className="pop-up-fields">
                                        {
                                            Object.keys(checkCwbResult).map(key => {
                                                // console.log({key});
                                                let obj = checkCwbResult[key];
                                                return (
                                                    <div>
                                                        <div className="pop-up-field">
                                                            <div className="pop-up-field-label"> Bilty No: </div>
                                                            <div className="pop-up-field-value"> {obj.bilty_no} </div>
                                                        </div>
                                                        <div className="pop-up-field">
                                                            <div className="pop-up-field-label"> EWay bill No: </div>
                                                            <div className="pop-up-field-value"> {obj.eway_bill_no} </div>
                                                        </div>
                                                        <hr />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="pop-up-actions">
                                    <button
                                        className="pop-up-button"
                                        onClick={() => {
                                            setcheckCwbSubmitted(false);
                                            close();
                                        }}
                                    >
                                        Okay
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
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
                                                }
                                                else {
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
                <div>
                    <Popup
                        // trigger={<button className="button"> Open Modal </button>}
                        open={myForm.deletePopup}
                        modal
                        contentStyle={contentStyle}
                        closeOnDocumentClick={false}
                    >
                        {(close) => (
                            <div className="pop-up-container">
                                <div className="pop-up-header">
                                    Are you sure want to delete?
                                </div>
                                <div className="pop-up-actions">
                                    <button
                                        className="pop-up-button"
                                        onClick={() => {
                                            handleDelete();
                                            myForm.setDeletePopup(false)
                                            close();
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className="pop-up-button"
                                        onClick={() => {
                                            myForm.setDeletePopup(false)
                                            close();
                                        }}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                <div>
                    <Popup
                        // trigger={<button className="button"> Open Modal </button>}
                        open={myForm.pageState.multiple_popup == "1"}
                        modal
                        contentStyle={contentStyle}
                        closeOnDocumentClick={false}
                    >
                        {(close) => (
                            <div className="pop-up-container">
                                <div className="pop-up-header">
                                    {" "}
                                    Multiple Challan Found With Same Manual No
                                </div>
                                <div className="pop-up-content">
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    Challan No
                                                </td>
                                                <td>
                                                    Branch
                                                </td>
                                                <td>
                                                    Take Inward
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                myForm.pageState.multiple_popup_data.map(
                                                    (row) => (
                                                        <tr>
                                                            <td>
                                                                {row.booking_chalan_no}
                                                            </td>
                                                            <td>
                                                                {row.branch_name}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    onClick={() => {
                                                                        takeInwardChallan(row)
                                                                    }}
                                                                >
                                                                    Get
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="pop-up-actions">
                                    <button
                                        className="pop-up-button"
                                        onClick={() => {
                                            if (myForm.pageMode == "submitted") {
                                                // sessionObject.saveSessionVariableByField("last_bilty_no", {"last_bilty_no":myForm.pageState.bilty_no})
                                                myForm.setPageState({
                                                    ...ChallanInwardDataObject,
                                                    ...variablesFromSession,
                                                });
                                                myForm.setPageMode("write");
                                                window.location.reload();
                                                close();
                                            } else {
                                                myForm.setPageMode("write");
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
            </div>

            <div className="form-header">Challan</div>
            <div
                onSubmit={myForm.handleSubmit}
                className="form"
                noValidate
                style={{ overflow: "auto" }}
            >
                <div className="form-title">
                    <div className="form-row">
                        <label className="form-label">Challan No:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="challan_no"
                            placeholder=""
                            value={myForm.pageState.challan_no}
                            onChange={myForm.handleChange}
                            onBlur={() => { }}
                            onKeyPress={(a) =>
                                myForm.getFyearsOnKeyEnter(a, "Challan", myForm.pageState.challan_no)
                            }
                            ref={(a) => myForm.storeInputReferenceForSelect(a, "challan_no")}
                            disabled={checkDisabledCondition({ name: "challan_no" })}
                        />
                        <label className="form-label">Manual No:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="manual_no"
                            placeholder=""
                            value={myForm.pageState.manual_no}
                            onChange={myForm.handleChange}
                            onBlur={() => { }}
                            onKeyPress={(a) =>
                                myForm.getPageOnKeyEnter(a, myForm.pageState.manual_no)
                            }
                            ref={(a) => myForm.storeInputReferenceForSelect(a, "manual_no")}
                            disabled={checkDisabledCondition({ name: "manual_no" })}
                        />
                        {myForm.internalValidationErrors["challan_no"] && (
                            <p>{myForm.internalValidationErrors["challan_no"]}</p>
                        )}
                        {checkVisibilityCondition({ name: "edit_button" }) && (
                            <>
                                <button
                                    onClick={() => {
                                        myForm.setPageMode("edit");
                                    }}
                                >
                                    Edit
                                </button>
                                {/* <button
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
                </button> */}
                                {/* <button onClick={handleDelete}>Delete</button> */}
                            </>
                        )}

                        <label id = "challan-checkbox">
                            <input type="checkbox"
                                defaultChecked={checked}                                
                                checked={myForm.pageState.is_crossing_challan}
                                onChange={handleChangeCheckbox}                                                             
                                value={myForm.pageState["is_crossing_challan"]}                                
                            />
                            Is Crossing Challan?
                        </label>

                    </div>
                    {
                        myForm.pageState.is_inwarded == "1" &&
                        (
                            <div className="form-row" style={{ margin: "10px" }}>
                                <label className="form-label">
                                    Inward Done
                                </label>
                            </div>
                        )
                    }
                    {
                        <div className="form-row">
                            <label className="form-label">
                                Trip No: {myForm.pageState.trip_no}
                            </label>
                        </div>
                    }
                    <div>
                        Challan Date:{" "}
                        <DatePicker
                            dateFormat="dd-MM-yyy"
                            selected={myForm.pageState.input_date}
                            onChange={(date) =>
                                myForm.setPageStateByField("input_date", date)
                            }
                            ref={(a) => myForm.storeInputReferenceForSelect(a, "input_date")}
                            disabled={checkDisabledCondition({ name: "input_date" })}
                            onKeyPress={(a) => {
                                console.log("Here");
                                // if (a.key == "Enter"){
                                //   myForm.makeFocusOnParticularFieldForItem("eway_bill_no", 0, "eway_bill_no");
                                // }
                            }}
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-last_bilty">Last Challan No:</label>
                        <label className="form-last_bilty">
                            {myForm.pageState.last_challan_no}
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
                {/* Test for excess */}
                <h1>Excess Entries</h1>
                <div className="table-container">
                    <DynamicViewTable
                        checkBox={1}
                        tableHeader={createChallanTableHeader}
                        tableItems={createChallanTableItems}
                        tableValues={myForm.pageState["unloading_bilty_table"]}
                        setPageStateByField={myForm.setPageStateByField}
                        pageStateArray={myForm.pageState["unloading_bilty_table"]}                        
                        fieldMapping="unloading_bilty_table"
                        handleCheckboxChange={handleCheckboxChange}
                        getSelectAllValue={getSelectAllValue}
                        selectAll={selectAll}
                        deselectAll={deselectAll}                        
                    />
                </div>



                <div className="chform-row">
                    <label className="chform-label">Type</label>
                    <select
                        className="chform-input-suffix"
                        onChange={(newValue) => {
                            myForm.handleChangeForSelect(newValue, "bilty_type");
                        }}
                        ref={(a) => myForm.storeInputReferenceForSelect(a, "bilty_type")}
                        value={myForm.pageState["bilty_type"]}
                        disabled={checkDisabledCondition({ name: "bilty_type" })}
                        onKeyPress={(a) => {
                            if (a.key == "Enter") {
                                a.preventDefault();
                                myForm.makeFocusOnParticularField("bilty_no");
                            }
                        }}
                    >
                        <option value="D" key="D">
                            D
                        </option>
                        <option value="C" key="C">
                            C
                        </option>
                    </select>
                    <label className="chform-label">Bilty No:</label>
                    <input
                        className="chform-input"
                        type="text"
                        name="No"
                        placeholder=""
                        value={myForm.pageState["No"]}
                        onChange={showTableChange}
                        
                        // onKeyPress={(a) => {
                        //     if (a.key == "Enter") {
                        //         myForm.makeFocusOnParticularField("suffix");
                        //     }
                        // }}
                        onKeyPress={(e) => {
                            if(e.key == "Enter") {
                                if(myForm.pageState["No"]) {
                                    getFyearsOnKeyEnter(e, "Bilty Inquiry", myForm.pageState.No)
                                }
                                else {
                                    myForm.makeFocusOnParticularField("save_button");
                                }
                            }
                            
                        }} 
                        ref={(a) => myForm.storeInputReferenceForSelect(a, "bilty_no")}
                    />
                    <select
                        className="chform-input "
                        name="suffix"
                        value={myForm.pageState.suffix}
                        onChange={(e) => myForm.handleChangeForSelect(e, "suffix")}
                        onKeyPress={(e) => {
                            if(e.key == "Enter") {
                                e.preventDefault();
                                linkBilty(e);
                            }
                        }}
                        ref={(a) => myForm.storeInputReferenceForSelect(a, "suffix")}
                    > 
                        {myForm.pageState.suffix_options.map((suff) => {
                            return <option value={suff}> {suff} </option>
                        })}
                    </select>

                    <button onClick={fetchDataTemp}>
                        Auto Fetch
                    </button>
                </div>
                {console.log("TET_JUST",myForm.pageState["bilty_ids"])}
                {showTable && (

                    <div className="table-container">
                        <DynamicViewTable
                            // checkBox={1}
                            tableHeader={challanBiltyOriginalTableHeader}
                            tableItems={challanBiltyOriginalTableItems}
                            tableValues={redux_bilty_arr}
                            setPageStateByField={myForm.setPageStateByField}
                            pageStateArray={myForm.pageState["bilty_ids"]}
                            fieldMapping="bilty_ids"
                        />
                    </div>
                )}
                <div className="form-footer">
                    <label>{"Total Bilty:- " + myForm.pageState.total_bilty + "    ,"}</label>
                    <label>{"Total Pkgs:- " + myForm.pageState.total_pkgs + "    ,"}</label>
                    <label>{"Total Weight:- " + myForm.pageState.total_weight + "    ,"}</label>
                    <label>{"Total EWay:- " + myForm.pageState.total_eway + "    ,"}</label>
                    <label>{"Less Wgt by Pkg:- "}</label>
                    <input 
                    id="less-weight" 
                    type="number" 
                    onChange={handleLessWeight} 
                    value = {myForm.pageState.less_wgt_by_pkg}                    
                    name = "less_wgt_by_pkg"
                    >
                    </input>
                    {console.log("tOTAL LESS WEIGHT",myForm.pageState)}
                    
                    <label>{"Total Less Wgt:- "}</label>
                    {/* <input disabled type="number" value={myForm.pageState.total_less_wgt = (myForm.pageState.total_weight - (lessWeight*myForm.pageState.total_pkgs))} name = "total_less_wgt"></input> */}
                    <input
                    disabled
                    type="nubmer"
                    value={myForm.pageState.total_less_wgt}
                    name="total_less_wgt"
                    ></input>
                    
                </div>
                <div className="form-footer">
                    <button
                        onClick={(e) => {
                            console.log("Values", myForm.pageState);
                            console.log("Values", myForm.pageState);
                            myForm.setServerPrintNeeded(true);
                            myForm.handleSubmit(e);
                        }}
                        type="button"
                        className="btn btn-primary"
                    >
                        Print
                    </button>
                    <button
                        onClick={saveHandleSubmit}
                        type="button"
                        className="btn btn-primary"
                        ref={(a) => myForm.storeInputReferenceForSelect(a, "save_button")}
                    >
                        Save
                    </button>
                    {checkVisibilityCondition({ name: "delete_button" }) && (
                        <button onClick={() => myForm.setDeletePopup(true)}>Delete</button>
                    )}
                    <button
                        onClick={() => {
                            history.push("/");
                        }}
                    >
                        Exit
                    </button>
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
                        New
                    </button>

                    {myForm.pageState.status == "1" && (
                        <button
                            onClick={() => {
                                let data = {
                                    apiUrlTail: myForm.pageState.challan_no + "?companyId=" + myForm.pageState.company_id + "&fyear=" + JSON.parse(sessionStorage.getItem("financial_year_for_fetch")).financial_year_for_fetch,
                                    apiType: "generateCwb",
                                    apiConfig: challanApiConfig["generateCwb"],
                                };
                                myForm.setOverlay(true);
                                myForm.performSuggestions(data);
                            }}
                        >
                            Genrate CWB
                        </button>
                    )}

                    {myForm.pageState.status == "1" && <button
                        onClick={handlePrintCewb}
                    >
                        Print CEWB
                    </button>}
                    {myForm.pageState.status == "1" && <button
                        onClick={async () => {
                            const fYear_fetch = JSON.parse(sessionStorage.getItem("financial_year_for_fetch")).financial_year_for_fetch;
                            myForm.setOverlay(true);
                            const url = SERVER_URL + "/ewb/canceled/"
                                + myForm.pageState.challan_no
                                + `?branch_id=${myForm.pageState.created_from}`
                                + `&direct_govt=${0}`
                                +  "&fyear=" + fYear_fetch + "&companyId=" + myForm.pageState.company_id;;
                            const resp = await fetch(url);
                            if (!resp.ok) {
                                myForm.setPageMode("error");
                                myForm.setPopupError("Something went wrong!");
                                return;
                            }
                            const data = await resp.json();
                            checkCwbResult = data;
                            console.log({ data });
                            setcheckCwbSubmitted(true);
                            myForm.setOverlay(false);
                        }}
                    >
                        Check EWB
                    </button>}

                    {/* <div className="status">{myForm.renderSubmitApiResponseStatus()}</div> */}
                </div>
            </div>
        </div>
    );
};

export default ChallanForm;






// setShowTable(true);
            // for(let i=0;i<data.length;i++){
    
            //     let respData = data[i];  
            //     linkBilty({}, respData);
    
            //     // if(Array.isArray(respData)) {
            //     //     console.log("respData",respData)
            //     //     const fYearList = respData;
            //     //     console.log(fYearList);
            //     //     let finalFyearList= [];
            //     //     fYearList.forEach(obj => {
            //     //         if("fyear" in obj) {
            //     //             finalFyearList.push(obj.fyear);
            //     //         }
            //     //     })
        
            //     //     if(finalFyearList.length == 1) {
            //     //         myForm.getSuffixesOfBilty(page_id, finalFyearList[0]);
            //     //     }
            //     //     else {
            //     //         myForm.setPageStateByField("fyearList", finalFyearList);      
            //     //     }
            //     // }
            //     // else {
            //     //     // got whole bilty
            //     //     if (!res.ok) {
            //     //         const temp_error = respData;
            //     //         if ("detail" in temp_error) {
            //     //             if (temp_error.detail == "Bilty not found") {
            //     //                 myForm.makeFocusOnParticularField("bilty_no");
            //     //                 myForm.setOverlay(false);
            //     //                 return;
            //     //             }
            //     //             myForm.setPreviousPageMode(myForm.pageMode);
            //     //             myForm.setPageMode("error");
            //     //             myForm.setPopupError(String(temp_error.detail));
            //     //         } else {
            //     //             myForm.setPreviousPageMode(myForm.pageMode);
            //     //             myForm.setPageMode("error");
            //     //             myForm.setPopupError("Invalid Bilty");
            //     //         }
            //     //         myForm.setPageState({
            //     //             ...myForm.pageState,
            //     //             ["No"]: "",
            //     //             ["suffix"]: "",
            //     //         });
            //     //         myForm.setOverlay(false);
            //     //         return;
            //     //     }
    
                    
                    
            //         // if(myForm.pageState['bilty']){
            //         //     console.log("Bilty_is_present")
            //         //     const newState = [...myForm.pageState.bilty,respData]
            //         //     myForm.setPageState({
            //         //         ...myForm.pageState,
            //         //         ['bilty']:newState
            //         //     })
            //         // }else{
            //         //     console.log("Bilty_is_NOT_present")
            //         //     console.log("")
            //         //     myForm.setPageState({
            //         //         ...myForm.pageState,
            //         //         ['bilty']:[respData]
            //         //     })
            //         // }
            // }