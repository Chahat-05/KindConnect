import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb"; 

dotenv.config();

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// MongoDB Connection URI from `.env`
const uri = "mongodb+srv://khattarharshita242:jasmine242@kindconnect.rz30g.mongodb.net/?retryWrites=true&w=majority&appName=KindConnect";

// MongoDB Client
const client = new MongoClient(uri, { 
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Global collections
let organisationsCollection;
let eventsCollection;
let volunteersCollection;
let sponsorCollection;
let productsCollection;
let donationsCollection;
let userCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");

    const db = client.db("todolist");
    organisationsCollection = db.collection("organisations");
    eventsCollection = db.collection("events");
    volunteersCollection = db.collection("volunteers");
    sponsorCollection=db.collection("sponsors");
    productsCollection=db.collection("products");
    donationsCollection=db.collection("donations");
    userCollection=db.collection("users");

    // Insert initial data if volunteers collection is empty
    const existingVolunteers = await volunteersCollection.find().toArray();
    if (existingVolunteers.length === 0) {
      await volunteersCollection.insertOne({
        organisationName: "Bright Minds Initiative",
        eventTitle: "STEM Workshop for Kids",
        volunteerList: [
          {
            firstName: "Liam",
            middleName: "Oliver",
            lastName: "Martinez",
            email: "liam.martinez@example.com",
            contact: "3344556677",
            photo: "https://example.com/photos/liam-martinez.jpg",
            volunteerCategory: "Teaching",
          },
          {
            firstName: "Sophia",
            middleName: "Grace",
            lastName: "Johnson",
            email: "sophia.johnson@example.com",
            contact: "2233445566",
            photo: "https://example.com/photos/sophia-johnson.jpg",
            volunteerCategory: "Logistics",
          },
        ],
      });
      console.log("Sample data inserted into the volunteers collection.");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();

// API Routes

// Get all organisation data
app.get("/api/about", async (req, res) => {
  try {
    const { organisationName } = req.query;

    if (!organisationName) {
      return res.status(400).json({ error: "Organisation name is required" });
    }

    const aboutInfo = await organisationsCollection
      .find({ organisationName: organisationName })
      .toArray();

    if (aboutInfo.length === 0) {
      return res.status(404).json({ error: "Organisation not found" });
    }

    res.json(aboutInfo);
  } catch (error) {
    console.error("Error fetching organisation data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/organisations", async (req, res) => {
  try {
    // Fetch all organisations from the collection
    const organisations = await organisationsCollection.find().toArray();

    if (organisations.length === 0) {
      return res.status(404).json({ error: "No organisations found" });
    }

    // Return the fetched organisations data
    res.json(organisations);
  } catch (error) {
    console.error("Error fetching organisation data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Get all events
app.get("/api/events", async (req, res) => {
  try {
    const allEvents = await eventsCollection.find().toArray();
    if (allEvents.length === 0) {
      return res.status(404).json({ error: "No events found" });
    }
    res.json(allEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a volunteer to an event
app.post("/api/volunteers/:eventTitle", async (req, res) => {
  try {
    const eventTitle = req.params.eventTitle; // Use the correct route parameter
    const volunteerData = req.body; // Get volunteer data from the request body

    if (!eventTitle) {
      return res.status(400).json({ error: "Event title is required" });
    }

    if (!volunteerData || Object.keys(volunteerData).length === 0) {
      return res.status(400).json({ error: "Volunteer data is required" });
    }

    // Update the event's volunteer list
    const result = await volunteersCollection.updateOne(
      { eventTitle: eventTitle }, // Match the event by title
      { $push: { volunteerList: volunteerData } } // Add new volunteer to the list
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Volunteer added successfully" });
  } catch (error) {
    console.error("Error adding volunteer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a product
app.post("/api/postProduct", async (req, res) => {
  try {
    const productData = req.body; // Get product data from the request body

    // Validate the required fields
    if (!productData.productName || !productData.productDescription || !productData.price || !productData.organisationName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert the product data into the products collection
    const result = await productsCollection.insertOne(productData);

    if (result.insertedCount === 0) {
      return res.status(500).json({ error: "Failed to insert the product" });
    }

    res.status(200).json({ message: "Product added successfully", productId: result.insertedId });
  } catch (error) {
    console.error("Error posting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/buyProduct", async (req, res) => {
  try {
    const donationData = req.body; // Get product data from the request body

    // Insert the product data into the products collection
    const result = await donationsCollection.insertOne(donationData);

    if (result.insertedCount === 0) {
      return res.status(500).json({ error: "Failed to insert the product" });
    }

    res.status(200).json({ message: "Product added successfully", productId: result.insertedId });
  } catch (error) {
    console.error("Error posting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/directDonation", async (req, res) => {
  try {
    const donationData = req.body; // Get product data from the request body

    // Insert the product data into the products collection
    const result = await donationsCollection.insertOne(donationData);

    if (result.insertedCount === 0) {
      return res.status(500).json({ error: "Failed to insert the product" });
    }

    res.status(200).json({ message: "Product added successfully", productId: result.insertedId });
  } catch (error) {
    console.error("Error posting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/sponsors/:eventTitle", async (req, res) => {
  try {
    const eventTitle = req.params.eventTitle; // Use the correct route parameter
    const sponsorData = req.body; // Get volunteer data from the request body

    if (!eventTitle) {
      return res.status(400).json({ error: "Event title is required" });
    }

    if (!sponsorData || Object.keys(sponsorData).length === 0) {
      return res.status(400).json({ error: "Volunteer data is required" });
    }

    // Update the event's volunteer list
    const result = await sponsorCollection.updateOne(
      { eventTitle: eventTitle }, // Match the event by title
      { $push: { sponsorList: sponsorData } } // Add new volunteer to the list
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Volunteer added successfully" });
  } catch (error) {
    console.error("Error adding volunteer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await productsCollection.find().toArray();
    if (allProducts.length === 0) {
      return res.status(404).json({ error: "No events found" });
    }
    res.json(allProducts);
    console.log(allProducts);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}); 

app.get("/api/getOrganisations", async (req, res) => {
  try {
    const allOrganisations = await organisationsCollection.find().toArray();
    if (allOrganisations.length === 0) {
      return res.status(404).json({ error: "No events found" });
    }
    res.json(allOrganisations);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a product by its ID
app.delete("/api/deleteProduct/:productId", async (req, res) => {
  try {
    const { productId } = req.params; // Get the product ID from the request parameters

    // Log the incoming productId for debugging purposes
    console.log("Received productId:", productId);

    // Check if productId is a valid 24-character hex string
    if (!ObjectId.isValid(productId)) {
      console.error("Invalid productId format");
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    // Convert productId to ObjectId if it's valid
    // const objectId = new ObjectId(productId);

    // Log the converted objectId
    console.log("Converted ObjectId:", productId);

    // Delete the product from the products collection
    const result = await productsCollection.deleteOne({ _id: productId });

    // Check if a product was deleted
    if (result.deletedCount === 0) {
      console.error("No product found with the provided ID");
      return res.status(404).json({ error: "Product not found" });
    }

    // Successful deletion
    console.log("Product deleted successfully");
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    // Log the error to understand what went wrong
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    // Validation
    if (!email || !username || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Insert new user into the database
    const newUser = {
      email,
      username,
      password,  // Store the plain password (not hashed)
    };
    await userCollection.insertOne(newUser);

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords (without hashing)
    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // Include the username in the response
    res.status(200).json({ message: "Login successful", username: user.username });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
