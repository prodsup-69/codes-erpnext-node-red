# API to Create Stock Entry for a Work Order

- Create Server Script API Endpoint: `make_stock_entry`
- Access at http://localhost:8001/api/method/make_stock_entry

- API Method: `make_stock_entry` (I thought it was `POST`, but it is not.)
- Header:

  - `Content-Type: application/json`
  - `Authorization: token KEY:SECRET`

- Payload Example:

Create Material Transfer Stock Entry

```json
{
  "work_order_id": "MFG-WO-2025-00013",
  "purpose": "Material Transfer for Manufacture"
}
```

Create Manufacture Stock Entry

```json
{
  "work_order_id": "MFG-WO-2025-00013",
  "purpose": "Manufacture",
  "qty": 5
}
```
