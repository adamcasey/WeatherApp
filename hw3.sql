-- #1

select LastName, FirstName, HireDate, Country from nwEmployees
where HireDate <= '2013-07-04'
AND Country <> 'USA' order by LastName asc;

-- #2

select ProductName, UnitPrice, UnitsInStock from nwProducts
where UnitsInStock < ReorderLevel;

-- #3

SELECT ProductName, UnitPrice     FROM nwProducts
INNER JOIN (SELECT MAX(UnitPrice) AS MaxPrice
FROM nwProducts  GROUP BY UnitPrice) q ON UnitPrice = UnitPrice
AND UnitPrice = q.MaxPrice order by UnitPrice desc limit 1;

-- #4

select ProductID, ProductName, UnitsInStock * UnitPrice as "Inventory Value"
  from nwProducts
    where UnitsInStock * UnitPrice > 2000
  order by UnitsInStock * UnitPrice desc;

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

-- #7 : It works!

select nwProducts.SupplierID, ANY_VALUE(UnitsInStock * UnitPrice) as "Value of Inventory", COUNT(*)
as Products from nwProducts, nwSuppliers
where nwProducts.SupplierID = nwSuppliers.SupplierID
group by nwProducts.SupplierID
having Products > 3
order by Products desc;

-- #8

select CompanyName, ProductName, UnitPrice
from nwSuppliers, nwProducts where Country = 'USA'
order by UnitPrice desc;

-- #9

select LastName, FirstName, Title, Extension, COUNT(nwOrders.EmployeeID)
as Orders from nwEmployees, nwOrders
where nwOrders.EmployeeID = nwEmployees.EmployeeID
group by nwEmployees.EmployeeID
having Orders > 100
order by LastName, FirstName asc;

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

delete from Top_Items where Country='Canada';

-- #16

alter table Top_Items 
add column InventoryValue decimal(9,2) NOT NULL 
AFTER InventoryDate;;

-- #17

update Top_Items
  set InventoryValue = ItemPrice * ItemQuantity;

-- #18

drop table Top_Items;
