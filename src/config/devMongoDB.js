import mongoose from 'mongoose';

async function connectDevMongoDB() {
  try {
    await mongoose.connect(process.env.DB_DEV_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // OK. console.log("Development Database up and running.");
  } catch (err) {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  }
}

export default connectDevMongoDB;
