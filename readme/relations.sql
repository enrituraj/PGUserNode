CREATE TABLE image (
    image_id uuid NOT NULL PRIMARY KEY,
    image_path TEXT NOT NULL
);

CREATE TABLE users (
    user_id uuid NOT NULL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    image_id uuid REFERENCES image(image_id)
);

CREATE TABLE login_history (
    login_id uuid NOT NULL REFERENCES "users" (user_id),
    ip_address VARCHAR NOT NULL,
    browser VARCHAR NOT NULL,
    operating_system VARCHAR NOT NULL,
    location VARCHAR NOT NULL,
    login_time TIMESTAMP,
    logout_time TIMESTAMP
);

CREATE TABLE member (
    member_id uuid NOT NULL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
    mobile_no VARCHAR(20),
    country VARCHAR(50),
    state VARCHAR(50),
    city VARCHAR(50),
    summary TEXT,
    website VARCHAR(100),
    github VARCHAR(100),
    twitter VARCHAR(100),
    linkedin VARCHAR(100),
    instagram VARCHAR(100),
    work TEXT,
    education TEXT,
    technical_skill TEXT[], -- An array of technical skills
    user_admin uuid REFERENCES "users" (user_id),
    image_id uuid REFERENCES image (image_id)
);


INSERT INTO image (image_id, image_path)
VALUES
    ('04fd9b22-7983-453f-bfd5-938c1af6c78d', '/images/image1.jpg'),
    ('66f979d9-8362-46f4-a971-2d4214d74dfb', '/images/image2.jpg');

INSERT INTO "users" (user_id, full_name, email, date_of_birth, password, created_at,image_id)
VALUES
    ('993f70e7-3fba-4252-8777-c66ddf5f02a5', 'John Doe', 'john@example.com', '1990-01-15', 'hashed_password', '2023-08-15 10:00:00','04fd9b22-7983-453f-bfd5-938c1af6c78d'),
    ('01fc0c53-ceb9-4b7a-9632-847996c347e6', 'Jane Smith', 'jane@example.com', '1985-07-21', 'hashed_password', '2023-08-15 11:30:00','66f979d9-8362-46f4-a971-2d4214d74dfb');
-- Add more sample user data as needed



INSERT INTO login_history (login_id, ip_address, browser, operating_system, location, login_time, logout_time)
VALUES
    ('01fc0c53-ceb9-4b7a-9632-847996c347e6', '192.168.0.1', 'Chrome', 'Windows', 'New York', '2023-08-15 12:00:00', '2023-08-15 13:30:00'),
    ('01fc0c53-ceb9-4b7a-9632-847996c347e6', '10.0.0.2', 'Firefox', 'Mac', 'Los Angeles', '2023-08-15 14:00:00', '2023-08-15 15:15:00'),
    ('01fc0c53-ceb9-4b7a-9632-847996c347e6', '172.16.0.1', 'Safari', 'iOS', 'San Francisco', '2023-08-15 16:30:00', '2023-08-15 17:45:00'),
    ('01fc0c53-ceb9-4b7a-9632-847996c347e6', '192.168.1.1', 'Edge', 'Windows', 'Chicago', '2023-08-15 18:15:00', '2023-08-15 19:00:00'),
    ('01fc0c53-ceb9-4b7a-9632-847996c347e6', '10.0.0.5', 'Chrome', 'Linux', 'Seattle', '2023-08-15 20:00:00', '2023-08-15 21:30:00'),
    ('993f70e7-3fba-4252-8777-c66ddf5f02a5', '192.168.2.1', 'Firefox', 'Windows', 'Miami', '2023-08-15 22:15:00', '2023-08-15 23:00:00'),
    ('993f70e7-3fba-4252-8777-c66ddf5f02a5', '172.16.1.1', 'Chrome', 'Mac', 'Toronto', '2023-08-15 11:30:00', '2023-08-15 12:45:00'),
    ('993f70e7-3fba-4252-8777-c66ddf5f02a5', '10.0.0.10', 'Safari', 'iOS', 'Vancouver', '2023-08-15 09:00:00', '2023-08-15 10:15:00'),
    ('993f70e7-3fba-4252-8777-c66ddf5f02a5', '192.168.0.5', 'Edge', 'Windows', 'Dallas', '2023-08-15 07:45:00', '2023-08-15 08:30:00'),
    ('993f70e7-3fba-4252-8777-c66ddf5f02a5', '172.16.2.1', 'Firefox', 'Linux', 'Houston', '2023-08-15 06:00:00', '2023-08-15 07:15:00');
-- Add more sample login history data as needed



INSERT INTO member (member_id, full_name, username, email, date_of_birth, gender, mobile_no, country, state, city, summary, website, github, twitter, linkedin, instagram, work, education, technical_skill, user_admin)
VALUES
    ('4dd6e0f9-778a-4921-913c-36feb958f318', 'Alex Johnson', 'alex_j', 'alex@example.com', '1988-03-10', 'Male', '1234567890', 'USA', 'California', 'San Francisco', 'Software engineer with a passion for AI.', 'http://www.alexj.com', 'https://github.com/alexj', 'https://twitter.com/alex_j', 'https://www.linkedin.com/in/alexj', 'https://www.instagram.com/alexj', 'Software Developer at TechCorp', 'Computer Science Degree', ARRAY['Python', 'Java'], '993f70e7-3fba-4252-8777-c66ddf5f02a5'),
    ('b45fec7c-3601-4db3-85bf-b6de429d1d65', 'Emily Lee', 'emily_l', 'emily@example.com', '1995-06-20', 'Female', '9876543210', 'Canada', 'Ontario', 'Toronto', 'Frontend developer passionate about user experience.', 'http://www.emilylee.com', 'https://github.com/emilyl', 'https://twitter.com/emily_l', 'https://www.linkedin.com/in/emilylee', 'https://www.instagram.com/emilyl', 'Frontend Engineer at WebCo', 'Design and Computer Science', ARRAY['HTML/CSS', 'JavaScript'], '01fc0c53-ceb9-4b7a-9632-847996c347e6');
-- Add more sample member data as needed


// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table images {
  image_id integer
  image_path text
}


TABLE login_history {
    login_id int
    ip_address VARCHAR 
    browser VARCHAR 
    operating_system VARCHAR
    location VARCHAR 
    login_time TIMESTAMP
    logout_time TIMESTAMP
}

Table users {
  user_id integer [primary key]
    full_name VARCHAR
    email VARCHAR
    date_of_birth DATE 
    password VARCHAR
    created_at TIMESTAMP
    image_id integer
}


TABLE member {
    member_id integer [primary key]
    full_name VARCHAR
    username VARCHAR
    email VARCHAR
    date_of_birth DATE 
    gender VARCHAR
    mobile_no VARCHAR
    country VARCHAR
    state VARCHAR
    city VARCHAR
    summary TEXT
    website VARCHAR
    github VARCHAR
    twitter VARCHAR
    linkedin VARCHAR
    instagram VARCHAR
    work TEXT
    education TEXT
    technical_skill TEXT[]
    user_admin VARCHAR
    image_id VARCHAR
}


Ref: users.image_id > images.image_id
Ref: member.image_id > images.image_id
Ref: users.user_id > member.user_admin
Ref: users.user_id > login_history.login_id
