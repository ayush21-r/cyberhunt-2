import app from './app';
import config from './config';

const PORT = config.PORT;

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Hack With India - Operation Hunt API running on port ${PORT}`);
});
