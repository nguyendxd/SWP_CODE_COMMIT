INSERT INTO Customer (UserID, DateJoined)
SELECT UserID, GETDATE() -- or any specific join date
FROM Users
WHERE RoleID = 5; -- Assuming roleID 5 is for customers