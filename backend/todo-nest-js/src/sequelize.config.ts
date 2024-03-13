module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dunice',
  password: 'root',
  database: 'postgres',
  define: {
    timestamps: false, // Опционально: отключает автоматическое создание полей createdAt и updatedAt
  },
};
