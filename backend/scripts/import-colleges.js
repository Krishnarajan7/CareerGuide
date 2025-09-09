import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_PATH = path.join(__dirname, "..", "data", "colleges.csv");

function toNull(value) {
  const v = (value ?? "").toString().trim();
  if (!v || v.toLowerCase() === "n/a" || v.toLowerCase() === "no email found") return null;
  return v;
}

function mapRow(row) {
  const address = [row["Address"], row["City"], row["State"]].filter(Boolean).join(", ");
  return {
    name: toNull(row["Name"]) ?? "Unknown",
    type: toNull(row["Category"]) ?? "Unknown",
    address: toNull(address),
    city: toNull(row["City"]),
    state: toNull(row["State"]),
    estd: toNull(row["Estd"]),
    approvedBy: toNull(row["Approved By"]),
    affiliatedUniversity: toNull(row["Affiliated University"]),
    rankText: toNull(row["Rank"]),
    coursesAndFees: row["Courses and Fees"]?.toString() ?? null,
    email: toNull(row["Email"]),
    phone: toNull(row["Phone Number"]),
    image: toNull(row["Photo"]),
    brochure: toNull(row["Brochure"]),
  };
}

async function run() {
  console.log("📥 Importing colleges from CSV...", CSV_PATH);
  let count = 0;
  const batch = [];
  const BATCH_SIZE = 1000;

  await prisma.college.deleteMany({});

  await new Promise((resolve, reject) => {
    const stream = fs.createReadStream(CSV_PATH).pipe(csv());
    stream
      .on("data", (row) => {
        stream.pause();
        batch.push(mapRow(row));
        const flush = async () => {
          try {
            if (batch.length >= BATCH_SIZE) {
              await prisma.college.createMany({ data: batch, skipDuplicates: true });
              count += batch.length;
              batch.length = 0;
            }
          } catch (e) {
            reject(e);
            return;
          }
          stream.resume();
        };
        flush();
      })
      .on("end", async () => {
        if (batch.length) {
          await prisma.college.createMany({ data: batch, skipDuplicates: true });
          count += batch.length;
        }
        resolve();
      })
      .on("error", reject);
  });

  console.log(`Imported ${count} colleges`);
}

run()
  .catch((e) => {
    console.error("Import failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


