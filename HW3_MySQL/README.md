Query Problems 
For this homework you must create and execute queries against the Northwinds database to fulfill the requirements listed below. For each query requirement the number of rows to expect in your answer set is listed in parentheses.  
1.  Create an alphabetical listing (Last Name, First Name) of all employees not living in the USA who have been employed with Northwinds for at least 5 years as of today. (3)  

2.  Prepare a Reorder List for products currently in stock. (Products in stock have at least one unit in inventory.)  Show Product ID, Name, Quantity in Stock and Unit Price for products whose inventory level is at or below the reorder level. (17)  

3.  What is the name and unit price of the most expensive product sold by Northwinds? Use a sub query. (1)  

4.  Create a list of the products in stock which have an inventory value (the number of units in stock multiplied by the unit price) over $2000.  Show the answer set columns as Product ID, Product Name and “Total Inventory Value” in order of descending inventory value (highest to lowest.)  (13) 

5.  List the country and a count of Orders for all the orders that shipped outside the USA during September 2013 in ascending country sequence. (9)  

6.  List the CustomerID and CompanyName of the customers who have more than 20 orders. (3) 
 
7.  Create a Supplier Inventory report (by Supplier ID) showing the total value of their inventory in stock.  (“value of inventory” = UnitsInStock * UnitPrice.)  List only those suppliers from whom Northwinds receives more than 3 different items. (4) 
 
8.  Create a SUPPLIER PRICE LIST showing the Supplier CompanyName, ProductName and UnitPrice for all products from suppliers located in the United States of America. Sort the list in order from HIGHEST price to LOWEST price. (12) 
 
9.  Create an EMPLOYEE ORDER LIST showing, in alphabetical order (by full name), the LastName, FirstName, Title, Extension and Number of Orders for each employee who has more than 100 orders. (4)  
 
10.  Create an ORDERS EXCEPTION LIST showing the CustomerID and the CompanyName of all customers who have no orders on file.  (2) 
 
11.  Create an OUT OF STOCK LIST showing the Supplier CompanyName,  Supplier ContactName, Product CategoryName,  CategoryDescription,  ProductName and UnitsOnOrder for all products that are out of stock  (UnitsInStock = 0). (5) 
 
12.  List the productname, suppliername, supplier country and UnitsInStock for all the products that come in a bottle or bottles. (11 or 12 depending on your assumptions…) 
 
13. Create a NEW table named “Top_Items”  with the following columns:  ItemID (integer), ItemCode (integer), ItemName (varchar(40)), InventoryDate (DATE), SupplierID (integer),  ItemQuantity (integer)and ItemPrice (decimal (9,2)) .  None of these columns can be NULL.  Include a PRIMARY KEY constraint on ItemID. (No answer set needed.) 
 
14.  Populate the new table “Top_Items” using these columns from the nwProducts table. ProductID   ItemID CategoryID  ItemCode ProductName  ItemName Today’s date  Inventory Date UnitsInStock  ItemQuantity UnitPrice  ItemPrice SupplierID  SupplierID for those products whose inventory value is greater than $2,500.  (No answer set needed.)  (HINT: the inventory value of an Item is ItemPrice times ItemQuantity. ) 

15. Delete the rows in Top_Items  for suppliers from Canada. (2 rows deleted. No answer set needed.)   16.  Add a new column to the Top_Items table called InventoryValue ((decimal (9,2))) after the inventory date. No answer set needed. 
 
17.  Update the Top_Items table, setting the InventoryValue column equal to ItemPrice times ItemQuantity. (No answer set needed.) 
 
18. Drop the Top_Items table. No answer set needed. 
 
 
