

const outcomes = {
    0: "All set",
    1: "Passwords do not match",
    3: "Username can not be empty",
    4: "Password can not be empty",
    5: "Length of password should be more than 5",
}

const validate = ({ name, password, confirmPassword }) => {

    // if (typeof name === "undefined" || !name.length) {
    //     return 3;
    // }

    // if (typeof password === "undefined" || !password.length) {
    //     return 4;
    // }

    // if (password.length <= 5) {
    //     return 5;
    // }

    if (password !== confirmPassword) {
        return 1;
    }

    return 0;
}

const groupInfo = {
    "group-3": [
        { key: 758, branch_name: "Ahmedabad".toUpperCase() },
        { key: 757, branch_name: "Aslali".toUpperCase() },
        { key: 763, branch_name: "Badharna".toUpperCase() },
        { key: 766, branch_name: "Bhavnagar".toUpperCase() },
        { key: 761, branch_name: "Gandhinagar".toUpperCase() },
        { key: 760, branch_name: "Jaipur".toUpperCase() },
        { key: 1, branch_name: "Narol".toUpperCase() },
        { key: 765, branch_name: "Piplej".toUpperCase() },
        { key: 759, branch_name: "Surat".toUpperCase()},
    ],
    "group-menu": [
        {
            "id": 1,
            "name": "bilty"
        },
        {
            "id": 2,
            "name": "challan"
        },
        {
            "id": 3,
            "name": "mr"
        },
        {
            "id": 4,
            "name": "bilty-inquiry"
        },
        {
            "id": 5,
            "name": "mr-inquiry"
        },
        {
            "id": 6,
            "name": "inward"
        },
        {
            "id": 7,
            "name": "biltystatement"
        },
        {
            "id": 8,
            "name": "mrstatement"
        },
        {
            "id": 9,
            "name": "consignorbilling"
        },
        {
            "id": 10,
            "name": "pod_statement"
        },
        {
            "id": 11,
            "name": "crossingbilling"
        },
        {
            "id": 12,
            "name": "tripbhada"
        },
        {
            "id": 13,
            "name": "pod_challan"
        },
        {
            "id": 14,
            "name": "pod_challan_inward"
        },
        {
            "id": 15,
            "name": "crossingOutward"
        },
        {
            "id": 16,
            "name": "report-bilty"
        },
        {
            "id": 17,
            "name": "report-challan"
        },
        {
            "id": 18,
            "name": "ewbextensionreport"
        },
        {
            "id": 19,
            "name": "ackpendingpartyreport"
        },
        {
            "id": 20,
            "name": "general_rate_master"
        },
        {
            "id": 21,
            "name": "account_master"
        },
        {
            "id": 22,
            "name": "station_master"
        },
        {
            "id": 23,
            "name": "item_master"
        },
        {
            "id": 24,
            "name": "vehicle"
        },
        {
            "id": 25,
            "name": "party_rate_master"
        },
        {
            "id": 26,
            "name": "trip"
        },
        {
            "id": 27,
            "name": "crossingInward"
        },
        {
            "id": 28,
            "name": "branch-sel"
        },
        {
            "id": 29,
            "name": "account-transaction?voucher_type=jv"
        },
        {
            "id": 30,
            "name": "account-report"
        },
        {
            "id": 31,
            "name": "marfatiya-wise"
        },
        {
            "id": 32,
            "name": "report-trip"
        },
        {
            "id": 33,
            "name": "brokerage"
        },
        {
            "id": 34,
            "name": "brokerage-summary"
        },
        {
            "id": 35,
            "name": "bilty-ack"
        },
        {
            "id": 36,
            "name": "admin-report-bilty"
        },
        {
            "id": 37,
            "name": "report-vehicleregister"
        },
        {
            "id": 38,
            "name": "report-vehicle"
        },
        {
            "id": 39,
            "name": "vehicleregister"
        },
        {
            "id": 40,
            "name": "account-report"
        },
        {
            "id": 41,
            "name": "account-transaction?voucher_type=cp"
        },
        {
            "id": 42,
            "name": "account-transaction?voucher_type=cr"
        },
        {
            "id": 43,
            "name": "account-transaction?voucher_type=br"
        },
        {
            "id": 44,
            "name": "account-transaction?voucher_type=bp"
        },
        {
            "id": 45,
            "name": "account-transaction"
        },
        {
            "id": 46,
            "name": "report-bill"
        },
        {
            "id": 47,
            "name": "bill-paid"
        },
        {
            "id": 48,
            "name": "crossing-outward-report"
        },
        {
            "id": 49,
            "name": "outstanding-partywise"
        },
        {
            "id": 50,
            "name": "pl-report"
        },
        {
            "id": 51,
            "name": "tds-report"
        },
        {
            "id": 52,
            "name": "vinod-report"
        },
        {
            "id": 53,
            "name": "opening-balance"
        }
    ],
}

const comp = (a, b) => {
    return a.branch_name.localeCompare(b.branch_name);
}

let tmp = groupInfo["group-3"];
tmp.sort(comp);

export { validate, outcomes, groupInfo }