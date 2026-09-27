const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const dbRoutes = require('./routes/dbRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

const Customer = require('./models/Customer');
const Project = require('./models/Project');
const Milestone = require('./models/Milestone');
const Payment = require('./models/Payment');
const Material = require('./models/Material');
const Vendor = require('./models/Vendor');
const Commitment = require('./models/Commitment');
const VendorPayment = require('./models/VendorPayment');
const Reminder = require('./models/Reminder');
const Media = require('./models/Media');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' })); // media uploads are base64 data URLs
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/db', dbRoutes);

app.use('/api/customers', resourceRoutes(Customer));
app.use('/api/projects', resourceRoutes(Project));
app.use('/api/milestones', resourceRoutes(Milestone));
app.use('/api/payments', resourceRoutes(Payment));
app.use('/api/materials', resourceRoutes(Material));
app.use('/api/vendors', resourceRoutes(Vendor));
app.use('/api/commitments', resourceRoutes(Commitment));
app.use('/api/vendor-payments', resourceRoutes(VendorPayment));
app.use('/api/reminders', resourceRoutes(Reminder));
app.use('/api/media', resourceRoutes(Media));

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use(errorHandler);

module.exports = app;
