module.exports = {
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	host: process.env.DB_HOST,
	dialect: "postgres",
	port: process.env.DB_PORT,
	jwt: process.env.JWT_SECRET,
	jwtExpire: process.env.JWT_EXPIRE,
	refJwt: process.env.REF_JWT_SECRET,
	refJwtExpire: process.env.REF_JWT_EXPIRE,
	emailHost: process.env.EMAIL_HOST,
	emailPort: process.env.EMAIL_PORT,
	emailUser: process.env.EMAIL_USER,
	emailPassword: process.env.EMAIL_PASSWORD,
	apiUrl: process.env.API_URL,
	clientUrl: process.env.CLIENT_URL
};
