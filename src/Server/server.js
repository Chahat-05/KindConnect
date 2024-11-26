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


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
