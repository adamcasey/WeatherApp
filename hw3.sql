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

-- This code functions but only finds what orders DO exist, not which don't.
-- select nwOrders.CustomerID, CompanyName, COUNT(nwOrders.CustomerID)
-- as Orders from nwCustomers, nwOrders
-- where nwOrders.CustomerID = nwCustomers.CustomerID
-- group by nwCustomers.CustomerID
-- having Orders = 0;

-- This code DOESN'T function
-- select nwOrders.CustomerID, CompanyName from nwCustomers, nwOrders
-- AND NOT EXISTS (
--   SELECT nwCustomers.CustomerID
--   FROM nwOrders
--   WHERE nwOrders.CustomerID = nwCustomers.CustomerID
-- );

-- #11

select CompanyName, ContactName, CategoryName, Description,
ProductName, UnitsOnOrder from nwSuppliers, nwProducts, nwCategories
where UnitsInStock = 0
order by ProductName;

-- #12

-- #13

create table Top_Items (
    ItemID int NOT NULL,
    ItemName varchar(4) default NULL,
    InventoryDate datetime NULL,
    SupplierID int default NULL,
    ItemQuantity int default NULL,
    ItemPrice decimal(9,2) default '0.00',
    PRIMARY KEY(ItemID)
    )
    CHARACTER SET utf8 COLLATE utf8_general_ci;

-- #14

-- #15

delete from Top_Items where Country='Canada';

-- #16

-- #17

update Top_Items
  set InventoryValue = ItemPrice * ItemQuantity;

-- #18

drop table Top_Items;
