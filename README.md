# JetBud - a Budget Buddy

## This is a budget tracking app that lets the user log their asset and expenses to a system that calculates their monthly balance.

### Below are pictures of the application interface.

## How to run application

1. Clone this repository
2. Install the dependencies `npm install`
3. Clone [backend](https://github.com/eemiljka/jetbud-server), and install its dependencies
4. Create an SQL database:

```

DROP DATABASE IF EXISTS jetbud;
CREATE DATABASE jetbud;

USE jetbud;

CREATE TABLE users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE expenses(
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    expense_sum DECIMAL(10,2) NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE assets(
    asset_id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    asset_sum VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

```

5. Copy .env-sample's structure, make a file called .env and paste the structure there. Fill in the enviroment variables and save.

6. Run frontend and backend with `npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Login screen

![login](https://github.com/user-attachments/assets/8071c7fb-a6d8-480d-9ee6-858b91aaddf9)

## Home page once user is logged in

![home-page](https://github.com/user-attachments/assets/b5ce6eaf-e17e-44c1-9ee3-f56b8db712d8)

## Add expense modal

![add-expense](https://github.com/user-attachments/assets/1ec22be3-1d3b-4c13-9248-ef22619f0e1b)

## Add asset modal

![add-asset](https://github.com/user-attachments/assets/5667bafe-c1dc-4696-800c-86d2d473fe40)

## Expenses page

![expenses](https://github.com/user-attachments/assets/e02c860b-2704-4f7d-b1be-f447698af262)

## Home page after adding expenses and assets

![home-page-2](https://github.com/user-attachments/assets/4bd7b1f2-1735-4dd1-9aae-63a8904a9f74)
