// scripts/test-server.js
// Starts an in-memory MongoDB, seeds test data, writes the URI to scripts/.mongo-uri.txt
// Used only for local testing (devDependency: mongodb-memory-server)
// NOTE: schema replicated inline (CJS cannot import the app's ESM modules directly)

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const postSchema = new mongoose.Schema(
  {
    routeName: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageLink: { type: String, required: true },
    videoLink: { type: String, required: true },
    totalView: { type: Number, default: 0 },
    duration: { type: String, default: 0 },
    category: { type: [String], required: true }
  },
  { timestamps: true }
);

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

async function main() {
  const mongod = await MongoMemoryServer.create({
    instance: { dbName: "p9x9" }
  });
  const uri = mongod.getUri("p9x9");
  console.log("MEMORY_MONGO_URI=" + uri);

  const uriFile = path.join(__dirname, ".mongo-uri.txt");
  fs.writeFileSync(uriFile, uri);

  await mongoose.connect(uri);

  const Admin = mongoose.model("Admin", adminSchema);
  const Post = mongoose.model("Post", postSchema);

  await Admin.deleteMany({});
  await Admin.create({ username: "admin", password: "admin123" });

  await Post.deleteMany({});
  const cats = ["Bangla", "Bhabi", "Viral", "TikTok"];
  for (let i = 1; i <= 35; i++) {
    await Post.create({
      routeName: `test-video-${i}`,
      title: `Test Video ${i} ${cats[i % cats.length]}`,
      description: "Test description for video " + i,
      imageLink: `https://picsum.photos/seed/${i}/400/250`,
      videoLink: `https://www.w3schools.com/html/mov_bbb.mp4`,
      totalView: i * 10,
      duration: i % 2 === 0 ? "5:30" : "3:45",
      category: [cats[i % cats.length], "Test"]
    });
  }

  console.log("SEED_DONE");

  process.on("SIGTERM", async () => {
    await mongoose.disconnect();
    await mongod.stop();
    process.exit(0);
  });
  process.on("SIGINT", async () => {
    await mongoose.disconnect();
    await mongod.stop();
    process.exit(0);
  });

  setInterval(() => {}, 1000);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});