const domain = "https://pm4-erp30.iecmu.com";
const rootURL = `${domain}/api/resource/Work Order`;
const apiKey = ""; // Your API Key here
const apiSecret = ""; // Your API Secret here
const query = new URLSearchParams({
  fields: JSON.stringify(["*"]),
  filters: JSON.stringify([
    ["docstatus", "=", "1"],
    ["status", "in", ["Not Started", "In Process"]],
  ]),
});

msg.url = `${rootURL}?${query.toString()}`;
msg.method = "GET";
if (!msg.headers) {
  msg.headers = {};
}
msg.headers["Content-Type"] = "application/json";
msg.headers["Authorization"] = `token ${apiKey}:${apiSecret}`;
return msg;
