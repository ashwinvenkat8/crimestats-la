create database project;

-- Coded by Allen
CREATE TABLE incident (
    DR_NO varchar(10),-- 9 digit case number - 10 digit char limit
    Date_rptd date, -- date reported
    Date_OCC date, -- date occured
    Time_OCC time, -- time occured
    Location_ID varchar(3), -- 3 digit location id
    Vict_ID varchar(9),-- 9 digit victim number - 10- digit char limit
    Crm_ID varchar(3) --  3 digit crime code id
);

-- Coded by Blake
CREATE TABLE Victim (
    Vict_age varchar(3), -- 3 digit victim age
    Vict_sex varchar(1), -- M,F, or X
    Vict_Descent varchar(1) -- A,B,H, O,W, or X
);

-- Coded by Ashwim 
CREATE TABLE Location (
    Location varchar(50), -- Street Address
    Area varchar(2), --  2 digit area code
    Area_Name varchar(10), -- area code description 
	CrossStreet varchar(50), --  cross street address
    LAT float(10), -- latitude
    LON float(10) -- longitude
);

-- Coded by Blake 
CREATE TABLE Premis (
    Crm_cd varchar(50), -- Crime code description
    Premis_desc varchar(50), -- premise code description 
    Weapon_desc varchar(50) -- weapon description 
);