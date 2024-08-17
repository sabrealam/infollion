![Screenshot of Email OTP System](./Frontend/src/assets/infollion.png)


# Email OTP System

This project is an **Email OTP System** built using Node.js, Nodemailer, and MongoDB. It allows users to generate and verify OTPs sent to their email addresses. The system is designed with robust error handling and data storage in MongoDB.

## Features

- **OTP Generation:** Generates a unique 6-digit OTP for each user.
- **Email Delivery:** Sends the OTP to the user's email address using Nodemailer.
- **OTP Verification:** Allows users to verify the OTP within a limited time frame.
- **User Data Storage:** Saves user details and OTPs in a MongoDB database.
- **Error Handling:** Comprehensive error handling to manage invalid inputs, expired OTPs, and email delivery failures.
- **Resend OTP:** Implement a feature to allow users to request a new OTP.

## Tech Stack

- **Node.js:** Backend server environment.
- **Express.js:** Web framework for Node.js.
- **Nodemailer:** Node.js module for sending emails.
- **MongoDB:** NoSQL database for storing user data.
- **Mongoose:** ODM for MongoDB.
- **dotenv:** Loads environment variables from a `.env` file.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/email-otp-system.git
    cd email-otp-system
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    EMAIL_HOST=smtp.your-email-provider.com
    EMAIL_PORT=587
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    ```

4. **Start the server:**
    ```bash
    npm start
    ```

5. **Access the application:**
   Open your browser and go to `http://localhost:3000`.

## Usage

1. **Register a User:**
   - Send a POST request to `/register` with the user's email.
   - The system will generate an OTP and send it to the provided email address.

2. **Verify OTP:**
   - Send a POST request to `/verify` with the user's email and OTP.
   - The system will verify the OTP and respond with success or failure.

## API Endpoints

- **POST `/register`:** Registers a user and sends an OTP to their email.
  - **Request Body:**
    ```json
    {
      "email": "user@example.com"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "OTP sent to your email address."
    }
    ```

- **POST `/verify`:** Verifies the OTP sent to the user's email.
  - **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "otp": "123456"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "OTP verified successfully."
    }
    ```

## Error Handling

- **Invalid OTP:** Returns an error if the OTP is incorrect or expired.
- **Email Sending Failure:** Catches and logs errors if there's an issue with sending the email.
- **Database Errors:** Handles database connection and query errors gracefully.

## Future Enhancements


- **Rate Limiting:** Add rate limiting to prevent abuse of the OTP system.
- **User Authentication:** Extend the system to include user authentication after OTP verification.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or feedback, feel free to contact me at [asabre5073@gmail.com](mailto:asabre5073@gmail.com).
