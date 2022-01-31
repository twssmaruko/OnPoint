const express = require('express');
const app = express();
const cors = require('cors');

const vendorDB = require('./vendors/queries');
const productDB = require('./products/queries');
const purchaseRequestDB = require('./purchase_request/queries');
const purchaseRequestOrderDB = require('./purchase_request/purchase_request_order/queries');
const projectDB = require('./project/queries');
const budgetSubcategoryDB = require('./project/budget/budget_subcategory/queries');
const budgetDB = require('./project/budget/queries');
const budgetCostDB = require('./project/budget/budget_cost/queries');
const subcategoryItemDB = require('./project/budget/budget_subcategory/subcategory_item/queries');
const purchaseOrderDB = require('./purchase_order/purchase_order');
const purchaseOrderOrderDB = require('./purchase_order/order/order');
const materialsReceivingDB = require('./materials_receiving/materials_receiving');
const equipmentDB = require('./equipment/equipment');

//middlware

app.use(cors());
app.use(express.json()); //req.body

//PRODUCTS

app.post('/products', productDB.createProduct);
app.get('/products', productDB.getProducts);
app.get('/products/:id', productDB.getProduct);
app.put('/products/:id', productDB.updateProduct);
app.delete('/products/:id', productDB.deleteProduct);


//VENDORS

app.get('/vendors', vendorDB.getVendors);
app.get('/vendors/:id', vendorDB.getVendor);
app.post('/vendors', vendorDB.createVendor);
app.delete('/vendors/:id', vendorDB.deleteVendor);
app.put('/vendors/:id', vendorDB.updateVendor);

//PURCHASE REQUESTS

app.get('/purchase_request_number/:id', purchaseRequestDB.getPurchaseRequestNumber);
app.get('/purchase_requests', purchaseRequestDB.getPurchaseRequests);
app.put('/pr_status/:id', purchaseRequestDB.updatePurchaseRequestStatus);
app.get('/purchase_requests/:id', purchaseRequestDB.getPurchaseRequest);
app.get('/last_id', purchaseRequestDB.getLastPurchaseRequestID);
app.post('/purchase_requests', purchaseRequestDB.createPurchaseRequest);
app.delete('/purchase_requests/:id', purchaseRequestDB.deletePurchaseRequest);

//PURCHASE REQUEST ORDERS

app.get('/purchase_requests/orders', purchaseRequestOrderDB.getPurchaseRequestOrders);
app.get('/pr_quantity/:id', purchaseRequestOrderDB.getPurchaseRequestOrderQuantityLeft);
app.put('/pr_quantity/:id', purchaseRequestOrderDB.updatePurchaseRequestOrderQuantityLeft);
app.get('/purchase_requests/orders/:id', purchaseRequestOrderDB.getAllPurchaseRequestOrder);
app.post('/purchase_requests/orders', purchaseRequestOrderDB.createPurchaseRequestOrder);

//PROJECTS

app.get('/project_code/:id', projectDB.getProjectCode);
app.get('/projects', projectDB.getProjects);
app.get('/projects/:id', projectDB.getProject);
app.get('projects/project_id', projectDB.getProject);
app.get('/project_categories/:id', projectDB.getCategories);
app.post('/projects', projectDB.createProject);
app.delete('/projects/:id', projectDB.deleteProject);

//PROJECT BUDGET

app.get('/projects/budgets/', budgetDB.getBudgets);
app.get('/projects/budgets/:id', budgetDB.getBudget);
app.post('/projects/budgets', budgetDB.createBudget);
app.delete('projects/budgets/:id', budgetDB.deleteBudget);

//PROJECT BUDGET COST

app.get('/projects/budgets/costs', budgetCostDB.getBudgetCosts);
app.get('/projects/budgets/costs/:id', budgetCostDB.getBudgetCost);
app.post('/projects/budgets/costs', budgetCostDB.createBudgetCost);


//PROJECT BUDGET SUBCATEGORY

app.get('/projects/budgets/costs/subcategories/', budgetSubcategoryDB.getBudgetSubcategories);
app.get('/projects/budgets/costs/subcategories/:id', budgetSubcategoryDB.getBudgetSubcategory);
app.post('/projects/budgets/costs/subcategories/', budgetSubcategoryDB.createBudgetSubcategory);

// PROJECT BUDGET SUBCATEGORY ITEM

app.get('/projects/budgets/costs/subcategories/items', subcategoryItemDB.getSubcategoryItems);
app.get('/projects/budgets/costs/subcategories/items/:id', subcategoryItemDB.getSubcategoryItem);
app.post('/projects/budgets/costs/subcategories/items', subcategoryItemDB.createSubCategoryItem);
app.get('/projects/categories/:id', subcategoryItemDB.getCategories);

//PURCHASE ORDERS

app.get('/purchase_orders' , purchaseOrderDB.getPurchaseOrders);
app.get('/purchase_orders/:id', purchaseOrderDB.getPurchaseOrder);
app.get('/purchase_order_pending', purchaseOrderDB.getPendingPurchaseOrder);
app.post('/purchase_orders', purchaseOrderDB.createPurchaseOrder);
app.put('/cancel_purchase_order/:id', purchaseOrderDB.cancelPurchaseOrder);
app.delete('/purchase_orders/:id', purchaseOrderDB.deletePurchaseOrder);

// app.delete('/purchase_orders/:id', purchaseOrderDB.deletePurchaseOrder);

//PURCHASE ORDER ORDERS

app.get('/purchase_orders/orders', purchaseOrderOrderDB.getPurchaseOrderOrders);
app.get('/purchase_orders/orders/:id', purchaseOrderOrderDB.getPurchaseOrderOrder);
app.post('/purchase_orders/orders', purchaseOrderOrderDB.createPurchaseOrderOrder);

//MATERIALS RECEIVING

app.get('/materials_receiving', materialsReceivingDB.getMaterialsReceiving);

//EQUIPMENT
app.get('/equipment', equipmentDB.fetchEquipment);
app.get('/equipment/:id',equipmentDB.getEquipment);
app.post('/equipment', equipmentDB.createEquipment);
app.put('/equipment/:id', equipmentDB.updateEquipment);
app.delete('/equipment/:id', equipmentDB.deleteEquipment);


app.listen(5000, () => {
    console.log('server has started on port 5000');
});

