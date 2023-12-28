// import { MongoClient } from "mongodb";
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

// Replace the uri string with your connection string.
const uri = "mongodb+srv://lekien2k2:letankien@cluster0.myjs2qo.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((error) => {
        console.log(error)
    });

const app = express();
app.use(cors());

app.use(express.json());
// app.use(cookieParser())


//get all
app.get('/rooms', async (req, res) => {
    try {
        const rooms = await mongoose.connection.db.collection('rooms').find({}).toArray();
        res.header('Access-Control-Allow-Origin', '*');
        res.json(rooms);
        // console.log(res.json(rooms));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//get by room
app.get('/rooms/:device_id', async (req, res) => {
    const deviceId = req.params.device_id;

    try {
        const rooms = await mongoose.connection.db.collection('rooms').find({ device_id: deviceId }).toArray();
        res.header('Access-Control-Allow-Origin', '*');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get by room and time
app.get('/rooms/:device_id/:start/:end', async (req, res) => {
    const deviceId = req.params.device_id;
    const startTime = req.params.start || '00:00:00';
    const endTime = req.params.end || '23:59:59';

    try {
        const rooms = await mongoose.connection.db.collection('rooms')
            .find({
                device_id: deviceId,
                createdAt: {
                    $gte: new Date(`1970-01-01T${startTime}Z`),
                    $lt: new Date(`1970-01-01T${endTime}Z`)
                }
            })
            .sort({ createdAt: 1 })
            .toArray();
        
            res.header('Access-Control-Allow-Origin', '*');
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});
