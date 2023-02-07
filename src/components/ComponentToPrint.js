import React from "react";
// import { Component } from "react";
import "./ComponentToPrint.css";
import { groupInfo } from "../config/Biltyform.js";
let converter=require("number-to-words");
let delivery_at = ["DOOR", "GODOWN", "PRIORITY"];
let dict = {};
class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <page>
        <div id="master">
          <div id="main">
            <div id="row1">
              <div id="r1col1">
                <div id="title"></div>
                <div id="consign-details">
                  <div id="consign-details1">
                    <label id="consignor">
                      {this.props.fields.consignor_name.toUpperCase()}
                    </label>
                    <label id="consignorGst">
                      {this.props.fields.consignor_gst.toUpperCase()}
                    </label>   
                  </div>
                  <div id="consign-details2">
                  <label id="consignee">
                      {this.props.fields.consignee_name.toUpperCase()}
                    </label>
                    <label id="consigneeGst">
                      {this.props.fields.consignee_gst.toUpperCase()}
                    </label>
                  </div>
                </div>
              </div>
              <div id="consignment-note">
                <div id="no-date">
                  <label id="consignment-note-no-label">
                    {this.props.fields.bilty_no}
                  </label>
                  <label id="consignment-note-date-label">
                    {String(this.props.fields.input_date.getUTCDate()) +
                      "/" +
                      String(this.props.fields.input_date.getUTCMonth() + 1) +
                      "/" +
                      String(this.props.fields.input_date.getUTCFullYear())}
                  </label>
                </div>
                <div id="from">
                  <label id="consignment-note-from-label">
                    {this.props.fields.station_from_name}
                  </label>
                </div>
                <div id="to">
                  <label id="consignment-note-to-label">
                    {this.props.fields.station_to_name}
                  </label>
                  <div id="address">{this.props.fields.station_to_address}</div>
                  <div id="remarks">{this.props.remarks?this.props.remarks:(this.props.fields.pay_type===1?"To Pay":"")}</div>
                </div>
              </div>
            </div>
            <div id="row2">
              <div id="no-of-articles">
                <label id="no-of-articles-label">
                  {this.props.fields.item_in.map((d) => (
                    <React.Fragment>
                      {d.pkgs} <br/>
                      {d.packing_type.toUpperCase()}<br/>
                      --------
                      {converter.toWords(isFinite(parseInt(d.pkgs))?d.pkgs:0).toUpperCase()} ONLY
                    </React.Fragment>))}
                </label>
                {/* <label id="no-of-articles-label-packing-type">
              {this.props.fields.item_in.map((d) => (
                <React.Fragment>{d.pkgs} <br></br> </React.Fragment>
              ))}
            </label> */}
              </div>
              <div id="description">
                <label id="description-label">
                  {this.props.fields.item_in.map((d) => (
                    <React.Fragment>
                      {d.item_name} <br/>
                      {this.props.fields.private_marka_no}<br/>
                      {this.props.fields.goods_invoice_value}
                    </React.Fragment>
                  ))}
                </label>
              </div>
              <div id="weight">
                <div id="ch">
                  <label id="ch-label">
                    {this.props.fields.item_in.map((d) => (
                      <React.Fragment>
                        {d.weight} <br/><br/><br/><br/>
                        {d.c_wgt}
                      </React.Fragment>
                    ))}
                  </label>
                </div>
              </div>
              <div id="total-details">
                <div id="additional-charges">
                <b id="empty"></b><div id="amount">{groupInfo["group-1"][3]["dropdown_items"][
                      this.props.fields.pay_type - 1
                    ].label == "To Pay"
                      ? this.props.fields.item_in[0]["amt"]
                      : ""}</div>
                <div id="amount">{groupInfo["group-1"][3]["dropdown_items"][
                      this.props.fields.pay_type - 1
                    ].label == "Paid"
                      ? this.props.fields.item_in[0]["amt"]
                      : ""}</div><br/>
                  <b>Builty</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.bilty_charge > 0
                      ? this.props.fields.bilty_charge
                      : "00"
                    : ""}</div>
                  <br />
                  <b id="l">Bulky&nbsp;Goods</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.door_del_charge > 0
                      ? this.props.fields.door_del_charge
                      : "00"
                    : ""}</div>
                  <br />
                  <b id="p">P.F.</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.door_del_charge > 0
                      ? this.props.fields.door_del_charge
                      : "00"
                    : ""}</div>
                  <br />
                  <b id="h">Hamali</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.hamali > 0
                      ? this.props.fields.hamali
                      : "00"
                    : ""}</div>
                  <br />
                  <b>Other</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.other_amount > 0
                      ? this.props.fields.other_amount
                      : "00"
                    : ""}</div>
                  <br/><br/>
                  <b id="empty"></b><div id="amount">
                  {this.props.fields.pay_type != 4
                    ? this.props.fields.other_amount > 0
                      ? this.props.fields.other_amount
                      : "00"
                    : ""}</div>
                  <b id="empty">&ensp;</b><div id="total-amount">{groupInfo["group-1"][3]["dropdown_items"][
                      this.props.fields.pay_type - 1
                    ].label == "To Be Billed"
                      ? ""
                      : this.props.fields.new_total_amount}</div>
                  </div>
              </div>
            </div>
            <div id="row4">
              <div id="booking-officer">
                <label>
                  {JSON.parse(sessionStorage.getItem("user_name"))[
                    "user_name"
                  ].toUpperCase()}
                </label>
              </div>
            </div>
          </div>
          {/* <br /> */}
          {/* //Part 2 */}

        <div id="main1">
        <div id="row1">
              <div id="r1col1">
                <div id="title"></div>
                <div id="consign-details">
                  <div id="consign-details1">
                    <label id="consignor">
                      {this.props.fields.consignor_name.toUpperCase()}
                    </label>
                    <label id="consignorGst">
                      {this.props.fields.consignor_gst.toUpperCase()}
                    </label>   
                  </div>
                  <div id="consign-details2">
                  <label id="consignee">
                      {this.props.fields.consignee_name.toUpperCase()}
                    </label>
                    <label id="consigneeGst">
                      {this.props.fields.consignee_gst.toUpperCase()}
                    </label>
                  </div>
                </div>
              </div>
              <div id="consignment-note">
                <div id="no-date">
                  <label id="consignment-note-no-label">
                    {this.props.fields.bilty_no}
                  </label>
                  <label id="consignment-note-date-label">
                    {String(this.props.fields.input_date.getUTCDate()) +
                      "/" +
                      String(this.props.fields.input_date.getUTCMonth() + 1) +
                      "/" +
                      String(this.props.fields.input_date.getUTCFullYear())}
                  </label>
                </div>
                <div id="from">
                  <label id="consignment-note-from-label">
                    {this.props.fields.station_from_name}
                  </label>
                </div>
                <div id="to">
                  <label id="consignment-note-to-label">
                    {this.props.fields.station_to_name}
                  </label>
                  <div id="address">{this.props.fields.station_to_address}</div>
                  <div id="remarks">{this.props.fields.remarks?this.props.fremarks:(this.props.fields.pay_type===1?"To Pay":"")}</div>
                </div>
              </div>
            </div>
            <div id="row2">
              <div id="no-of-articles">
                <label id="no-of-articles-label">
                  {this.props.fields.item_in.map((d) => (
                    <React.Fragment>
                      {d.pkgs} <br/>
                      {d.packing_type.toUpperCase()}<br/>
                      --------
                      {converter.toWords(isFinite(parseInt(d.pkgs))?d.pkgs:0).toUpperCase()} ONLY
                    </React.Fragment>))}
                </label>
                {/* <label id="no-of-articles-label-packing-type">
              {this.props.fields.item_in.map((d) => (
                <React.Fragment>{d.pkgs} <br></br> </React.Fragment>
              ))}
            </label> */}
              </div>
              <div id="description">
                <label id="description-label">
                  {this.props.fields.item_in.map((d) => (
                    <React.Fragment>
                      {d.item_name} <br/>
                      {this.props.fields.private_marka_no}<br/>
                      {this.props.fields.goods_invoice_value}
                    </React.Fragment>
                  ))}
                </label>
              </div>
              <div id="weight">
                <div id="ch">
                  <label id="ch-label">
                    {this.props.fields.item_in.map((d) => (
                      <React.Fragment>
                        {d.weight} <br/><br/><br/><br/>
                        {d.c_wgt}
                      </React.Fragment>
                    ))}
                  </label>
                </div>
              </div>
              <div id="total-details">
                <div id="additional-charges">
                <b id="empty"></b><div id="amount">{groupInfo["group-1"][3]["dropdown_items"][
                      this.props.fields.pay_type - 1
                    ].label == "To Pay"
                      ? this.props.fields.item_in[0]["amt"]
                      : ""}</div>
                <div id="amount">{groupInfo["group-1"][3]["dropdown_items"][
                      this.props.fields.pay_type - 1
                    ].label == "Paid"
                      ? this.props.fields.item_in[0]["amt"]
                      : ""}</div><br/>
                  <b>Builty</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.bilty_charge > 0
                      ? this.props.fields.bilty_charge
                      : "00"
                    : ""}</div>
                  <br />
                  <b id="l">Bulky&nbsp;Goods</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.door_del_charge > 0
                      ? this.props.fields.door_del_charge
                      : "00"
                    : ""}</div>
                  <br />
                  <b id="p">P.F.</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.door_del_charge > 0
                      ? this.props.fields.door_del_charge
                      : "00"
                    : ""}</div>
                  <br />
                  <b id="h">Hamali</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.hamali > 0
                      ? this.props.fields.hamali
                      : "00"
                    : ""}</div>
                  <br />
                  <b>Other</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.other_amount > 0
                      ? this.props.fields.other_amount
                      : "00"
                    : ""}</div>
                  <br/><br/>
                  <b id="empty"></b><div id="amount">
                  {this.props.fields.pay_type != 4
                    ? this.props.fields.other_amount > 0
                      ? this.props.fields.other_amount
                      : "00"
                    : ""}</div>
                  <b id="empty">&ensp;</b><div id="total-amount">{groupInfo["group-1"][3]["dropdown_items"][
                      this.props.fields.pay_type - 1
                    ].label == "To Be Billed"
                      ? ""
                      : this.props.fields.new_total_amount}</div>
                  </div>
              </div>
            </div>
            <div id="row4">
              <div id="booking-officer">
                <label>
                  {JSON.parse(sessionStorage.getItem("user_name"))[
                    "user_name"
                  ].toUpperCase()}
                </label>
              </div>
            </div>
          </div>
          {/* <br /> */}
          {/* pART3 */}
        <div id="main2">
        <div id="row1">
              <div id="r1col1">
                <div id="title"></div>
                <div id="consign-details">
                  <div id="consign-details1">
                    <label id="consignor">
                      {this.props.fields.consignor_name.toUpperCase()}
                    </label>
                    <label id="consignorGst">
                      {this.props.fields.consignor_gst.toUpperCase()}
                    </label>   
                  </div>
                  <div id="consign-details2">
                  <label id="consignee">
                      {this.props.fields.consignee_name.toUpperCase()}
                    </label>
                    <label id="consigneeGst">
                      {this.props.fields.consignee_gst.toUpperCase()}
                    </label>
                  </div>
                </div>
              </div>
              <div id="consignment-note">
                <div id="no-date">
                  <label id="consignment-note-no-label">
                    {this.props.fields.bilty_no}
                  </label>
                  <label id="consignment-note-date-label">
                    {String(this.props.fields.input_date.getUTCDate()) +
                      "/" +
                      String(this.props.fields.input_date.getUTCMonth() + 1) +
                      "/" +
                      String(this.props.fields.input_date.getUTCFullYear())}
                  </label>
                </div>
                <div id="from">
                  <label id="consignment-note-from-label">
                    {this.props.fields.station_from_name}
                  </label>
                </div>
                <div id="to">
                  <label id="consignment-note-to-label">
                    {this.props.fields.station_to_name}
                  </label>
                  <div id="address">{this.props.fields.station_to_address}</div>
                  <div id="remarks">{this.props.remarks?this.props.remarks:(this.props.fields.pay_type===1?"To Pay":"")}</div>
                </div>
              </div>
            </div>
            
            <div id="row2">
              <div id="no-of-articles">
                <label id="no-of-articles-label">
                  {this.props.fields.item_in.map((d) => (
                    <React.Fragment>
                      {d.pkgs} <br/>
                      {d.packing_type.toUpperCase()}<br/>
                      --------
                      {converter.toWords(isFinite(parseInt(d.pkgs))?d.pkgs:0).toUpperCase()} ONLY
                    </React.Fragment>))}
                </label>
                {/* <label id="no-of-articles-label-packing-type">
              {this.props.fields.item_in.map((d) => (
                <React.Fragment>{d.pkgs} <br></br> </React.Fragment>
              ))}
            </label> */}
              </div>
              <div id="description">
                <label id="description-label">
                  {this.props.fields.item_in.map((d) => (
                    <React.Fragment>
                      {d.item_name} <br/>
                      {this.props.fields.private_marka_no}<br/>
                      {this.props.fields.goods_invoice_value}
                    </React.Fragment>
                  ))}
                </label>
              </div>
              <div id="weight">
                <div id="ch">
                  <label id="ch-label">
                    {this.props.fields.item_in.map((d) => (
                      <React.Fragment>
                        {d.weight} <br/><br/><br/><br/>
                        {d.c_wgt}
                      </React.Fragment>
                    ))}
                  </label>
                </div>
              </div>
              <div id="total-details">
                <div id="additional-charges">
                <b id="empty"></b><div id="amount">{groupInfo["group-1"][3]["dropdown_items"][
                      this.props.fields.pay_type - 1
                    ].label == "To Pay"
                      ?this.props.fields.item_in[0]["amt"]
                      : ""}</div>
                <div id="amount">{groupInfo["group-1"][3]["dropdown_items"][
                      this.props.fields.pay_type - 1
                    ].label == "Paid"
                      ?this.props.fields.item_in[0]["amt"]
                      : ""}</div><br/>
                  <b>Builty</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.bilty_charge > 0
                      ? this.props.fields.bilty_charge
                      : "00"
                    : ""}</div>
                  <br />
                  <b id="l">Bulky&nbsp;Goods</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.door_del_charge > 0
                      ? this.props.fields.door_del_charge
                      : "00"
                    : ""}</div>
                  <br />
                  <b id="p">P.F.</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.door_del_charge > 0
                      ? this.props.fields.door_del_charge
                      : "00"
                    : ""}</div>
                  <br />
                  <b id="h">Hamali</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.hamali > 0
                      ? this.props.fields.hamali
                      : "00"
                    : ""}</div>
                  <br />
                  <b>Other</b><div id="amount">{this.props.fields.pay_type != 4
                    ? this.props.fields.other_amount > 0
                      ? this.props.fields.other_amount
                      : "00"
                    : ""}</div>
                  <br/><br/>
                  <b id="empty"></b><div id="amount">
                  {this.props.fields.pay_type != 4
                    ? this.props.fields.other_amount > 0
                      ? this.props.fields.other_amount
                      : "00"
                    : ""}</div>
                  <b id="empty">&ensp;</b><div id="total-amount">{groupInfo["group-1"][3]["dropdown_items"][
                      this.props.fields.pay_type - 1
                    ].label == "To Be Billed"
                      ? ""
                      : this.props.fields.new_total_amount}</div>
                  </div>
              </div>
            </div>
            <div id="row4">
              <div id="booking-officer">
                <label>
                  {JSON.parse(sessionStorage.getItem("user_name"))[
                    "user_name"
                  ].toUpperCase()}
                </label>
              </div>
            </div>
          </div>
          </div>
      </page>
    );
  }
}

export default ComponentToPrint;