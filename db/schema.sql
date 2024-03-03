CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    submitted_designs INTEGER DEFAULT 0
);

CREATE TABLE Notification_Requests (
    user_id UUID NOT NULL,
    submission_id UUID NOT NULL,
    time_requested TIMESTAMP,
    time_fulfilled TIMESTAMP,
    PRIMARY KEY (user_id, submission_id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Competition (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    submission_start_date TIMESTAMP NOT NULL,
    submission_end_date TIMESTAMP NOT NULL,
    voting_start_date TIMESTAMP NOT NULL,
    voting_end_date TIMESTAMP NOT NULL
);

CREATE TABLE Submission (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competition_id UUID NOT NULL,
    user_id UUID NOT NULL,
    description TEXT,
    FOREIGN KEY (competition_id) REFERENCES Competition(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Casted_Votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    submission_id UUID NOT NULL,
    value INTEGER CHECK (value IN (1, 0, -1)),
    time_cast TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (submission_id) REFERENCES Submission(id)
);

CREATE TABLE File_Uploads (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   submission_id UUID NOT NULL,
   time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   used BOOLEAN,
   metadata JSON,
   bucket VARCHAR(255),
   s3_key VARCHAR(255),
   FOREIGN KEY (submission_id) REFERENCES Submission(id)
);
