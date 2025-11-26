const domain = "https://pm4-erp30.iecmu.com";
const rootURL = `${domain}/api/method/make_stock_entry`;
const apiKey = ""; // Your API Key here
const apiSecret = ""; // Your API Secret here

const current_work_order = flow.get("current_work_order");
const counter = flow.get("counter");

msg.payload = {
  work_order_id: current_work_order,
  purpose: "Manufacture",
  qty: counter,
};

msg.url = rootURL;
// You also need to set POST method in HTTP Request node.
msg.method = "POST";
if (!msg.headers) {
  msg.headers = {};
}
msg.headers["Content-Type"] = "application/json";
msg.headers["Authorization"] = `token ${apiKey}:${apiSecret}`;
return msg;
