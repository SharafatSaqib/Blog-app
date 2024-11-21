Setup Instructions
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/blog-app.git
cd  blogging-platform
Install Dependencies


npm install
Set Up Firebase

Create a Firebase project in the Firebase Console.
Enable Google Authentication and get your Firebase configuration details.
Set Up MongoDB

Choose either MongoDB Atlas (cloud-based) or MongoDB Compass (local setup) for your MongoDB instance.
Obtain your connection string from MongoDB Atlas or your local MongoDB instance.
Add Environment Variables
Create a .env.local file at the root of your project and add the following variables:


# MongoDB URI
MONGO_URI=mongodb://your_mongo_connection_string

# API Base URL
NEXT_PUBLIC_API_BASE_URL=//Add the localhost

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="your_firebase_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_firebase_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_firebase_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_firebase_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_firebase_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your_firebase_measurement_id"