DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE profile
(
  profileUsername VARCHAR(30) NOT NULL,
  profilePassword VARCHAR(50) NOT NULL,
  profilePoints INT NOT NULL,
  profileEmail VARCHAR(50) NOT NULL,
  PRIMARY KEY (profileUsername),
  UNIQUE (profileEmail)
);

CREATE TABLE reward
(
  rewardName VARCHAR(50) NOT NULL,
  rewardCost INT NOT NULL,
  rewardId INT NOT NULL,
  rewardInfo VARCHAR(300) NOT NULL,
  rewardQuantity INT NOT NULL,
  PRIMARY KEY (rewardId)
);

CREATE TABLE location
(
  locationLongitude NUMERIC(9, 3) NOT NULL,
  locationLatitude NUMERIC(9, 3) NOT NULL,
  PRIMARY KEY (locationLongitude, locationLatitude)
);

CREATE TABLE trashReport
(
  reportPath VARCHAR(300) NOT NULL,
  reportId INT NOT NULL,
  profileUsername VARCHAR(30) NOT NULL,
  locationLongitude NUMERIC(9, 3) NOT NULL,
  locationLatitude NUMERIC(9, 3) NOT NULL,
  PRIMARY KEY (reportId),
  FOREIGN KEY (profileUsername) REFERENCES profile(profileUsername) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (locationLongitude, locationLatitude) REFERENCES location(locationLongitude, locationLatitude) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE buys
(
  profileUsername VARCHAR(30) NOT NULL,
  rewardId INT NOT NULL,
  PRIMARY KEY (profileUsername, rewardId),
  FOREIGN KEY (profileUsername) REFERENCES profile(profileUsername) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (rewardId) REFERENCES reward(rewardId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE event
(
  eventName VARCHAR(50) NOT NULL,
  eventId INT NOT NULL,
  eventInfo VARCHAR(300) NOT NULL,
  locationLongitude NUMERIC(9, 3) NOT NULL,
  locationLatitude NUMERIC(9, 3) NOT NULL,
  profileUsername VARCHAR(30) NOT NULL,
  PRIMARY KEY (eventId),
  FOREIGN KEY (locationLongitude, locationLatitude) REFERENCES location(locationLongitude, locationLatitude) ON DELETE CASCADE ON UPDATE CASCADE,
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