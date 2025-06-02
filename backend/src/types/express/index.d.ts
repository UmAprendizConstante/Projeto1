export {}; // 👈 evita erro de "duplicate identifier"

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
      };
    }
  }
}
