CREATE OR ALTER PROCEDURE [dbo].[spTripsBetween_Date1_Date2]
@StartDate DATETIME,
@EndDate DATETIME
as
begin
    SELECT id, name, start_date, end_date,price, image
    FROM Trip
    WHERE start_date BETWEEN @StartDate AND @EndDate AND
	end_date BETWEEN @StartDate AND @EndDate 
end
GO

CREATE OR ALTER PROCEDURE [dbo].[spPostTrips]
@Name VARCHAR(50),
@StartDate DATETIME,
@EndDate DATETIME,
@Price MONEY
as
begin
    INSERT INTO Trip (name, start_date, end_date, price) VALUES
	(@Name, @StartDate, @EndDate, @Price)
end
GO

CREATE OR ALTER PROCEDURE [dbo].[spPutTrips]
@Id INT,
@Name VARCHAR(50),
@StartDate DATETIME,
@EndDate DATETIME,
@Price MONEY
as
begin
    UPDATE Trip
	SET name = @Name, start_date = @StartDate, end_date = @EndDate, price = @Price
	WHERE id = @Id
end
GO

CREATE OR ALTER PROCEDURE [dbo].[spDeleteTrips]
@Id INT
as
begin
    DELETE FROM Trip
	WHERE id = @Id
end
GO

CREATE OR ALTER PROCEDURE [dbo].[spGetOrdersForUser]
    @UserId INT
AS
BEGIN
    SELECT Orders.id, name, date,price, image
    FROM Orders JOIN Trip ON trip_id = Trip.id
    WHERE user_id = @UserId;
END

CREATE OR ALTER PROCEDURE [dbo].[spPostOrders]
@TripId INT,
@UserId INT,
@Date DATE,
@Status VARCHAR(50)
as
begin
    INSERT INTO Orders (trip_id, user_id, date, status) VALUES
	(@TripId, @UserId, @Date, @Status)
end
GO

CREATE OR ALTER PROCEDURE [dbo].[spGetReviewsForTrip]
    @TripId INT
AS
BEGIN
    SELECT Review.id, trip_id, user_id, rating, comment, name, username
    FROM Review JOIN Trip ON trip_id = Trip.id JOIN Users ON user_id = Users.id
    WHERE trip_id = @TripId;
END

CREATE OR ALTER PROCEDURE [dbo].[spPostReviewForTrip]
    @TripId INT,
	@UserId INT,
	@Rating INT,
	@Comment VARCHAR(256)
AS
BEGIN
    INSERT INTO Review (trip_id, user_id, rating, comment) VALUES
	(@TripId, @UserId, @Rating, @Comment);
END

CREATE PROCEDURE getUserByUsername
    @username VARCHAR(50)
AS
BEGIN
    SELECT id, username, password
    FROM users
    WHERE username = @username;
END

CREATE OR ALTER PROCEDURE addUser
	@firstName VARCHAR(50), 
	@lastName VARCHAR(50), 
	@email VARCHAR(50),
    @username VARCHAR(50),
    @password VARCHAR(256),
	@phone VARCHAR(50)
AS
BEGIN
    INSERT INTO Users (first_name, last_name, email, username, password, phone)
    VALUES (@firstName,@lastName, @email,@username,@password,@phone);
END

exec [dbo].[spTripsBetween_Date1_Date2] '2025-01-01','2025-06-30'

DROP DATABASE IF EXISTS TripsDB;
GO

CREATE DATABASE TripsDB;
GO

USE TripsDB;
GO

CREATE TABLE Location
( 
id INT PRIMARY KEY IDENTITY(1,1),
name VARCHAR(50) NOT NULL,
lat FLOAT,
lon FLOAT,
description VARCHAR(100)
);
DROP TABLE Trip
CREATE TABLE Trip
( 
id INT PRIMARY KEY IDENTITY(1,1),
name VARCHAR(50) NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
price MONEY NOT NULL,
image VARCHAR(256) NOT NULL
);

CREATE TABLE Trip_Location
( 
trip_id INT,
location_id INT,
PRIMARY KEY (trip_id,location_id),
FOREIGN KEY (trip_id) REFERENCES Trip(id) ON DELETE CASCADE,
FOREIGN KEY (location_id) REFERENCES Location(id) ON DELETE CASCADE
);

CREATE TABLE Users
( 
id INT PRIMARY KEY IDENTITY(1,1),
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
username VARCHAR(50) NOT NULL UNIQUE,
password VARCHAR(256) NOT NULL,
phone VARCHAR(50),
);

CREATE TABLE Orders
( 
id INT PRIMARY KEY IDENTITY(1,1),
trip_id INT,
user_id INT,
FOREIGN KEY (trip_id) REFERENCES Trip(id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
date DATE NOT NULL,
status VARCHAR(50) NOT NULL
);

CREATE TABLE Review
( 
id INT PRIMARY KEY IDENTITY(1,1),
trip_id INT,
user_id INT,
FOREIGN KEY (trip_id) REFERENCES Trip(id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
rating INT NOT NULL,
comment VARCHAR(256) NOT NULL
);

-- Insert locations
INSERT INTO Location (name, lat, lon, description) VALUES
('New York City', 40.7128, -74.0060, 'The Big Apple'),
('Paris', 48.8566, 2.3522, 'City of Love'),
('Tokyo', 35.682839, 139.759455, 'Japan Capital'),
('Sydney', -33.8688, 151.2093, 'Harbour City'),
('Rome', 41.9028, 12.4964, 'Eternal City'),
('London', 51.5074, -0.1278, 'Capital of the UK'),
('Berlin', 52.5200, 13.4050, 'Germany Capital'),
('Bangkok', 13.7563, 100.5018, 'Thailand Capital'),
('Rio de Janeiro', -22.9068, -43.1729, 'Brazilian Beach City'),
('Cape Town', -33.9249, 18.4241, 'South Africa�s Mother City'),
('Dubai', 25.276987, 55.296249, 'Luxury City in UAE'),
('Istanbul', 41.0082, 28.9784, 'Turkey�s Historic City'),
('Los Angeles', 34.0522, -118.2437, 'Hollywood City');

INSERT INTO Trip (name, start_date, end_date, price, image) VALUES
('USA Adventure', '2025-06-01', '2025-06-10', 1200.00, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
('Europe Escape', '2025-07-15', '2025-07-25', 1500.00, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'),
('Japan Tour', '2025-08-05', '2025-08-15', 1800.00, 'https://images.unsplash.com/photo-1549693578-d683be217e58'),
('Australia Experience', '2025-09-10', '2025-09-20', 2000.00, 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d3'),
('Grand European Tour', '2025-07-01', '2025-07-20', 2500.00, 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde'),
('Asia Discovery', '2025-09-05', '2025-09-15', 2100.00, 'https://images.unsplash.com/photo-1549893074-4bcf0b6c5f1b'),
('South America Expedition', '2025-10-10', '2025-10-25', 2300.00, 'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee'),
('African Safari', '2025-11-01', '2025-11-15', 2700.00, 'https://images.unsplash.com/photo-1508672019048-805c876b67e2'),
('Middle East Wonders', '2025-12-05', '2025-12-15', 2600.00, 'https://images.unsplash.com/photo-1581090700227-1e8f2b0c5e9e'),
('California Dream', '2025-06-10', '2025-06-20', 1800.00, 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0');



-- Insert trip locations (Assuming trip and location IDs start from 1)
INSERT INTO Trip_Location (trip_id, location_id) VALUES
(1, 1), -- USA Adventure -> New York City
(2, 2), -- Europe Escape -> Paris
(2, 5), -- Europe Escape -> Rome
(3, 3), -- Japan Tour -> Tokyo
(4, 4), -- Australia Experience -> Sydney
(5, 2),  -- Grand European Tour -> Paris
(5, 6),  -- Grand European Tour -> London
(5, 7),  -- Grand European Tour -> Berlin
(6, 3),  -- Asia Discovery -> Tokyo
(6, 8),  -- Asia Discovery -> Bangkok
(6, 9),  -- Asia Discovery -> Dubai
(7, 4),  -- South America Expedition -> Rio de Janeiro
(7, 10), -- South America Expedition -> Cape Town
(8, 10), -- African Safari -> Cape Town
(9, 11), -- Middle East Wonders -> Istanbul
(9, 9),  -- Middle East Wonders -> Dubai
(10, 12);-- California Dream -> Los Angeles

-- Insert users
INSERT INTO Users (first_name, last_name, email, password, phone) VALUES
('Alice', 'Smith', 'alice@example.com', 'password123', '1234567890'),
('Bob', 'Johnson', 'bob@example.com', 'securepass', '0987654321'),
('Charlie', 'Brown', 'charlie@example.com', 'mysecret', '1122334455'),
('David', 'Williams', 'david@example.com', 'pass123', '2233445566'),
('Emma', 'Jones', 'emma@example.com', 'secure123', '3344556677'),
('Liam', 'Davis', 'liam@example.com', 'mypassword', '4455667788'),
('Sophia', 'Taylor', 'sophia@example.com', 'passw0rd', '5566778899'),
('Michael', 'Wilson', 'michael@example.com', '1234pass', '6677889900');

-- Insert orders (Assuming user and trip IDs start from 1)
INSERT INTO Orders (trip_id, user_id, date, status) VALUES
(1, 1, '2025-05-01', 'Confirmed'),
(2, 2, '2025-06-10', 'Pending'),
(3, 3, '2025-07-20', 'Confirmed'),
(1, 4, '2025-04-15', 'Confirmed'),
(2, 5, '2025-05-20', 'Pending'),
(3, 6, '2025-06-25', 'Confirmed'),
(4, 7, '2025-07-30', 'Confirmed'),
(5, 8, '2025-08-10', 'Pending'),
(6, 9, '2025-09-15', 'Confirmed'),
(7, 10, '2025-10-20', 'Cancelled'),
(8, 1, '2025-11-05', 'Confirmed'),
(9, 2, '2025-12-01', 'Confirmed'),
(10, 3, '2025-06-15', 'Pending');

-- Insert reviews
INSERT INTO Review (trip_id, user_id, rating, comment) VALUES
(1, 1, 5, 'Amazing trip!'),
(2, 2, 4, 'Great experience!'),
(3, 3, 3, 'Good but expensive'),
(4, 4, 5, 'Best trip ever!'),
(5, 5, 4, 'Amazing experience'),
(6, 6, 5, 'Loved Tokyo and Bangkok'),
(7, 7, 3, 'Good but tiring'),
(8, 8, 5, 'Safari was fantastic!'),
(9, 9, 4, 'Dubai was stunning'),
(10, 10, 5, 'Hollywood was magical!');


SELECT * FROM Review