work_order_id = frappe.form_dict.work_order_id
purpose = frappe.form_dict.purpose
qty = frappe.form_dict.qty
target_warehouse = None
is_additional_transfer_entry = False

work_order = frappe.get_doc("Work Order", work_order_id)
if not frappe.db.get_value("Warehouse", work_order.wip_warehouse, "is_group"):
    wip_warehouse = work_order.wip_warehouse
else:
    wip_warehouse = None

stock_entry = frappe.new_doc("Stock Entry")
stock_entry.purpose = purpose
stock_entry.work_order = work_order_id
stock_entry.company = work_order.company
stock_entry.from_bom = 1
stock_entry.bom_no = work_order.bom_no
stock_entry.use_multi_level_bom = work_order.use_multi_level_bom
if purpose in ["Material Transfer for Manufacture", "Manufacture"]:
    stock_entry.subcontracting_inward_order = work_order.subcontracting_inward_order
# accept 0 qty as well
stock_entry.fg_completed_qty = (
    qty
    if qty is not None
    else (frappe.utils.flt(work_order.qty) - frappe.utils.flt(work_order.produced_qty))
)

if work_order.bom_no:
    stock_entry.inspection_required = frappe.db.get_value(
        "BOM", work_order.bom_no, "inspection_required"
    )

if purpose == "Material Transfer for Manufacture":
    stock_entry.to_warehouse = wip_warehouse
    stock_entry.project = work_order.project
else:
    stock_entry.from_warehouse = (
        work_order.source_warehouse
        if work_order.skip_transfer and not work_order.from_wip_warehouse
        else wip_warehouse
    )
    stock_entry.to_warehouse = work_order.fg_warehouse
    stock_entry.project = work_order.project

if purpose == "Disassemble":
    stock_entry.from_warehouse = work_order.fg_warehouse
    stock_entry.to_warehouse = target_warehouse or work_order.source_warehouse

stock_entry.set_stock_entry_type()
stock_entry.is_additional_transfer_entry = is_additional_transfer_entry
stock_entry.get_items(qty, work_order.production_item)

if purpose != "Disassemble":
    stock_entry.set_serial_no_batch_for_finished_good()


# Save the document to the database
stock_entry.docstatus = 1
stock_entry.insert()  # Use insert() for new documents
# or new_doc.save() if the document already exists and you are updating it
frappe.db.commit()  # Required if running in a console or external script
frappe.response["message"] = stock_entry.as_dict()
