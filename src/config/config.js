const SERVER_IP = "localhost";
const SERVER_PORT = "8001";
const TRANSPORTER_NAME = "DELHI PEPSU FREIGHT CARRIER (P) LTD"

const USE_OVERLAY = true;

const getLocalFlag = () => {
    try{
        let lo = localStorage.getItem("local_flag") === 'true';
        console.log("Inansdsnns", lo);
      return lo
    } catch(e){
      return false
    }
  }
var SERVER_URL = ""
if (getLocalFlag()){
    console.log("in if")
    SERVER_URL = "http://117.247.91.8:8000";
}
else{
    console.log("in else")
    // SERVER_URL = "http://192.168.1.44:8000";
    SERVER_URL = "http://117.247.91.8:8000";
}
// SERVER_URL = "http://" + SERVER_IP + ":" + SERVER_PORT;
export { SERVER_URL, USE_OVERLAY, TRANSPORTER_NAME };
