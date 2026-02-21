import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Expert } from "../models/expert.model.js";
import { connectDB } from "../config/db.js";
import { ENV } from "../config/env.js";

const categories = [
  "Fitness",
  "Career",
  "Finance",
  "Medical",
  "Tech",
];

const generateSlots = () => {
  const slots = [];

  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    slots.push({
      date,
      slots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    });
  }

  return slots;
};

const seedExperts = async () => {
  try {
    await connectDB();

    await Expert.deleteMany();

    const experts = [];

    for (let i = 0; i < 50; i++) {
      experts.push({
        name: faker.person.fullName(),
        category:
          categories[Math.floor(Math.random() * categories.length)],
        experience: faker.number.int({ min: 1, max: 15 }),
        rating: faker.number.float({
          min: 3,
          max: 5,
          // precision: 0.1,
        }),
        bio: faker.lorem.sentences(2),
        availableSlots: generateSlots(),
      });
    }

    await Expert.insertMany(experts);

    console.log("✅ 50 Experts Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Failed", error);
    process.exit(1);
  }
};

seedExperts();