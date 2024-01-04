-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('REQUESTED', 'TRANSIT_WAREHOUSE', 'TRANSIT_STORE', 'RECEIVED');

-- CreateEnum
CREATE TYPE "TransferDestination" AS ENUM ('STORE', 'WAREHOUSE');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfEdits" INTEGER NOT NULL,
    "maxNumberOfEdits" INTEGER NOT NULL DEFAULT 50000,
    "reportsGenerated" INTEGER NOT NULL,
    "maxNumberOfReportsToGenerate" INTEGER NOT NULL DEFAULT 1000,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductMapping" (
    "id" TEXT NOT NULL,
    "organisationId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userRole" "UserRoles" NOT NULL,
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "sku" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedOn" TIMESTAMP(3),
    "supplierId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "changedById" TEXT,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "supplierName" TEXT NOT NULL,
    "address" TEXT,
    "contactNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedOn" TIMESTAMP(3),
    "addedById" TEXT NOT NULL,
    "changedById" TEXT,
    "organisationId" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedOn" TIMESTAMP(3),
    "addedById" TEXT NOT NULL,
    "changedById" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategory" (
    "id" TEXT NOT NULL,
    "subCategoryName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedOn" TIMESTAMP(3),
    "categoryId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "changedById" TEXT,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryMapping" (
    "itemId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "subCategoryId" TEXT NOT NULL,

    CONSTRAINT "CategoryMapping_pkey" PRIMARY KEY ("itemId","categoryId","subCategoryId")
);

-- CreateTable
CREATE TABLE "ItemInWarehouse" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "inUnitsOf" TEXT NOT NULL,
    "priceAtCost" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedOn" TIMESTAMP(3),
    "itemId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "changedById" TEXT,

    CONSTRAINT "ItemInWarehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WarehouseStockCard" (
    "id" TEXT NOT NULL,
    "quantityIn" INTEGER NOT NULL,
    "quantityOut" INTEGER NOT NULL,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedOn" TIMESTAMP(3),
    "itemInWarehouseId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "changedById" TEXT,

    CONSTRAINT "WarehouseStockCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemInStore" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "inUnitsOf" TEXT NOT NULL,
    "retailPrice" DOUBLE PRECISION NOT NULL,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedOn" TIMESTAMP(3),
    "itemId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "changedById" TEXT,

    CONSTRAINT "ItemInStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreStockCard" (
    "id" TEXT NOT NULL,
    "quantityIn" INTEGER NOT NULL,
    "quantityOut" INTEGER NOT NULL,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedOn" TIMESTAMP(3),
    "itemInStoreId" TEXT NOT NULL,
    "addedById" TEXT NOT NULL,
    "changedById" TEXT,

    CONSTRAINT "StoreStockCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTransferReportHeader" (
    "id" TEXT NOT NULL,
    "reportName" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "addedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedOn" TIMESTAMP(3),
    "addedById" TEXT NOT NULL,
    "changedById" TEXT,

    CONSTRAINT "StockTransferReportHeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockTransferReport" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "destination" "TransferDestination" NOT NULL,
    "status" "TransferStatus" NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "StockTransferReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_key" ON "Item"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Item_sku_key" ON "Item"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_supplierName_key" ON "Supplier"("supplierName");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_subCategoryName_key" ON "SubCategory"("subCategoryName");

-- CreateIndex
CREATE UNIQUE INDEX "ItemInWarehouse_itemId_key" ON "ItemInWarehouse"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemInStore_itemId_key" ON "ItemInStore"("itemId");

-- AddForeignKey
ALTER TABLE "ProductMapping" ADD CONSTRAINT "ProductMapping_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductMapping" ADD CONSTRAINT "ProductMapping_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryMapping" ADD CONSTRAINT "CategoryMapping_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryMapping" ADD CONSTRAINT "CategoryMapping_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryMapping" ADD CONSTRAINT "CategoryMapping_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInWarehouse" ADD CONSTRAINT "ItemInWarehouse_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInWarehouse" ADD CONSTRAINT "ItemInWarehouse_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInWarehouse" ADD CONSTRAINT "ItemInWarehouse_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseStockCard" ADD CONSTRAINT "WarehouseStockCard_itemInWarehouseId_fkey" FOREIGN KEY ("itemInWarehouseId") REFERENCES "ItemInWarehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseStockCard" ADD CONSTRAINT "WarehouseStockCard_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WarehouseStockCard" ADD CONSTRAINT "WarehouseStockCard_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInStore" ADD CONSTRAINT "ItemInStore_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInStore" ADD CONSTRAINT "ItemInStore_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemInStore" ADD CONSTRAINT "ItemInStore_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreStockCard" ADD CONSTRAINT "StoreStockCard_itemInStoreId_fkey" FOREIGN KEY ("itemInStoreId") REFERENCES "ItemInStore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreStockCard" ADD CONSTRAINT "StoreStockCard_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreStockCard" ADD CONSTRAINT "StoreStockCard_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferReportHeader" ADD CONSTRAINT "StockTransferReportHeader_addedById_fkey" FOREIGN KEY ("addedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferReportHeader" ADD CONSTRAINT "StockTransferReportHeader_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockTransferReport" ADD CONSTRAINT "StockTransferReport_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
