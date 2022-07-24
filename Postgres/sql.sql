DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE profile
(
  profileUsername VARCHAR(30) NOT NULL,
  profilePasswordHash VARCHAR(50) NOT NULL,
  profilePoints INT NOT NULL,
  profileEmail VARCHAR(50) NOT NULL,
  profileTotalPoints INT NOT NULL,
  profileToken CHAR(32) NOT NULL,
  profileName VARCHAR(30) NOT NULL,
  profileSurname VARCHAR(30) NOT NULL,
  PRIMARY KEY (profileUsername),
  UNIQUE (profileEmail),
  UNIQUE(profileToken)
);

CREATE TABLE reward
(
  rewardName VARCHAR(30) NOT NULL,
  rewardCost INT NOT NULL,
  rewardId INT NOT NULL,
  rewardInfo VARCHAR(300) NOT NULL,
  rewardQuantity INT NOT NULL,
  PRIMARY KEY (rewardId)
);

CREATE TABLE event
(
  eventName VARCHAR(50) NOT NULL,
  eventId INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  eventInfo VARCHAR(300) NOT NULL,
  eventTime INT NOT NULL,
  eventLatitude NUMERIC(9, 6) NOT NULL,
  eventLongitude NUMERIC(9, 6) NOT NULL,
  profileUsername VARCHAR(30) NOT NULL,
  FOREIGN KEY (profileUsername) REFERENCES profile(profileUsername) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE trashReport
(
  reportPath VARCHAR(300),
  reportId INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  reportLongitude NUMERIC(9, 6) NOT NULL,
  reportLatitude NUMERIC(9, 6) NOT NULL,
  reportType VARCHAR(20) NOT NULL,
  profileUsername VARCHAR(30) NOT NULL,
  FOREIGN KEY (profileUsername) REFERENCES profile(profileUsername) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE participates
(
  points INT NOT NULL,
  profileUsername VARCHAR(30) NOT NULL,
  eventId INT NOT NULL,
  PRIMARY KEY (profileUsername, eventId),
  FOREIGN KEY (profileUsername) REFERENCES profile(profileUsername) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (eventId) REFERENCES event(eventId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE buys
(
  profileUsername VARCHAR(30) NOT NULL,
  rewardId INT NOT NULL,
  PRIMARY KEY (profileUsername, rewardId),
  FOREIGN KEY (profileUsername) REFERENCES profile(profileUsername) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (rewardId) REFERENCES reward(rewardId) ON DELETE CASCADE ON UPDATE CASCADE
);
