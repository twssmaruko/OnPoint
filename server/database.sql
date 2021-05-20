CREATE DATABASE onpoint_database;

CREATE TABLE vendor (
    vendor_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255),
    tel_no VARCHAR(255),
    terms VARCHAR(50)
);

CREATE TABLE product (
    product_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(255),
    description VARCHAR(255)
);

CREATE TABLE purchase_request (
    purchase_request_id BIGSERIAL PRIMARY KEY NOT NULL,
    is_approved BOOLEAN,
    purchase_request_number VARCHAR(20),
    date_created DATE,
    requested_by VARCHAR(100),
    status VARCHAR (20)

);

CREATE TABLE purchase_request_order (
    purchase_request_order_id BIGSERIAL PRIMARY KEY NOT NULL,
    purchase_request_id BIGSERIAL,
    item_type VARCHAR(50),
    product VARCHAR(255),
    quantity INT,
    quantity_left INT,
    unit VARCHAR(20),
    unit_price FLOAT,
    CONSTRAINT fk_purchase_request
        FOREIGN KEY(purchase_request_id)
            REFERENCES purchase_request(purchase_request_id)

);


CREATE TABLE project (
    project_id BIGSERIAL PRIMARY KEY NOT NULL,
    project_location VARCHAR (255),
    project_status VARCHAR(20),
    client_name VARCHAR (255),
    project_code VARCHAR (20),
    project_name VARCHAR(255)

);

CREATE TABLE project_budget (
    project_budget_id BIGSERIAL PRIMARY KEY NOT NULL,
    project_id BIGSERIAL,
    contract_price FLOAT,
    budget_price FLOAT,
    profit FLOAT,
    profit_margin FLOAT,
    CONSTRAINT fk_project
        FOREIGN KEY(project_id)
            REFERENCES project(project_id)
);

CREATE TABLE budget_cost (
    budget_cost_id BIGSERIAL PRIMARY KEY NOT NULL,
    project_budget_id BIGSERIAL,
    budget_name VARCHAR (255),
    total_cost FLOAT,
    amount_spent FLOAT,
    item_code VARCHAR(10),
    CONSTRAINT fk_project_budget
        FOREIGN KEY(project_budget_id)
            REFERENCES project_budget(project_budget_id)

);

CREATE TABLE budget_subcategory (
    budget_subcategory_id BIGSERIAL PRIMARY KEY NOT NULL,
    budget_cost_id BIGSERIAL,
    budget_subcategory_name VARCHAR (255),
    total_cost FLOAT,
    amount_spent FLOAT,
    item_code VARCHAR (10),
    CONSTRAINT fk_budget_cost
        FOREIGN KEY(budget_cost_id)
            REFERENCES budget_cost(budget_cost_id)

);

CREATE TABLE subcategory_item (
    subcategory_item_id BIGSERIAL PRIMARY KEY NOT NULL,
    budget_subcategory_id BIGSERIAL,
    subcategory_item_no INT,
    amount_spent FLOAT,
    subcategory_item_name VARCHAR(255),
    subcategory_item_cost FLOAT,
    CONSTRAINT fk_budget_subcategory
        FOREIGN KEY(budget_subcategory_id)
            REFERENCES budget_subcategory(budget_subcategory_id)

);



CREATE TABLE purchase_order (
    purchase_order_id BIGSERIAL PRIMARY KEY NOT NULL,
    purchase_request_id BIGSERIAL,
    vendor_id BIGSERIAL,
    project_id BIGSERIAL,
    notes VARCHAR(255),
    purchase_order_number VARCHAR(20),
    date_created DATE,
    requested_by VARCHAR(100),
    status VARCHAR(20),
    total_price FLOAT,
    CONSTRAINT fk_purchase_request
        FOREIGN KEY(purchase_request_id)
            REFERENCES purchase_request(purchase_request_id),
    CONSTRAINT fk_project
        FOREIGN KEY(project_id)
            REFERENCES project(project_id),
    CONSTRAINT fk_vendor
        FOREIGN KEY(vendor_id)
            REFERENCES vendor(vendor_id)

);


CREATE TABLE purchase_order_order (
    purchase_order_order_id BIGSERIAL PRIMARY KEY NOT NULL,
    purchase_order_id BIGSERIAL,
    item_type VARCHAR(50),
    product VARCHAR(255),
    quantity INT,
    unit VARCHAR(20),
    category VARCHAR(20),
    unit_price FLOAT,
    total_price FLOAT,
    CONSTRAINT fk_purchase_order
        FOREIGN KEY(purchase_order_id)
            REFERENCES purchase_order(purchase_order_id)

);




