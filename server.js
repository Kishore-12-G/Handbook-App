const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const prisma = require('./config/prisma'); // Updated path to prisma.js
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // or './config/swagger'

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/users', require('./routes/userRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/todos', require('./routes/todoRoutes'));
app.use('/allowances', require('./routes/allowanceRoute'));
app.use('/upskill',require('./routes/upskillCertificationRoutes'));
app.use('/upskill/enrollments',require('./routes/upskillEnrollmentsRoutes'));
app.use('/checklist', require('./routes/tdClaimChecklist'));
app.use('/tdRates',require('./routes/tdRatesRoutes'));
app.use('/tdRules',require('./routes/tdRulesRoutes'))

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Graceful shutdown handlers
const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...');
  try {
    await prisma.$disconnect();
    console.log('Prisma client disconnected');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Health check endpoint
app.get('/api/v1/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`; // Simple DB check
    res.status(200).json({
      status: 'healthy',
      database: 'connected'
    });
  } catch (err) {
    res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: err.message
    });
  }
});