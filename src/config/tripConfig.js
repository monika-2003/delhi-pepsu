// import { SERVER_URL } from "./config";

// const groupNames = ["group-1", "group-2"];

// function formatDate(date) {
//   var d = new Date(date),
//       month = '' + (d.getMonth() + 1),
//       day = '' + d.getDate(),
//       year = d.getFullYear();

//   if (month.length < 2) 
//       month = '0' + month;
//   if (day.length < 2) 
//       day = '0' + day;

//   return [year, month, day].join('-');
// }

// const groupInfo = {
//   "group-1": [
//     {
//       label: "Vehicle No.",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "vehicle_no",
//       type: "text",
//       placeHolder: "1234",
//       apiConfigKey: "getVehicleSuggestions",
//       url: SERVER_URL + "/vehicle/",
//       suggestionKeyword: "vehicle_no",
//       suggestionKeywordForFetchApiArgs: "vehicle_no",
//       suggestionSchema: {
//         vehicle_id: "vehicle_id",
//         vehicle_no: "vehicle_no",
//         driver_name: "driver_name",
//         owner_name: "owner_name",
//         tds_rate: "tds_rate",
//       },
//       suggestionChooseQueryKeyword: "vehicle_no",
//       apiCallRequiredOnGetValue: true,
//       keyboardNavigationMap: {
//         Enter: "station_from_name",
//       },
//       toValidate: true,
//       valueVerificationFromSuggestionNeeded: true,
//       valueVerificationCompulsionField: "vehicle_id",
//     },
//     {
//       label: "Station From",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "station_from_name",
//       type: "text",
//       placeHolder: "",
//       apiConfigKey: "getCitySuggestions",
//       url: SERVER_URL + "/branch/",
//       suggestionKeyword: "name",
//       suggestionKeywordForFetchApiArgs: "name",
//       suggestionSchema: {
//         branch_id: "station_from",
//         name: "station_from_name",
//       },
//       toValidate: true,
//       regExpValidation: "[a-zA-z]",
//       apiCallRequiredOnGetValue: true,
//       suggestionChooseQueryKeyword: "branch_id",
//       keyboardNavigationMap: {
//         Enter: "station_to_name",
//       },
//     },
//     {
//       label: "Station To",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "station_to_name",
//       type: "text",
//       placeHolder: "",
//       apiConfigKey: "getCitySuggestions",
//       url: SERVER_URL + "/branch/",
//       suggestionKeyword: "name",
//       suggestionKeywordForFetchApiArgs: "name",
//       suggestionSchema: {
//         branch_id: "station_to",
//         name: "station_to_name",
//       },
//       toValidate: true,
//       regExpValidation: "[a-zA-z]",
//       apiCallRequiredOnGetValue: true,
//       suggestionChooseQueryKeyword: "branch_id",
//       keyboardNavigationMap: {
//         Enter: "amount",
//       },
//     },
//     {
//       label: "Amount",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "amount",
//       type: "text",
//       placeHolder: "",
//       toValidate: false,
//       regExpValidation: "[a-zA-z]",
//       keyboardNavigationMap: {
//         Enter: "advance_bhada",
//       },
//     },
//     {
//       label: "Advance",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "advance_bhada",
//       type: "text",
//       placeHolder: "",
//       toValidate: false,
//       regExpValidation: "[a-zA-z]",
//       keyboardNavigationMap: {
//         Enter: "owner_name",
//       },
//     },
//     {
//       label: "Balance",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "balance_bhada",
//       type: "text",
//       placeHolder: "",
//       toValidate: false,
//       regExpValidation: "[a-zA-z]",
//       keyboardNavigationMap: {
//         Enter: "tds_amount",
//       },
//     },
//     {
//       label: "Tds Amount",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "tds_amount",
//       type: "text",
//       placeHolder: "",
//       toValidate: false,
//       regExpValidation: "[a-zA-z]",
//       keyboardNavigationMap: {
//         Enter: "net_balance",
//       },
//     },
//     {
//       label: "Net Balance",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "net_balance",
//       type: "text",
//       placeHolder: "",
//       toValidate: false,
//       regExpValidation: "[a-zA-z]",
//       keyboardNavigationMap: {
//         Enter: "owner_name",
//       },
//     },
//   ],
//   "group-2": [
//     {
//       label: "Owner Name",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "owner_name",
//       type: "text",
//       placeHolder: "",
//       url: SERVER_URL + "/branch/",
//       suggestionKeyword: "name",
//       suggestionSchema: {
//         vehicle_id: "vehicle_id",
//         vehicle_no: "vehicle_no",
//         driver_name: "driver_name",
//         owner_name: "owner_name",
//       },
//       toValidate: true,
//       regExpValidation: "[a-zA-z]",
//       keyboardNavigationMap: {
//         Enter: "driver_name",
//       },
//     },
//     {
//       label: "Driver Name",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "driver_name",
//       type: "text",
//       placeHolder: "",
//       url: SERVER_URL + "/branch/",
//       suggestionKeyword: "name",
//       suggestionSchema: {
//         vehicle_id: "vehicle_id",
//         vehicle_no: "vehicle_no",
//         driver_name: "driver_name",
//         owner_name: "owner_name",
//       },
//       toValidate: false,
//       regExpValidation: "[a-zA-z]",
//       keyboardNavigationMap: {
//         Enter: "remarks",
//       },
//     },
//     {
//       label: "Remarks",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "remarks",
//       type: "text",
//       placeHolder: "",
//       keyboardNavigationMap: {
//         Enter: "payable_branch_name",
//       },
//     },
//     {
//       label: "Payable Branch",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "payable_branch_name",
//       type: "text",
//       placeHolder: "",
//       apiConfigKey: "getCitySuggestions",
//       url: SERVER_URL + "/branch/",
//       suggestionKeyword: "name",
//       suggestionKeywordForFetchApiArgs: "name",
//       suggestionSchema: {
//         branch_id: "payable_branch",
//         name: "payable_branch_name",
//       },
//       toValidate: true,
//       regExpValidation: "[a-zA-z]",
//       apiCallRequiredOnGetValue: true,
//       suggestionChooseQueryKeyword: "branch_id",
//       keyboardNavigationMap: {
//         Enter: "challan_no",
//       },
//     },
//     {
//       label: "Paid At",
//       className: "form-row",
//       labelClassName: "form-label",
//       inputClassName: "form-input",
//       name: "bhada_paid_branch_name",
//       type: "text",
//       placeHolder: "",
//       apiConfigKey: "getCitySuggestions",
//       url: SERVER_URL + "/branch/",
//       suggestionKeyword: "name",
//       suggestionKeywordForFetchApiArgs: "name",
//       suggestionSchema: {
//         branch_id: "payable_branch",
//         name: "payable_branch_name",
//       },
//       toValidate: false,
//       regExpValidation: "[a-zA-z]",
//       apiCallRequiredOnGetValue: true,
//       suggestionChooseQueryKeyword: "branch_id",
//       keyboardNavigationMap: {
//         Enter: "challan_no",
//       },
//     },
//   ],
// };

// const dataObject = {
//   station_from: "",
//   station_to: "",
//   destination: "",
//   station_from_name: "",
//   station_to_name: "",
//   destination_name: "",
//   vehicle_id: "",
//   vehicle_no: "",
//   created_from: "",
//   remarks: "",
//   created_by: "",
//   challan_ids: [],
//   driver_name: "",
//   owner_name: "",
//   trip_no: "",
//   status: "",
//   amount: "",
//   advance_bhada: "",
//   balance_bhada: "",
//   No: "",
//   input_date: formatDate(new Date()),
//   last_trip_no: "",
//   payable_branch: "",
//   payable_branch_name: "",
//   bhada_paid_branch_name: "",
//   tds_rate: "",
//   tds_amount: "",
//   net_balance: "",
// };

// const tripChallanTableHeader = [
//   { label: "S. No.", className: "text-center table-header" },
//   { label: "Challan No.", className: "text-center table-header" },
//   { label: "Challan Date", className: "text-center table-header" },
//   { label: "Station From", className: "text-center table-header" },
//   { label: "Station To", className: "text-center table-header" },
//   // { label: "Destination", className: "text-center table-header" },
//   { label: "Total Pkgs", className: "text-center table-header" },
//   //   { label: "Pay Type", className: "text-center table-header" },
//   //   { label: "Consignor Name", className: "text-center table-header" },
//   //   { label: "Consignor Gst", className: "text-center table-header" },
//   //   { label: "Consignee Name", className: "text-center table-header" },
//   //   { label: "Consignee Gst", className: "text-center table-header" },
//   //   { label: "No Of Package", className: "text-center table-header" },
//   //   { label: "Actual Weight", className: "text-center table-header" },
//   //   { label: "Charge Weight", className: "text-center table-header" },
//   //   { label: "Packing Type", className: "text-center table-header" },
//   //   { label: "Private Marka No", className: "text-center table-header" },
//   //   { label: "Goods Invoice Value", className: "text-center table-header" },
//   //   { label: "Delivery Dest Type", className: "text-center table-header" },
//   //   { label: "Remarks", className: "text-center table-header" },
//   //   { label: "Bilty Charge", className: "text-center table-header" },
//   //   { label: "Other Amount", className: "text-center table-header" },
//   //   { label: "Freight", className: "text-center table-header" },
//   //   { label: "Hamali", className: "text-center table-header" },
//   //   { label: "Door Del Charge", className: "text-center table-header" },
//   { label: "Created From", className: "text-center table-header" },
//   { label: "Created By", className: "text-center table-header" },
// ];

// const tripChallanTableItems = [
//   {
//     type: "text",
//     name: "booking_chalan_no",
//     label: "Bilty No",
//     className: "form-control-medlarge-col",
//   },
//   {
//     type: "text",
//     name: "booking_chalan_date",
//     label: "Bilty Date",
//     className: "form-control-medlarge-col",
//   },
//   {
//     type: "text",
//     name: "station_from_name",
//     label: "Station From",
//     className: "form-control-medlarge-col",
//   },
//   {
//     type: "text",
//     name: "station_to_name",
//     label: "Station To",
//     className: "form-control-large-col",
//   },
//   // {
//   //   type: "text",
//   //   name: "destination_name",
//   //   label: "Destination",
//   //   className: "form-control-large-col",
//   // },
//   {
//     type: "text",
//     name: "total_pkgs",
//     label: "Total Pkgs",
//     className: "form-control-medlarge-col",
//   },
//   //   {
//   //     type: "text",
//   //     name: "pay_type",
//   //     label: "Pay Type",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "consignor_name",
//   //     label: "Consignor Name",
//   //     className: "form-control-medium-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "consignor_gst",
//   //     label: "Consignor Gst",
//   //     className: "form-control-medium-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "consignee_name",
//   //     label: "Consignee Name",
//   //     className: "form-control-medium-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "consignee_gst",
//   //     label: "Consignee Gst",
//   //     className: "form-control-medium-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "no_of_package",
//   //     label: "No Of Package",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "actual_weight",
//   //     label: "Actual Weight",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "charge_weight",
//   //     label: "Charge Weight",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "packing_type",
//   //     label: "Packing Type",
//   //     className: "form-control-large-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "private_marka_no",
//   //     label: "Private Marka No",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "goods_invoice_value",
//   //     label: "Goods Invoice Value",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "delivery_dest_type",
//   //     label: "Delivery Dest Type",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "remarks",
//   //     label: "Remarks",
//   //     className: "form-control-medium-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "bilty_charge",
//   //     label: "Bilty Charge",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "other_amount",
//   //     label: "Other Amount",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "freight",
//   //     label: "Freight",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "hamali",
//   //     label: "Hamali",
//   //     className: "form-control-small-col",
//   //   },
//   //   {
//   //     type: "text",
//   //     name: "door_del_charge",
//   //     label: "Door Del Charge",
//   //     className: "form-control-small-col",
//   //   },
//   {
//     type: "text",
//     name: "created_from_name",
//     label: "Created From",
//     className: "form-control-medlarge-col",
//   },
//   {
//     type: "text",
//     name: "created_by_name",
//     label: "Created By",
//     className: "form-control-medlarge-col",
//   },
// ];

// function validate(values) {
//   let errors = {};

//   function validator(value, regexp) {
//     var regex = new RegExp(regexp);
//     if (values.hasOwnProperty(value)) {
//       if (!values[value].trim()) {
//         errors[value] = "Required Field";
//       } else if (!regex.test(values[value])) {
//         errors[value] = "Validation Error";
//       } else {
//         errors[value] = "";
//       }
//     }
//   }
//   for (let group_name of groupNames) {
//     for (let i = 0; i < groupInfo[group_name].length; i++) {
//       console.log(groupInfo[group_name][i]);
//       let field_object = groupInfo[group_name][i];
//       if (field_object.toValidate) {
//         validator(field_object.name, field_object.regExpValidation);
//       }
//     }
//   }
//   return errors;
// }

// const popupInfo = {
//   "success_header": "Trip Saving Successful ",
//   "error_header": "Error In Trip Module ",
//   "success_title": "Trip is successfully created with the following info:-",
//   "field_label_success": "Trip No.",
//   "field_name_success": "trip_no",
//   "error_title": "Error in Trip module with the following info:-",
//   "field_label_error": "Error:"
// }

// export {
//   groupInfo,
//   groupNames,
//   dataObject,
//   tripChallanTableHeader,
//   tripChallanTableItems,
//   validate,
//   popupInfo
// };



import { SERVER_URL } from "./config";


const groupNames = ["group-1", "group-2"];

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

const groupInfo = {
  "group-1": [
    {
      label: "Vehicle No.",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "vehicle_no",
      type: "text",
      placeHolder: "1234",
      apiConfigKey: "getVehicleSuggestions",
      url: SERVER_URL + "/vehicle/",
      suggestionKeyword: "vehicle_no",
      suggestionKeywordForFetchApiArgs: "vehicle_no",
      suggestionSchema: {
        vehicle_id: "vehicle_id",
        vehicle_no: "vehicle_no",
        driver_name: "driver_name",
        owner_name: "owner_name",
        tds_rate: "tds_rate",
        pan_no: "pan_no",
      },
      suggestionChooseQueryKeyword: "vehicle_no",
      apiCallRequiredOnGetValue: true,
      keyboardNavigationMap: {
        Enter: "station_from_name",
      },
      toValidate: true,
      valueVerificationFromSuggestionNeeded: true,
      valueVerificationCompulsionField: "vehicle_id",
    },
    {
      label: "Station From",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "station_from_name",
      type: "text",
      placeHolder: "",
      apiConfigKey: "getCitySuggestions",
      url: SERVER_URL + "/branch/",
      suggestionKeyword: "name",
      suggestionKeywordForFetchApiArgs: "name",
      suggestionSchema: {
        branch_id: "station_from",
        name: "station_from_name",
      },
      toValidate: true,
      regExpValidation: "[a-zA-z]",
      apiCallRequiredOnGetValue: true,
      suggestionChooseQueryKeyword: "branch_id",
      keyboardNavigationMap: {
        Enter: "station_to_name",
      },
    },
    {
      label: "Station To",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "station_to_name",
      type: "text",
      placeHolder: "",
      apiConfigKey: "getCitySuggestions",
      url: SERVER_URL + "/branch/",
      suggestionKeyword: "name",
      suggestionKeywordForFetchApiArgs: "name",
      suggestionSchema: {
        branch_id: "station_to",
        name: "station_to_name",
      },
      toValidate: true,
      regExpValidation: "[a-zA-z]",
      apiCallRequiredOnGetValue: true,
      suggestionChooseQueryKeyword: "branch_id",
      keyboardNavigationMap: {
        Enter: "remarks",
      },
    },
    {
      label: "Remarks",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "remarks",
      type: "text",
      placeHolder: "",
      keyboardNavigationMap: {
        Enter: "payable_branch_name",
      },
    },
    // {
    //   label: "Payable Branch",
    //   className: "form-row",
    //   labelClassName: "form-label",
    //   inputClassName: "form-input",
    //   name: "payable_branch_name",
    //   type: "text",
    //   placeHolder: "",
    //   keyboardNavigationMap: {
    //     Enter: "bhada_paid_branch_name",
    //   },
    // },
    {
      label: "Payable Branch",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "payable_branch_name",
      type: "text",
      placeHolder: "",
      apiConfigKey: "getCitySuggestions",
      url: SERVER_URL + "/branch/",
      suggestionKeyword: "name",
      suggestionKeywordForFetchApiArgs: "name",
      suggestionSchema: {
        branch_id: "payable_branch",
        name: "payable_branch_name",
      },
      toValidate: true,
      regExpValidation: "[a-zA-z]",
      apiCallRequiredOnGetValue: true,
      suggestionChooseQueryKeyword: "branch_id",
      keyboardNavigationMap: {
        Enter: "broker_name",
      },
    },
    {
      label: "Paid At",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "bhada_paid_branch_name",
      type: "text",
      placeHolder: "",
      // apiConfigKey: "getCitySuggestions",
      // url: SERVER_URL + "/branch/",
      // suggestionKeyword: "name",
      // suggestionKeywordForFetchApiArgs: "name",
      // suggestionSchema: {
      //   branch_id: "payable_branch",
      //   name: "payable_branch_name",
      // },
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      // apiCallRequiredOnGetValue: true,
      // suggestionChooseQueryKeyword: "branch_id",
      keyboardNavigationMap: {
        Enter: "broker_name",
      },
      valueVerificationFromSuggestionNeeded: true,      
    },
    // {
    //   label: "Amount",
    //   className: "form-row",
    //   labelClassName: "form-label",
    //   inputClassName: "form-input",
    //   name: "amount",
    //   type: "text",
    //   placeHolder: "",
    //   toValidate: false,
    //   regExpValidation: "[a-zA-z]",
    //   keyboardNavigationMap: {
    //     Enter: "advance_bhada",
    //   },
    // },
   
    // {
    //   label: "Balance",
    //   className: "form-row",
    //   labelClassName: "form-label",
    //   inputClassName: "form-input",
    //   name: "balance_bhada",
    //   type: "text",
    //   placeHolder: "",
    //   toValidate: false,
    //   regExpValidation: "[a-zA-z]",
    //   keyboardNavigationMap: {
    //     Enter: "tds_amount",
    //   },
    // },
  
    // {
    //   label: "Net Balance",
    //   className: "form-row",
    //   labelClassName: "form-label",
    //   inputClassName: "form-input",
    //   name: "net_balance",
    //   type: "text",
    //   placeHolder: "",
    //   toValidate: false,
    //   regExpValidation: "[a-zA-z]",
    //   keyboardNavigationMap: {
    //     Enter: "owner_name",
    //   },
    // },
  ],
  "group-2": [
    {
      label: "Owner Name",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "owner_name",
      type: "text",
      placeHolder: "",
      url: SERVER_URL + "/branch/",
      suggestionKeyword: "name",
      suggestionSchema: {
        vehicle_id: "vehicle_id",
        vehicle_no: "vehicle_no",
        driver_name: "driver_name",
        owner_name: "owner_name",
      },
      toValidate: true,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "pan_no",
      },
    },
    {
      label: "Pan Card No.",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "pan_no",
      type: "text",
      placeHolder: "",
      url: SERVER_URL + "/branch/",
      suggestionKeyword: "name",
      suggestionSchema: {
        vehicle_id: "vehicle_id",
        vehicle_no: "vehicle_no",
        driver_name: "driver_name",
        owner_name: "owner_name",
      },
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "driver_name",
      },
    },
    {
      label: "Driver Name",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "driver_name",
      type: "text",
      placeHolder: "",
      url: SERVER_URL + "/branch/",
      suggestionKeyword: "name",
      suggestionSchema: {
        vehicle_id: "vehicle_id",
        vehicle_no: "vehicle_no",
        driver_name: "driver_name",
        owner_name: "owner_name",
      },
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "broker_name",
      },
    },
    {
      label: "Broker Name",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "broker_name",
      type: "text",
      placeHolder: "",
      // url: SERVER_URL + "/branch/",
      // suggestionKeyword: "name",
      // suggestionSchema: {
      //   vehicle_id: "vehicle_id",
      //   vehicle_no: "vehicle_no",
      //   driver_name: "driver_name",
      //   owner_name: "owner_name",
      // },
      // toValidate: false,
      // regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "challan_no",
      },
    },
  ],
  "group-3":[
    {
      label: "Rate On",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "rate_on",
      type: "dropdown",
      dropdown_items: [
        { value: "1", label: "Weight" },
        { value: "2", label: "Package" },        
        { value: "3", label: "Fix" },        
      ],
      placeHolder: "",
      keyboardNavigationMap: {
        Enter: "rate",
      },
    },
    {
      label: "Total Package",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input-disabled",
      disabledField:true,
      name: "total_pkg",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "actual_weight",
      },
    },
    {
      label: "Actual Weight",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      disabledField:true,
      name: "actual_weight",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "our_weight",
      },
    },
    {
      label: "Our Weight",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      disabledField:true,
      name: "our_weight",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "crossing_weight",
      },
    },
    {
      label: "Crossing Weight",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      disabledField:true,
      name: "crossing_weight",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "truck_rate",
      },
    },
  ],
  "group-4":[
    {
      label: "Rate",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "rate",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "truck_weight",
      },
    },
    {
      label: "Weight",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "truck_weight",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "labour",
      },
    },
    {
      label: "Truck Hire",
      className: "form-row",
      labelClassName: "form-label",
      inputClassName: "form-input",
      name: "truck_hire",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      // keyboardNavigationMap: {
      //   Enter: "labour_charge",
      // },
    },
  ],
  "group-5":[
    {
      label: "Labour",
      className: "form-row-first-grid-container",
      labelClassName: "form-row-first-label",
      inputClassName: "form-row-first-input",
      name: "labour",
      type: "text",
      cssChangeName:"trip-master",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "other_charge",
      },
    },
    // {
    //   label: "Labour Calculation",
    //   className: "form-field-left",
    //   labelClassName: "form-label",
    //   inputClassName: "form-input",
    //   name: "labour_calculation",
    //   type: "text",
    //   placeHolder: "",
    //   toValidate: false,
    //   regExpValidation: "[a-zA-z]",
    //   keyboardNavigationMap: {
    //     Enter: "other_charge",
    //   },
    // },
    {
      label: "Other Charges",
      className: "form-row-second-grid-container",
      labelClassName: "form-row-second-label",
      inputClassName: "form-row-second-input",
      name: "other_charge",
      type: "text",
      placeHolder: "",
      cssChangeName:"trip-master",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "cash_received_by_driver",
      },
    },
    {
      label: "Cash BY Driver",
      className: "form-row-second-grid-container",
      labelClassName: "form-row-second-label",
      inputClassName: "form-row-second-input",
      name: "cash_received_by_driver",
      type: "text",
      cssChangeName:"trip-master",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "advance_bhada",
      },
    },
    {
      label: "Gross Amount",
      className: "form-row-second-grid-container",
      labelClassName: "form-row-second-label",
      inputClassName: "form-row-second-input",
      disabledField:true,
      name: "gross_amount",
      type: "text",
      cssChangeName:"trip-master",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "advance_bhada",
      },
    },
    {
      label: "Tds Amount",
      className: "form-row-second-grid-container",
      labelClassName: "form-row-second-label",
      inputClassName: "form-row-second-input",
      name: "tds_amount",
      cssChangeName:"trip-master",
      disabledField:true,
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "advance_bhada",
      },
    },
    {
      label: "Advance",
      className: "form-row-second-grid-container",
      labelClassName: "form-row-second-label",
      inputClassName: "form-row-second-input",
      name: "advance_bhada",
      cssChangeName:"trip-master",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "rebate",
      },
    },
    {
      label: "Rebate",
      className: "form-row-first-grid-container",
      labelClassName: "form-row-first-label",
      inputClassName: "form-row-first-input",
      name: "rebate",
      cssChangeName:"trip-master",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "crossing",
      },
    },
    // {
    //   label: "Rebate Calculation",
    //   className: "form-row",
    //   labelClassName: "form-label",
    //   inputClassName: "form-input",
    //   name: "rebate_calculation",
    //   type: "text",
    //   placeHolder: "",
    //   toValidate: false,
    //   regExpValidation: "[a-zA-z]",
    //   keyboardNavigationMap: {
    //     Enter: "crossing",
    //   },
    // },
    {
      label: "Crossing Rate",
      className: "form-row-first-grid-container",
      labelClassName: "form-row-first-label",
      inputClassName: "form-row-first-input",
      name: "crossing",
      cssChangeName:"trip-master",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "print_button",
      },
    },
    // {
    //   label: "Crossing Calculation",
    //   className: "form-row",
    //   labelClassName: "form-label",
    //   inputClassName: "form-input",
    //   name: "crossing_calculation",
    //   type: "text",
    //   placeHolder: "",
    //   toValidate: false,
    //   regExpValidation: "[a-zA-z]",
    //   keyboardNavigationMap: {
    //     Enter: "total_to_pay",
    //   },
    // },
    {
      label: "Total To Pay",
      className: "form-row-second-grid-container",
      labelClassName: "form-row-second-label",
      inputClassName: "form-row-second-input",
      name: "total_to_pay",
      cssChangeName:"trip-master",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "pay_to_driver",
      },
    },
    {
      label: "Pay To Driver",
      className: "form-row-second-grid-container",
      labelClassName: "form-row-second-label",
      inputClassName: "form-row-second-input",
      disabledField:true,
      name: "pay_to_driver",
      cssChangeName:"trip-master",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "net_amount",
      },
    },
    {
      label: "Net Amount",
      className: "form-row-second-grid-container",
      labelClassName: "form-row-second-label",
      inputClassName: "form-row-second-input",
      disabledField:true,
      name: "net_amount",
      cssChangeName:"trip-master",
      type: "text",
      placeHolder: "",
      toValidate: false,
      regExpValidation: "[a-zA-z]",
      keyboardNavigationMap: {
        Enter: "advance_bhada",
      },
    },
  ],
};


const dataObject = {

  station_from: "",
  station_to: "",
  destination: "",
  station_from_name: "",
  station_to_name: "",
  destination_name: "",
  vehicle_id: "",
  vehicle_no: "",
  created_from: "",
  remarks: "",
  created_by: "",
  challan_ids: [],
  driver_name: "",
  owner_name: "",
  trip_no: "",
  status: "",
  amount: 0,
  
  
  balance_bhada: "",
  No: "",
  input_date: formatDate(new Date()),
  last_trip_no: "",
  payable_branch: "",
  payable_branch_name: "",
  bhada_paid_branch_name: "",
  tds_rate: "",  
  net_balance: "",

  // changed from group-2
  

  // Group-2
  pan_no:"",
  broker_name:"",

  // Last Changed 
  // for group - 3
  rate_on:"1",
  crossing_weight:"",
  our_weight:"",
  actual_weight:"",
  total_pkg:"",


  // for group-4
  rate:"",
  truck_weight:"",
  truck_hire:"",

  //for group-5
  labour:"",
  labour_calculation:"",
  other_charge:"",
  cash_received_by_driver:0,
  gross_amount:"",  
  // tds_amount:"",
  advance_bhada: "",
  rebate:"",
  rebate_calculation:"",
  crossing:"",
  crossing_calculation:"",
  total_to_pay:"",
  pay_to_driver:"",
  net_amount:"",

  // additional_data
};

const tripChallanTableHeader = [
  { label: "S. No.", className: "text-center table-header" },
  { label: "Challan No.", className: "text-center table-header" },
  { label: "Challan Date", className: "text-center table-header" },
  { label: "Station From", className: "text-center table-header" },
  { label: "Station To", className: "text-center table-header" },
  // { label: "Destination", className: "text-center table-header" },
  { label: "Total Pkgs", className: "text-center table-header" },
  { label: "Weight", className: "text-center table-header" },
  { label: "To Pay", className: "text-center table-header" },
  { label: "Paid", className: "text-center table-header" },
  { label: "To be Billed", className: "text-center table-header" },
  //   { label: "Consignee Name", className: "text-center table-header" },
  //   { label: "Consignee Gst", className: "text-center table-header" },
  //   { label: "No Of Package", className: "text-center table-header" },
  //   { label: "Actual Weight", className: "text-center table-header" },
  //   { label: "Charge Weight", className: "text-center table-header" },
  //   { label: "Packing Type", className: "text-center table-header" },
  //   { label: "Private Marka No", className: "text-center table-header" },
  //   { label: "Goods Invoice Value", className: "text-center table-header" },
  //   { label: "Delivery Dest Type", className: "text-center table-header" },
  //   { label: "Remarks", className: "text-center table-header" },
  //   { label: "Bilty Charge", className: "text-center table-header" },
  //   { label: "Other Amount", className: "text-center table-header" },
  //   { label: "Freight", className: "text-center table-header" },
  //   { label: "Hamali", className: "text-center table-header" },
  //   { label: "Door Del Charge", className: "text-center table-header" },
  // { label: "Created From", className: "text-center table-header" },
  // { label: "Created By", className: "text-center table-header" },
];

const tripChallanTableItems = [
  {
    type: "text",
    name: "booking_chalan_no",
    label: "Bilty No",
    className: "form-control-medlarge-col",
  },
  {
    type: "text",
    name: "booking_chalan_date",
    label: "Bilty Date",
    className: "form-control-medlarge-col",
  },
  {
    type: "text",
    name: "station_from_name",
    label: "Station From",
    className: "form-control-medlarge-col",
  },
  {
    type: "text",
    name: "station_to_name",
    label: "Station To",
    className: "form-control-medium-col",
  },
 
  // {
  //   type: "text",
  //   name: "destination_name",
  //   label: "Destination",
  //   className: "form-control-large-col",
  // },
  {
    type: "text",
    name: "total_pkgs",
    label: "Total Pkgs",
    className: "form-control-medium-col",
  },
  {
    type: "text",
    name: "total_weight",
    label: "Weight",
    className: "form-control-medium-col",
  },
  {
    type: "text",
    name: "total_to_pay",
    label: "To Pay",
    className: "form-control-small-col",
  },
  {
    type: "text",
    name: "total_to_paid",
    label: "Paid",
    className: "form-control-medium-col",
  },
  {
    type: "text",
    name: "to_be_billed",
    label: "To Be Billed",
    className: "form-control-medium-col",
  },
  //   {
  //     type: "text",
  //     name: "consignor_gst",
  //     label: "Consignor Gst",
  //     className: "form-control-medium-col",
  //   },
  //   {
  //     type: "text",
  //     name: "consignee_name",
  //     label: "Consignee Name",
  //     className: "form-control-medium-col",
  //   },
  //   {
  //     type: "text",
  //     name: "consignee_gst",
  //     label: "Consignee Gst",
  //     className: "form-control-medium-col",
  //   },
  //   {
  //     type: "text",
  //     name: "no_of_package",
  //     label: "No Of Package",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "actual_weight",
  //     label: "Actual Weight",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "charge_weight",
  //     label: "Charge Weight",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "packing_type",
  //     label: "Packing Type",
  //     className: "form-control-large-col",
  //   },
  //   {
  //     type: "text",
  //     name: "private_marka_no",
  //     label: "Private Marka No",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "goods_invoice_value",
  //     label: "Goods Invoice Value",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "delivery_dest_type",
  //     label: "Delivery Dest Type",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "remarks",
  //     label: "Remarks",
  //     className: "form-control-medium-col",
  //   },
  //   {
  //     type: "text",
  //     name: "bilty_charge",
  //     label: "Bilty Charge",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "other_amount",
  //     label: "Other Amount",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "freight",
  //     label: "Freight",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "hamali",
  //     label: "Hamali",
  //     className: "form-control-small-col",
  //   },
  //   {
  //     type: "text",
  //     name: "door_del_charge",
  //     label: "Door Del Charge",
  //     className: "form-control-small-col",
  //   },

  // {
  //   type: "text",
  //   name: "created_from_name",
  //   label: "Created From",
  //   className: "form-control-medlarge-col",
  // },
  // {
  //   type: "text",
  //   name: "created_by_name",
  //   label: "Created By",
  //   className: "form-control-medlarge-col",
  // },
];

function validate(values) {
  let errors = {};

  function validator(value, regexp) {
    var regex = new RegExp(regexp);
    if (values.hasOwnProperty(value)) {
      if (!values[value].trim()) {
        errors[value] = "Required Field";
      } else if (!regex.test(values[value])) {
        errors[value] = "Validation Error";
      } else {
        errors[value] = "";
      }
    }
  }
  for (let group_name of groupNames) {
    for (let i = 0; i < groupInfo[group_name].length; i++) {
      console.log(groupInfo[group_name][i]);
      let field_object = groupInfo[group_name][i];
      if (field_object.toValidate) {
        validator(field_object.name, field_object.regExpValidation);
      }
    }
  }
  return errors;
}

const popupInfo = {
  "success_header": "Trip Saving Successful ",
  "error_header": "Error In Trip Module ",
  "success_title": "Trip is successfully created with the following info:-",
  "field_label_success": "Trip No.",
  "field_name_success": "trip_no",
  "error_title": "Error in Trip module with the following info:-",
  "field_label_error": "Error:"
}

export {
  groupInfo,
  groupNames,
  dataObject,
  tripChallanTableHeader,
  tripChallanTableItems,
  validate,
  popupInfo
};
