import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { userRouter } from './user/user.router';
import { organisationRouter } from './organisation/organisation.router';
import { productRouter } from './product/product.router';
import { supplierRouter } from './supplier/supplier.router';
import itemRouter from './item/item.router';
import categoryRouter from './category/category.router';
import subCategoryRouter from './subCategory/subCategory.router';
import itemInWarehouseRouter from './itemInWarehouse/itemInWarehouse.router';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/organisations', organisationRouter);
app.use('/api/products', productRouter);
app.use('/api/suppliers', supplierRouter);
app.use('/api/items', itemRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/sub-categories', subCategoryRouter);
app.use('/api/items-in-warehouse', itemInWarehouseRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
