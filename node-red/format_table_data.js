const _data = msg.payload?.data;

// Validate that payload data is an array
if (!Array.isArray(_data)) {
  msg.payload = [];
  flow.set("current_work_order", "");
  return msg;
}

// Format the data into a more readable table structure
const data = _data.map((d) => {
  return {
    Name: d["name"],
    Item: d["production_item"],
    "Target Qty": d["qty"],
    "To Be Produced": d["material_transferred_for_manufacturing"],
    Produced: d["produced_qty"],
  };
});

// If no work orders found, clear the current_work_order flow variable
if (data.length == 0) {
  flow.set("current_work_order", "");
}

msg.payload = data;
return msg;
