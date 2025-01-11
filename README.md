

# KoinX Backend Assignment

This project is a backend application for tracking cryptocurrency statistics and analyzing data using APIs. It is developed using **Node.js**, **MongoDB**, and deployed on **Render**.

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Setup](#project-setup)
4. [API Endpoints](#api-endpoints)
   - [/stats](#stats)
   - [/deviation](#deviation)
5. [Deployment](#deployment)
6. [Developer Notes](#developer-notes)

---

## **Features**

- Fetches real-time cryptocurrency data (Bitcoin, Ethereum, and Matic) every 2 hours from [CoinGecko API](https://www.coingecko.com/en/api/documentation).
- Stores the data in **MongoDB** database.
- Provides REST API endpoints for:
  - Fetching the latest cryptocurrency data.
  - Calculating the standard deviation of cryptocurrency prices for the last 100 records.
- Deployed on **Render** and publicly accessible.

---

## **Technologies Used**

- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database (hosted on MongoDB Atlas).
- **Mongoose**: ODM for MongoDB.
- **Axios**: HTTP client for API integration.
- **Render**: Deployment platform.

---

## **Project Setup**

Follow the steps below to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShubhangPareek/Koin_X_Backend.git
   cd Koin_X_Backend

	2.	Install dependencies:

npm install


	3.	Set up environment variables:
Create a .env file in the root directory and add:

MONGO_URI=<your_mongodb_connection_string>


	4.	Run the project locally:

node server.js

The server will start on http://localhost:3000.

	5.	Run the background job manually (optional):

node jobs/fetchCryptoData.js

API Endpoints

Base URL
	•	Deployed URL: https://koin-x-backend-6rmp.onrender.com

1. GET /stats

Description: Fetch the latest data for the requested cryptocurrency.

Query Parameters:

{
    "coin": "bitcoin" // Could be one of 'bitcoin', 'ethereum', or 'matic-network'
}

Sample Response:

{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}

2. GET /deviation

Description: Fetch the standard deviation of the price for the requested cryptocurrency based on the last 100 records.

Query Parameters:

{
    "coin": "bitcoin" // Could be one of 'bitcoin', 'ethereum', or 'matic-network'
}

Sample Response:

{
    "deviation": 4082.48
}

Deployment

The backend is deployed on Render and accessible at:
https://koin-x-backend-6rmp.onrender.com

The database is hosted on MongoDB Atlas.

Developer Notes
	•	The /stats endpoint retrieves the latest cryptocurrency data stored in the database.
	•	The /deviation endpoint calculates the standard deviation of cryptocurrency prices from the last 100 records using a utility function.
	•	The background job (fetchCryptoData.js) fetches data from the CoinGecko API every 2 hours and stores it in the database.

Future Improvements:
	•	Add authentication for API endpoints.
	•	Improve error handling for edge cases.

Contributors
	•	Shubhang Pareek - GitHub Profile

License

This project is licensed under the MIT License.

---

### How to Use This:
1. Copy the above content into a `README.md` file in the root directory of your project.
2. Replace `<your_mongodb_connection_string>` in the `.env` section with your actual MongoDB Atlas connection string.

