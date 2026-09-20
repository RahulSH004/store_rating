import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import { prisma } from '../src/db';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? '10');

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Admin User
  const adminEmail = 'admin@storerate.com';
  const adminPassword = 'Admin@12345';
  const adminPasswordHash = await bcrypt.hash(adminPassword, SALT_ROUNDS);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  let adminUser;
  if (!existingAdmin) {
    adminUser = await prisma.user.create({
      data: {
        name: 'System Administrator',
        email: adminEmail,
        passwordhash: adminPasswordHash,
        address: '100 Platform HQ, Admin Way',
        role: 'ADMIN',
      },
    });
    console.log(`✅ Admin created: ${adminEmail} (Password: ${adminPassword})`);
  } else {
    adminUser = await prisma.user.update({
      where: { email: adminEmail },
      data: {
        role: 'ADMIN',
        passwordhash: adminPasswordHash,
      },
    });
    console.log(`ℹ️ Admin already exists, updated role to ADMIN: ${adminEmail}`);
  }

  // 2. Seed a Sample Store Owner & Store
  const ownerEmail = 'owner@bakery.com';
  const ownerPassword = 'Owner@12345';
  const ownerPasswordHash = await bcrypt.hash(ownerPassword, SALT_ROUNDS);

  let ownerUser = await prisma.user.findUnique({
    where: { email: ownerEmail },
  });

  if (!ownerUser) {
    ownerUser = await prisma.user.create({
      data: {
        name: 'Sarah Connor',
        email: ownerEmail,
        passwordhash: ownerPasswordHash,
        address: '42 Baker Street, Central City',
        role: 'STORE_OWNER',
      },
    });
    console.log(`✅ Store Owner created: ${ownerEmail} (Password: ${ownerPassword})`);
  }

  const existingStore = await prisma.store.findUnique({
    where: { email: 'contact@artisanbakery.com' },
  });

  let store;
  if (!existingStore) {
    store = await prisma.store.create({
      data: {
        name: 'Artisan Sourdough Bakery',
        email: 'contact@artisanbakery.com',
        address: '42 Baker Street, Central City',
        ownerId: ownerUser.id,
      },
    });
    console.log(`✅ Store created: ${store.name}`);
  } else {
    store = existingStore;
  }

  // 3. Seed a Sample Normal User
  const userEmail = 'user@test.com';
  const userPassword = 'User@12345';
  const userPasswordHash = await bcrypt.hash(userPassword, SALT_ROUNDS);

  let normalUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!normalUser) {
    normalUser = await prisma.user.create({
      data: {
        name: 'Alex Johnson',
        email: userEmail,
        passwordhash: userPasswordHash,
        address: '15 Maple Avenue, Green Valley',
        role: 'USER',
      },
    });
    console.log(`✅ Normal User created: ${userEmail} (Password: ${userPassword})`);
  }

  // 4. Seed a Sample Rating
  if (normalUser && store) {
    await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId: normalUser.id,
          storeId: store.id,
        },
      },
      update: { rating: 5 },
      create: {
        userId: normalUser.id,
        storeId: store.id,
        rating: 5,
      },
    });
    console.log(`✅ Sample 5-star rating added from ${userEmail} to ${store.name}`);
  }

  console.log('\n🎉 Seeding completed successfully!');
  console.log('──────────────────────────────────────────────────────');
  console.log('👑 Admin:       admin@storerate.com   | Admin@12345');
  console.log('🏪 Store Owner: owner@bakery.com      | Owner@12345');
  console.log('👤 Normal User: user@test.com         | User@12345');
  console.log('──────────────────────────────────────────────────────');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
