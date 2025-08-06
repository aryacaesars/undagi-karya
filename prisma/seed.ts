import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Seed Projects
  const projects = await prisma.project.createMany({
    data: [
      {
        name: 'Downtown Mall Phase 2',
        client: 'MegaBuild Corp',
        officer: 'John Smith',
        type: 'Commercial Construction',
        location: 'Jakarta Pusat',
        description: 'Pembangunan mall fase 2 dengan area 15,000 m2'
      },
      {
        name: 'Residential Complex A',
        client: 'Urban Developers',
        officer: 'Sarah Johnson',
        type: 'Residential Development',
        location: 'Tangerang',
        description: 'Kompleks perumahan dengan 200 unit rumah'
      },
      {
        name: 'Highway Bridge Renovation',
        client: 'City Infrastructure',
        officer: 'Mike Wilson',
        type: 'Infrastructure',
        location: 'Jakarta Timur',
        description: 'Renovasi jembatan layang sepanjang 2 km'
      },
      {
        name: 'Eco-Friendly Office Building',
        client: 'Green Construction',
        officer: 'Emily Davis',
        type: 'Green Building',
        location: 'Jakarta Selatan',
        description: 'Gedung kantor ramah lingkungan 20 lantai'
      }
    ],
    skipDuplicates: true
  })

  // Seed Officers
  const officers = await prisma.officer.createMany({
    data: [
      {
        name: 'John Smith',
        role: 'Senior Project Manager',
        email: 'john.smith@company.com',
        phone: '+62 811-1234-5678'
      },
      {
        name: 'Maria Rodriguez',
        role: 'Construction Supervisor',
        email: 'maria.rodriguez@company.com',
        phone: '+62 812-2345-6789'
      },
      {
        name: 'David Chen',
        role: 'Site Engineer',
        email: 'david.chen@company.com',
        phone: '+62 813-3456-7890'
      },
      {
        name: 'Sarah Johnson',
        role: 'Project Coordinator',
        email: 'sarah.johnson@company.com',
        phone: '+62 814-4567-8901'
      },
      {
        name: 'Michael Lee',
        role: 'Technical Lead',
        email: 'michael.lee@company.com',
        phone: '+62 815-5678-9012'
      },
      {
        name: 'Emily Davis',
        role: 'Project Manager',
        email: 'emily.davis@company.com',
        phone: '+62 816-6789-0123'
      },
      {
        name: 'Mike Wilson',
        role: 'Senior Project Manager',
        email: 'mike.wilson@company.com',
        phone: '+62 817-7890-1234'
      }
    ],
    skipDuplicates: true
  })

  // Seed Supply Items
  const supplyItems = await prisma.supplyItem.createMany({
    data: [
      {
        name: 'Steel I-Beam 20ft',
        category: 'Structural Steel',
        unit: 'piece',
        specifications: '20ft length, Grade A36 steel'
      },
      {
        name: 'Concrete Mix (High Strength)',
        category: 'Concrete',
        unit: 'cubic yard',
        specifications: '4000 PSI, Portland cement'
      },
      {
        name: 'Electrical Wire 12 AWG',
        category: 'Electrical',
        unit: 'foot',
        specifications: 'THHN/THWN-2, 600V rated'
      },
      {
        name: 'Plywood Sheet 4x8',
        category: 'Lumber',
        unit: 'sheet',
        specifications: '4x8 feet, Grade A/B, exterior grade'
      },
      {
        name: 'PVC Pipe 4 inch',
        category: 'Plumbing',
        unit: 'foot',
        specifications: 'Schedule 40, white PVC'
      },
      {
        name: 'Cement Portland Type I',
        category: 'Concrete',
        unit: 'bag',
        specifications: '50kg per bag, high quality'
      },
      {
        name: 'Rebar Steel #4',
        category: 'Structural Steel',
        unit: 'piece',
        specifications: '12mm diameter, Grade 60'
      },
      {
        name: 'Ceramic Tiles 30x30',
        category: 'Finishing',
        unit: 'box',
        specifications: '30x30cm, non-slip surface'
      }
    ],
    skipDuplicates: true
  })

  // Seed Vendors
  const vendors = await prisma.vendor.createMany({
    data: [
      {
        name: 'Steel & Materials Co.',
        phone: '+62 21-1234-5678',
        address: 'Jl. Industri No. 123, Jakarta',
        contactPerson: 'Ahmad Sutanto',
        paymentTerms: 'Net 30',
        description: 'Supplier baja dan material konstruksi'
      },
      {
        name: 'BuildPro Supplies',
        phone: '+62 21-2345-6789',
        address: 'Jl. Raya Bekasi No. 456, Bekasi',
        contactPerson: 'Siti Rahayu',
        paymentTerms: 'Net 45',
        description: 'Distributor alat dan bahan bangunan'
      },
      {
        name: 'Heavy Equipment Rentals',
        phone: '+62 21-3456-7890',
        address: 'Jl. Margonda No. 789, Depok',
        contactPerson: 'Budi Santoso',
        paymentTerms: 'Net 15',
        description: 'Penyewaan alat berat konstruksi'
      },
      {
        name: 'Green Materials Inc.',
        phone: '+62 21-4567-8901',
        address: 'Jl. Sudirman No. 321, Jakarta',
        contactPerson: 'Lisa Wijaya',
        paymentTerms: 'Net 30',
        description: 'Material ramah lingkungan dan sustainable'
      }
    ],
    skipDuplicates: true
  })

  // Seed Clients
  const clients = await prisma.client.createMany({
    data: [
      {
        name: 'MegaBuild Corp',
        phone: '+62 21-5555-0001',
        address: 'Jl. Thamrin No. 1, Jakarta Pusat'
      },
      {
        name: 'Urban Developers',
        phone: '+62 21-5555-0002',
        address: 'Jl. Gatot Subroto No. 50, Jakarta Selatan'
      },
      {
        name: 'City Infrastructure',
        phone: '+62 21-5555-0003',
        address: 'Jl. Merdeka No. 25, Jakarta Pusat'
      },
      {
        name: 'Green Construction',
        phone: '+62 21-5555-0004',
        address: 'Jl. Rasuna Said No. 75, Jakarta Selatan'
      },
      {
        name: 'Prime Property',
        phone: '+62 21-5555-0005',
        address: 'Jl. Kemang Raya No. 88, Jakarta Selatan'
      }
    ],
    skipDuplicates: true
  })

  console.log(`✅ Created ${projects.count} projects`)
  console.log(`✅ Created ${officers.count} officers`)
  console.log(`✅ Created ${supplyItems.count} supply items`)
  console.log(`✅ Created ${vendors.count} vendors`)
  console.log(`✅ Created ${clients.count} clients`)
  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
