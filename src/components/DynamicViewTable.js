import React from "react";
import "./DynamicTable.css";
import "./DynamicViewTable.css";
import Popup from "reactjs-popup";
import "./popup.css";
import { array } from "yup/lib/locale";


class DynamicViewTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      popup: false,
      idDelete: 0,
      setChallanObj:{}
    };
    this.contentStyle = {
      maxWidth: "600px",
      width: "90%",
    };    
    console.log("PULKIT_TABLEVALUES",this.props.tableValues)
    for (let i = 0; i < this.props.tableValues.length; i++) {
      let row = {};
      for (let tableItem of this.props.tableItems) {
        
        row[tableItem.name] = this.props.tableValues[i][tableItem.name];
      }
      this.state.rows.push(row);
    }
  }

  

  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx][name] = value;
    this.setState({
      rows,
    });
    this.props.setPageStateByField("Items", this.state.rows);
  };

  handleAddRow = () => {
    const item = {};
    for (var tableItem of this.props.tableItems) {
      item[tableItem.name] = "";
    }
    this.setState({
      rows: [...this.state.rows, item],
    });
    this.props.setPageStateByField("Items", this.state.rows);
  };

  handleRemoveSpecificRow = (idx) => () => {
    this.props.setPageStateByField("idDelete",idx);  
    this.props.setPageStateByField("is_redux_call",idx)
    console.log("PULKIT_HEY THERE",idx)
    
    if(this.props.pageStateArray.length > 0){
      console.log("CHECK_THIS_inside",typeof(this.props.pageStateArray[idx]))
      if(this.props.pageStateArray[idx].booking_chalan_no != null){
        this.props.setPageStateByField("deleted_chalan_no",this.props.pageStateArray[idx].booking_chalan_no)
      }

      if(this.props.pageStateArray[idx].bilty_no){
        console.log("TEST_CHALLAN VIEW_TABLE",this.props.pageStateArray.deleted_bilty_no);
        this.props.setPageStateByField("deleted_bilty_no",idx);
        this.props.setPageStateByField("deleted_bilty_number",this.props.pageStateArray[idx].bilty_no);
      }

      if(this.props.pageStateArray[idx].is_crossing_challan){
        this.props.setPageStateByField("deleted_crossing_weight",true);
      }else{
        this.props.setPageStateByField("deleted_crossing_weight",false);
      }
  
    }

    console.log("TET_JUST_deleted_chalan_no",this.props.pageStateArray)

    const rows = [...this.props.pageStateArray];    
    rows.splice(idx, 1);
    
    if (this.props.deleteEntryFromTableCallback != null) {
      this.props.deleteEntryFromTableCallback({ idx: idx, rows: rows });
      return;
    }
    
    this.props.setPageStateByField(this.props.fieldMapping, rows);
  };

  enablePopup = (idx) => {
    console.log("idDelete",idx);
    this.setState({ popup: true, idDelete: idx });
  };

  handleRemoveAllRow = () => () => {
    let dct = { rate_info: [] };
    this.props.setPageState({ ...this.props.pageState, ...dct });
  };

  handleEditSpecificRow = (idx) => () => {
    const rows = [...this.props.pageStateArray];
    let dct = rows[idx];
    if (this.props.fieldMapping == "rate_info") {
      dct.rate_info = rows;
      if (
        this.props.pageState.station_to != "" &&
        this.props.pageState.rate != ""
      ) {
        this.props.setPageMode("error");
        this.props.setPopupError("Clear Or Update existing Entry");
        return;
      }
      // rows.splice(idx, 1);
    } else {
      dct.charge_info = rows;
      if (
        this.props.pageState.other_station_to != "" &&
        this.props.pageState.amount != ""
      ) {
        this.props.setPageMode("error");
        this.props.setPopupError("Clear Or Update existing Entry");
        return;
      }
      // rows.splice(idx, 1);
    }
    rows.splice(idx,1);
    console.log("TET_JUST_REDUX",rows);

    if (this.props.fieldMapping == "rate_info"){
      console.log("DCT:- ",dct)
      dct.unit = dct.unit.toLowerCase()
      this.props.setPageState({ ...this.props.pageState, ...dct });
    }
    else{
      let newState = {}
      console.log("DCT:- new state ",dct)
      newState.other_station_to = dct.station_to
      newState.other_station_to_name = dct.station_to_name
      newState.other_station_from = dct.station_from
      newState.other_station_from_name = dct.station_from_name
      newState.other_item_name = dct.item_name
      newState.other_item_id = dct.item_id
      newState.consignee_name = dct.consignee_name
      newState.consignee_id = dct.consignee_id
      newState.charge = dct.charge
      newState.charge_type = dct.charge_type
      newState.from_c = String(parseInt(dct.qty_from_case) || 0)
      newState.to_c = String(parseInt(dct.qty_to_case) || 0)
      newState.from_w = String(parseInt(dct.qty_from_kg) || 0)
      newState.to_w = String(parseInt(dct.qty_to_kg) || 0)
      newState.amount = dct.amount
      newState.charge_info = dct.charge_info

      if (newState.consignee_id == null){
        newState.consignee_id = ""
      }
      if (newState.consignee_name == null){
        newState.consignee_name = ""
      }
      if (newState.from_c == "0"){
        newState.from_c = ""
      }
      if (newState.from_w == "0"){
        newState.from_w = ""
      }
      if (newState.to_c == "0"){
        newState.to_c = ""
      }
      if (newState.to_w == "0"){
        newState.to_w = ""
      }
      console.log("Only new state ",newState)
      this.props.setPageState({ ...this.props.pageState, ...newState });
    }

    if (this.props.deleteEntryFromTableCallback != null) {
      console.log("In delete entry");
      this.props.deleteEntryFromTableCallback({ idx: idx, rows: rows });
      return;
    }
    // this.props.setPageState({ ...this.props.pageState, ...dct });
    // this.props.setPageStateByField(this.props.fieldMapping, rows);
  };

  onKeyPress = (e, index, totalLength) => {
    // console.log(index, totalLength, e.key);
    if (index + 1 == totalLength && e.key == "Enter") {
      this.handleAddRow();
    }
  };

  selectAll = (arr) => {
    console.log("arr", arr.target.checked)
    if (arr.target.checked){
      this.props.selectAll()
    }
    else{
      this.props.deselectAll()
    }
  };

  getItemValue = (fieldInfoObject, itemObject,idx) => {

    // console.log("FIELD",fieldInfoObject , itemObject);
    const rows = [...this.props.pageStateArray];  
    const dct = rows[idx];
    // console.log("REDUX_CALL_DCT",dct);
    rows.splice(idx,1);

    let newState = {}

    if(this.state.setChallanObj.total_pkgs!==undefined){

      let total_challan_packages = parseFloat(this.state.setChallanObj.total_pkgs) || 0;
      newState.total_challan_packages += (total_challan_packages).toString();
      this.state.setChallanObj = dct;
    }

    if(itemObject.bilty_info){
      let pay_obj = 0;
      let paid_obj = 0;
      let to_be_billed_obj = 0;
      
      console.log("ITEM",this.props.tableValues)
      
      for(let i=0;i<itemObject.bilty_info.length;i++){
        
        console.log("PULKIT_VALA",itemObject.bilty_info[i]);
        if(itemObject.bilty_info[i].pay_type_name == "PAID"){
          paid_obj += parseInt(itemObject.bilty_info[i].total_amount?itemObject.bilty_info[i].total_amount : 0)
          // dispatch(pushChallan(paid_obj))
        }
        if(itemObject.bilty_info[i].pay_type_name == "To Pay"){
          pay_obj += parseInt(itemObject.bilty_info[i].total_amount?itemObject.bilty_info[i].total_amount : 0)        
          // dispatch(pushChallan(pay_obj))
        }
        if(itemObject.bilty_info[i].pay_type_name == "To Be Billed"){
          to_be_billed_obj += parseInt(itemObject.bilty_info[i].total_amount?itemObject.bilty_info[i].total_amount : 0)          
          // dispatch(pushChallan(pay_obj))
        }
        // this.props.setPageStateByField("")
      }  
      
      
      // row name
      // this.props.setPageStateByField("just_pay", pay_obj);
      
      if ("convertFunction" in fieldInfoObject){
        return fieldInfoObject.convertFunction(itemObject)
      }
      else{              
        if(fieldInfoObject.name == "total_to_pay"){  
          console.log("pay",pay_obj);          
          return pay_obj;
        }
        else if(fieldInfoObject.name == "total_to_paid"){          
          return paid_obj;
        }else if(fieldInfoObject.name == "to_be_billed"){
          return to_be_billed_obj;
        }else{
          return itemObject[fieldInfoObject["name"]]
        }
      }
    }
    else{
      
      if ("convertFunction" in fieldInfoObject){
        return fieldInfoObject.convertFunction(itemObject)
      }else{
        return itemObject[fieldInfoObject["name"]]
      }
      
    }




    // console.log("GET_",fieldInfoObject," -> ",itemObject)
    // if(itemObject.length===undefined){
    //   itemObject = [itemObject];
    // }

    // for(let i=0;i<itemObject.length;i++){

    //   if ("convertFunction" in fieldInfoObject){
    //     return fieldInfoObject.convertFunction(itemObject[i])
    //   }
    //   else{
    //     if(itemObject[i].payment_type == "3" && fieldInfoObject.name == "mr_no") {
    //       return itemObject[i][fieldInfoObject["name"]] + " (DUE)";
    //     }
    //     return itemObject[i][fieldInfoObject["name"]]
    //   }
    // }

  }

  render() {
    return (
      <div>
        <div>
          <Popup
            // trigger={<button className="button"> Open Modal </button>}
            open={this.state.popup}
            modal
            contentStyle={this.contentStyle}
            closeOnDocumentClick={false}
          >
            {(close) => (
              <div className="pop-up-container">
                <div className="pop-up-header">
                  Are you sure want to delete entry?
                </div>
                {/* {myForm.pageMode == "submitted" ? (
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
                )} */}
                <div className="pop-up-actions">
                  <button
                    className="pop-up-button"
                    onClick={() => {
                      console.log("id to delete", this.state.idDelete);
                      this.handleRemoveSpecificRow(this.state.idDelete)();
                      this.setState({ popup: false, idDelete: 0 });
                      close();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="pop-up-button"
                    onClick={() => {
                      console.log("id to delete", this.state.idDelete);
                      this.setState({ popup: false, idDelete: 0 });
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
        <div className="dvt-container">
          <div className="row clearfix">
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    {
                        this.props.canView && <div></div>
                    }
                    {this.props.checkBox == 1 ? (
                      <th className="text-center table-header">
                        <div className="form-control-small-col">
                          <input
                            type="checkbox"
                            name="selectall"
                            checked={this.props.getSelectAllValue}
                            onClick={(arr)=>this.selectAll(arr)}
                          ></input>
                        </div>
                      </th>
                    ) : (
                      <th />
                    )}
                    {this.props.tableHeader.map((item) => (
                      <th className={item.className} key={item.label}>
                        {item.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {console.log("TET_TABLEVALUES",this.props)}
                  {localStorage.setItem("tableData",JSON.stringify(this.props.pageStateArray))}
                  {this.props.tableValues.map((item, idx) => (
                    
                    <tr id="addr0" key={idx}>
                        {this.props.canView && <button onClick={() => this.props.handleViewClick(item)}>
                            Open
                        </button>}
                      {this.props.checkBox == 0 ? (
                        <p />
                      ) : (
                        <td>
                          {this.props.checkBox == 1 ? (
                            <div className="form-control-small-col">
                              <input type="checkbox" name="chk"
                              checked={item.checked == "1"}
                              onChange={(arr)=>{
                                this.props.handleCheckboxChange(arr, item, idx);
                              }}
                              ></input>
                            </div>
                          ) : this.props.edit == 1 ? (
                            <button
                              className="item-edit-btn"
                              onClick={this.props.editRowFunction(idx,this.props.fieldMapping)}
                            >
                              EDIT
                            </button>
                          ) : (
                            <button
                              className="item-remove-btn"
                              onClick={this.handleRemoveSpecificRow(idx)}
                              // onClick={() => this.enablePopup(idx)}
                            >
                              -
                            </button>
                          )}
                        </td>
                      )}

                      <td>
                        <div className="form-control-small-col">{idx + 1}</div>
                      </td>
                      
                      {this.props.tableItems.map((row) => (
                         <>
                         
                            <td key={idx + row.name}>
                            <div className={row["className"]}>
                                {/* {item[row["name"]]} */}
                                {this.getItemValue(row, item,idx)}
                            </div>
                            </td>
                         </> 
                      ))}
                      {this.props.delete == 1 ? (
                        <td>
                          <button
                            className="item-delete-btn"
                            // onClick={this.handleRemoveSpecificRow(idx)}
                            onClick={() => this.enablePopup(idx)}
                          >
                            DELETE
                          </button>
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  ))}
                  {/* <tr>
                    <td>
                      <button
                        onClick={this.handleAddRow}
                        className="item-add-btn"
                      >
                        +
                      </button>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DynamicViewTable;
