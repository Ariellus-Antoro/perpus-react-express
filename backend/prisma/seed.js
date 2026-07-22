// prisma/seed.js
const bcrypt = require('bcryptjs');
const prisma = require('../src/config/db.js');


async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = await prisma.users.upsert({
        where: { email: 'admin@perpus.com' },
        update: {},
        create: {
            nik: '3322119242424',
            email: 'admin@perpus.com',
            password: hashedPassword,
            full_name: 'AdminPerpus',
            address: 'Kantor Perpustakaan',
            phone: '8273721',
            ktp: 'admin_ktp.jpg', // dummy data
            role: 'ADMIN',
            account_status: 'APPROVED' 
        }
    });

    console.log('Akun Admin berhasil dibuat:', adminUser.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });