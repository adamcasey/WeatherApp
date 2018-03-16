-- #1

select LastName, FirstName, HireDate, Country from nwEmployees
where HireDate <= '2013-07-04'
AND Country <> 'USA' order by LastName asc;
/*
mysql> select LastName, FirstName, HireDate, Country from nwEmployees where HireDate <= '2013-07-04' AND Country <> 'USA' order by LastName asc;
+-----------+-----------+---------------------+---------+
| LastName  | FirstName | HireDate            | Country |
+-----------+-----------+---------------------+---------+
| Dodsworth | Anne      | 2004-11-15 00:00:00 | UK      |
| King      | Robert    | 2012-09-02 00:00:00 | UK      |
| Suyama    | Michael   | 2011-10-17 00:00:00 | UK      |
+-----------+-----------+---------------------+---------+
3 rows in set (0.01 sec)
*/

-- #2

select ProductName, UnitPrice, UnitsInStock from nwProducts
where UnitsInStock < ReorderLevel;

-- #3

SELECT ProductName, UnitPrice     FROM nwProducts
INNER JOIN (SELECT MAX(UnitPrice) AS MaxPrice
FROM nwProducts  GROUP BY UnitPrice) q ON UnitPrice = UnitPrice
AND UnitPrice = q.MaxPrice order by UnitPrice desc limit 1;
/*
mysql> SELECT ProductName, UnitPrice     FROM nwProducts
    -> INNER JOIN (SELECT MAX(UnitPrice) AS MaxPrice
    -> FROM nwProducts  GROUP BY UnitPrice) q ON UnitPrice = UnitPrice
    -> AND UnitPrice = q.MaxPrice order by UnitPrice desc limit 1;
+----------------+-----------+
| ProductName    | UnitPrice |
+----------------+-----------+
| Côte de Blaye  |    263.50 |
+----------------+-----------+
1 row in set (0.00 sec)
*/

-- #4

select ProductID, ProductName, UnitsInStock * UnitPrice as "Inventory Value"
  from nwProducts
    where UnitsInStock * UnitPrice > 2000
  order by UnitsInStock * UnitPrice desc;
  
/*
mysql> select ProductID, ProductName, UnitsInStock * UnitPrice as "Inventory Value"
    ->   from nwProducts
    ->     where UnitsInStock * UnitPrice > 2000
    ->   order by UnitsInStock * UnitPrice desc;
+-----------+------------------------------+-----------------+
| ProductID | ProductName                  | Inventory Value |
+-----------+------------------------------+-----------------+
|        38 | Côte de Blaye                |         4479.50 |
|        59 | Raclette Courdavault         |         4345.00 |
|        12 | Queso Manchego La Pastora    |         3268.00 |
|        20 | Sir Rodney's Marmalade       |         3240.00 |
|        61 | Sirop d'érable               |         3220.50 |
|         6 | Grandma's Boysenberry Spread |         3000.00 |
|         9 | Mishi Kobe Niku              |         2813.00 |
|        55 | Pâté chinois                 |         2760.00 |
|        18 | Carnarvon Tigers             |         2625.00 |
|        40 | Boston Crab Meat             |         2263.20 |
|        22 | Gustaf's Knäckebröd          |         2184.00 |
|        27 | Schoggi Schokolade           |         2151.10 |
|        36 | Inlagd Sill                  |         2128.00 |
+-----------+------------------------------+-----------------+
13 rows in set (0.00 sec)
*/

-- #5

select ShipCountry,COUNT(*) as Orders from nwOrders
where ShipCountry <> 'USA' group by ShipCountry order by ShipCountry asc;

-- #6

select nwOrders.CustomerID, CompanyName, COUNT(nwOrders.CustomerID)
as Orders from nwCustomers, nwOrders
where nwOrders.CustomerID = nwCustomers.CustomerID
group by nwCustomers.CustomerID
having Orders > 20
order by Orders desc;
/*
mysql> select nwOrders.CustomerID, CompanyName, COUNT(nwOrders.CustomerID)
    -> as Orders from nwCustomers, nwOrders
    -> where nwOrders.CustomerID = nwCustomers.CustomerID
    -> group by nwCustomers.CustomerID
    -> having Orders > 20
    -> order by Orders desc;
+------------+--------------------+--------+
| CustomerID | CompanyName        | Orders |
+------------+--------------------+--------+
| SAVEA      | Save-a-lot Markets |     31 |
| ERNSH      | Ernst Handel       |     30 |
| QUICK      | QUICK-Stop         |     28 |
+------------+--------------------+--------+
3 rows in set (0.10 sec)
*/

-- #7 : It works!

select nwProducts.SupplierID, ANY_VALUE(UnitsInStock * UnitPrice) as "Value of Inventory", COUNT(*)
as Products from nwProducts, nwSuppliers
where nwProducts.SupplierID = nwSuppliers.SupplierID
group by nwProducts.SupplierID
having Products > 3
order by Products desc;

/*
mysql> select LastName, FirstName, Title, Extension, COUNT(nwOrders.EmployeeID)
    -> as Orders from nwEmployees, nwOrders
    -> where nwOrders.EmployeeID = nwEmployees.EmployeeID
    -> group by nwEmployees.EmployeeID
    -> having Orders > 100
    -> order by LastName, FirstName asc;
+-----------+-----------+--------------------------+-----------+--------+
| LastName  | FirstName | Title                    | Extension | Orders |
+-----------+-----------+--------------------------+-----------+--------+
| Callahan  | Laura     | Inside Sales Coordinator | 2344      |    104 |
| Davolio   | Nancy     | Sales Representative     | 5467      |    123 |
| Leverling | Janet     | Sales Representative     | 3355      |    127 |
| Peacock   | Margaret  | Sales Representative     | 5176      |    156 |
+-----------+-----------+--------------------------+-----------+--------+
4 rows in set (0.01 sec)
*/

-- #8

select CompanyName, ProductName, UnitPrice
from nwSuppliers left join nwProducts on nwProducts.SupplierID = nwSuppliers.SupplierID
where nwSuppliers.Country like '%USA%'
order by UnitPrice desc;

/*
mysql> select CompanyName, ProductName, UnitPrice
    -> from nwSuppliers left join nwProducts on nwProducts.SupplierID = nwSuppliers.SupplierID
    -> where nwSuppliers.Country like '%USA%'
    -> order by UnitPrice desc;
+-----------------------------+----------------------------------+-----------+
| CompanyName                 | ProductName                      | UnitPrice |
+-----------------------------+----------------------------------+-----------+
| Grandma Kelly's Homestead   | Northwoods Cranberry Sauce       |     40.00 |
| Grandma Kelly's Homestead   | Uncle Bob's Organic Dried Pears  |     30.00 |
| Grandma Kelly's Homestead   | Grandma's Boysenberry Spread     |     25.00 |
| New Orleans Cajun Delights  | Chef Anton's Cajun Seasoning     |     22.00 |
| New Orleans Cajun Delights  | Chef Anton's Gumbo Mix           |     21.35 |
| New Orleans Cajun Delights  | Louisiana Fiery Hot Pepper Sauce |     21.05 |
| New England Seafood Cannery | Boston Crab Meat                 |     18.40 |
| Bigfoot Breweries           | Steeleye Stout                   |     18.00 |
| New Orleans Cajun Delights  | Louisiana Hot Spiced Okra        |     17.00 |
| Bigfoot Breweries           | Sasquatch Ale                    |     14.00 |
| Bigfoot Breweries           | Laughing Lumberjack Lager        |     14.00 |
| New England Seafood Cannery | Jack's New England Clam Chowder  |      9.65 |
+-----------------------------+----------------------------------+-----------+
12 rows in set (0.00 sec)
*/

-- #9

select LastName, FirstName, Title, Extension, COUNT(nwOrders.EmployeeID)
as Orders from nwEmployees, nwOrders
where nwOrders.EmployeeID = nwEmployees.EmployeeID
group by nwEmployees.EmployeeID
having Orders > 100
order by LastName, FirstName asc;

/*
mysql> select LastName, FirstName, Title, Extension, COUNT(nwOrders.EmployeeID)
    -> as Orders from nwEmployees, nwOrders
    -> where nwOrders.EmployeeID = nwEmployees.EmployeeID
    -> group by nwEmployees.EmployeeID
    -> having Orders > 100
    -> order by LastName, FirstName asc;
+-----------+-----------+--------------------------+-----------+--------+
| LastName  | FirstName | Title                    | Extension | Orders |
+-----------+-----------+--------------------------+-----------+--------+
| Callahan  | Laura     | Inside Sales Coordinator | 2344      |    104 |
| Davolio   | Nancy     | Sales Representative     | 5467      |    123 |
| Leverling | Janet     | Sales Representative     | 3355      |    127 |
| Peacock   | Margaret  | Sales Representative     | 5176      |    156 |
+-----------+-----------+--------------------------+-----------+--------+
4 rows in set (0.01 sec)
*/

-- #10
select nwCustomers.CustomerID, nwCustomers.CompanyName from nwCustomers
where CustomerID not in (select CustomerID from nwOrders);

/*
mysql> select nwCustomers.CustomerID, nwCustomers.CompanyName from nwCustomers
    -> where CustomerID not in (select CustomerID from nwOrders);
+------------+--------------------------------------+
| CustomerID | CompanyName                          |
+------------+--------------------------------------+
| FISSA      | FISSA Fabrica Inter. Salchichas S.A. |
| PARIS      | Paris specialites                    |
+------------+--------------------------------------+
2 rows in set (0.01 sec)
*/

-- #11

select CompanyName, ContactName, CategoryName, Description,
ProductName, UnitsOnOrder from nwSuppliers, nwProducts, nwCategories
where UnitsInStock = 0
order by ProductName;

-- #12

select nwProducts.ProductName, nwProducts.UnitsInStock ,nwSuppliers.CompanyName, nwSuppliers.Country
from nwSuppliers left join nwProducts on nwProducts.SupplierID = nwSuppliers.SupplierID
where nwProducts.QuantityPerUnit like '%bottles%';

/*
mysql> select nwProducts.ProductName, nwProducts.UnitsInStock ,nwSuppliers.CompanyName, nwSuppliers.Country
    -> from nwSuppliers left join nwProducts on nwProducts.SupplierID = nwSuppliers.SupplierID
    -> where nwProducts.QuantityPerUnit like '%bottles%';
+----------------------------------+--------------+-------------------------------------+-----------+
| ProductName                      | UnitsInStock | CompanyName                         | Country   |
+----------------------------------+--------------+-------------------------------------+-----------+
| Chang                            |           17 | Exotic Liquids                      | UK        |
| Aniseed Syrup                    |           13 | Exotic Liquids                      | UK        |
| Genen Shouyu                     |           39 | Mayumi's                            | Japan     |
| Sasquatch Ale                    |          111 | Bigfoot Breweries                   | USA       |
| Steeleye Stout                   |           20 | Bigfoot Breweries                   | USA       |
| Côte de Blaye                    |           17 | Aux joyeux ecclésiastiques          | France    |
| Sirop d'érable                   |          113 | Forêts dérables                     | Canada    |
| Louisiana Fiery Hot Pepper Sauce |           76 | New Orleans Cajun Delights          | USA       |
| Laughing Lumberjack Lager        |           52 | Bigfoot Breweries                   | USA       |
| Outback Lager                    |           15 | Pavlova Ltd.                        | Australia |
| Rhönbräu Klosterbier             |          125 | Plutzer Lebensmittelgroßmärkte AG   | Germany   |
+----------------------------------+--------------+-------------------------------------+-----------+
11 rows in set (0.17 sec)

*/
-- #13

create table Top_Items (
    ItemID int NOT NULL,
    ItemCode int NOT NULL,
    ItemName varchar(40) default NULL,
    InventoryDate datetime NULL,
    SupplierID int default NULL,
    ItemQuantity int default NULL,
    ItemPrice decimal(9,2) default '0.00',
    PRIMARY KEY(ItemID)
    )
    CHARACTER SET utf8 COLLATE utf8_general_ci;

-- #14

insert into Top_Items (ItemID, ItemCode, ItemName, InventoryDate, ItemQuantity, ItemPrice, SupplierID)
select ProductID, CategoryID, ProductName, date(now()), UnitsInStock, UnitPrice, SupplierID from nwProducts
where nwProducts.UnitsInStock * nwProducts.UnitPrice > 2500;

-- #15

delete Top_Items from Top_Items left join nwSuppliers on nwSuppliers.SupplierID = Top_Items.SupplierID 
where nwSuppliers.Country = 'Canada';

-- #16

alter table Top_Items 
add column InventoryValue decimal(9,2) NOT NULL 
AFTER InventoryDate;

-- #17

update Top_Items
  set InventoryValue = ItemPrice * ItemQuantity;

-- #18

drop table Top_Items;
