import { connectDB } from './db';

export { connectDB };

class MongoPool {
  private ready = false;

  async initialize() {
    try {
      await connectDB();
      this.ready = true;
    } catch (err) {
      this.ready = false;
      throw err;
    }
  }

  isReady() {
    return this.ready;
  }

  getStats() {
    return { ready: this.ready };
  }
}

declare global {
  var mongoPool: MongoPool | undefined;
}

export const mongoPool = global.mongoPool ?? new MongoPool();
if (!global.mongoPool) global.mongoPool = mongoPool;
