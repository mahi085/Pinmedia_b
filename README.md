# Pin Media Backend - Setup & Installation

## 📋 Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account
- Cloudinary account
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FILE_UPLOAD_PATH=pin_media_uploads
```

**Get these credentials from:**
- **MongoDB**: Atlas dashboard (Connection String)
- **Cloudinary**: Dashboard (API Credentials)

### 3. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on: `http://localhost:4000`

## ✅ Verify Setup

Check console output for:
```
✅ Cloudinary connected successfully
MongoDB Connected: cluster0.upoxkph.mongodb.net
Server running on port 4000
```

## 📁 Project Structure

```
pin_media_b/
├── src/
│   ├── config/          # Database & Cloudinary config
│   ├── models/          # MongoDB schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   └── middleware/      # Multer file upload
├── uploads/             # Temporary file storage
├── index.js             # Main entry point
├── package.json         # Dependencies
├── .env                 # Environment variables
└── API_DOCUMENTATION.md # API endpoints
```

## 🔌 Available APIs

### Admin Auth
- `POST /api/admin/signup` - Create admin account
- `POST /api/admin/login` - Admin login

### Blog Management
- `POST /api/blog/add/blog` - Create blog (with image)
- `GET /api/blog/blogs` - Get all blogs
- `GET /api/blog/blog/:id` - Get single blog
- `PUT /api/blog/update/blog/:id` - Update blog
- `DELETE /api/blog/delete/blog/:id` - Delete blog

### Project Management
- `POST /api/projects/add` - Create project (with image)
- `GET /api/projects/all` - Get all projects
- `GET /api/projects/:id` - Get single project
- `PUT /api/projects/update/:id` - Update project
- `DELETE /api/projects/delete/:id` - Delete project

### Inquiries
- `POST /api/inquiries/add` - Create inquiry
- `GET /api/inquiries/all` - Get all inquiries
- `PUT /api/inquiries/update/:id` - Update inquiry status
- `DELETE /api/inquiries/delete/:id` - Delete inquiry

### Reviews
- `POST /api/reviews/add` - Create review
- `GET /api/reviews/all` - Get all reviews
- `PUT /api/reviews/update/:id` - Update review
- `DELETE /api/reviews/delete/:id` - Delete review

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation.

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file or use:
PORT=5000 npm run dev
```

### MongoDB Connection Error
- Verify connection string in `.env`
- Ensure MongoDB Atlas IP whitelist includes your IP
- Check internet connection

### Cloudinary Upload Fails
- Verify API credentials in `.env`
- Check folder name (defaults to `pin_media_uploads`)
- Ensure file size < 10MB

### Multer File Upload Issues
- Check `uploads/` directory permissions
- Verify allowed file types in `/src/middleware/multer.js`
- Maximum file size is 10MB

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cloudinary** - Image upload service
- **multer** - File upload middleware
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin requests
- **dotenv** - Environment variables
- **nodemon** - Development auto-reload

## 🔐 Security Notes

- Never commit `.env` file
- Use strong JWT_SECRET
- Store sensitive data in environment variables
- Validate all input data
- Use HTTPS in production

## 📞 Support

For issues or questions, check the console logs for detailed error messages.

Good luck! 🚀
