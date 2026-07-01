import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const testProfileApi = async () => {
  const secretKey = process.env.JWT_SECRET || "mySecretKey";
  const userId = "e17a4773-cb87-43cf-bc08-16f39b615c4a"; // Seeded user Yash Patel
  const email = "yash.patel@example.com";
  const role = "User";

  // Generate a valid token
  const token = jwt.sign({ id: userId, email, role }, secretKey, { expiresIn: "2h" });
  console.log("Generated test token:", token);

  try {
    const response = await fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("API Response Status:", response.status);
    const data = await response.json();
    console.log("API Response Data:", data);
  } catch (error) {
    console.error("Connection Error:", error.message);
  }
};

testProfileApi();
