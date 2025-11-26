const payload = msg.payload;

if (typeof payload === "object" && payload !== null) {
  const current_work_order = payload?.Name;
  if (current_work_order) {
    flow.set("current_work_order", current_work_order);
    return msg;
  }
}

flow.set("current_work_order", "");
return msg;
