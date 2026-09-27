const User = require('../models/User');

// Seeds the same two demo accounts malwa-admin's old localStorage seed
// used to create, so the login page's "tap to fill" list keeps working —
// only runs if the users collection is empty.
const DEMO_USERS = [
  {
    name: 'Jaskaran Singh Malwa',
    email: 'admin@malwabuilders.com',
    phone: '9815031725',
    password: 'admin123',
    designation: 'Founder & Managing Director',
  },
  {
    name: 'Navdeep Singh Grewal',
    email: 'manager@malwabuilders.com',
    phone: '9501005300',
    password: 'manager123',
    designation: 'Projects Head',
  },
];

async function ensureDemoUsers() {
  const count = await User.countDocuments();
  if (count > 0) return;

  for (const demo of DEMO_USERS) {
    // eslint-disable-next-line no-await-in-loop
    await User.create({ ...demo, demoPassword: demo.password });
  }
  console.log(`Seeded ${DEMO_USERS.length} demo user(s)`);
}

module.exports = ensureDemoUsers;
