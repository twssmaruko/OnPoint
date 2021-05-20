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

app.get('/purchase_requests', purchaseRequestDB.getPurchaseRequests);
app.get('/purchase_requests/:id', purchaseRequestDB.getPurchaseRequest);
app.get('/last_id', purchaseRequestDB.getLastPurchaseRequestID);
app.post('/purchase_requests', purchaseRequestDB.createPurchaseRequest);
app.delete('/purchase_requests/:id', purchaseRequestDB.deletePurchaseRequest);

//PURCHASE REQUEST ORDERS

app.get('/purchase_requests/orders', purchaseRequestOrderDB.getPurchaseRequestOrders);
app.get('/purchase_requests/orders/:id', purchaseRequestOrderDB.getPurchaseRequestOrder);
app.post('/purchase_requests/orders', purchaseRequestOrderDB.createPurchaseRequestOrder);

//PROJECTS

app.get('/projects', projectDB.getProjects);
app.get('/projects/:id', projectDB.getProject);
app.get('projects/project_id', projectDB.getProject);
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

//PURCHASE ORDERS

app.get('/purchase_orders' , purchaseOrderDB.getPurchaseOrders);
app.get('/purchase_orders/:id', purchaseOrderDB.getPurchaseOrder);
app.post('/purchase_orders', purchaseOrderDB.createPurchaseOrder);
// app.delete('/purchase_orders/:id', purchaseOrderDB.deletePurchaseOrder);


app.listen(5000, () => {
    console.log('server has started on port 5000');
});

