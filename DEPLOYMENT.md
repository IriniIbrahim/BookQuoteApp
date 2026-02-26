# BookQuote App - Deployment Guide

## Prerequisites
- Node.js 18+ and npm
- .NET 9 SDK
- SQL Server or SQLite

## Frontend Deployment (Angular)

### Build for Production
```bash
cd BookQuoteUI
npm install
npm run build
```

The build artifacts will be in `dist/` folder.

### Deploy Options
1. **Static Hosting** (Netlify, Vercel, GitHub Pages)
   - Upload `dist/` folder
   - Configure redirects for SPA routing

2. **Azure Static Web Apps**
   ```bash
   az staticwebapp create --name bookquote-ui --resource-group myResourceGroup
   ```

3. **AWS S3 + CloudFront**
   - Upload to S3 bucket
   - Configure CloudFront distribution

### Environment Configuration
Update API URLs in service files before building:
- `src/app/shared/services/auth.service.ts`
- `src/app/shared/services/books.service.ts`
- `src/app/shared/services/quotes.service.ts`
- `src/app/shared/services/archive.service.ts`

Change `http://localhost:5073` to your production API URL.

## Backend Deployment (.NET API)

### Build for Production
```bash
cd BookQuoteApi
dotnet publish -c Release -o ./publish
```

### Deploy Options

1. **Azure App Service**
   ```bash
   az webapp up --name bookquote-api --resource-group myResourceGroup
   ```

2. **Docker**
   ```bash
   docker build -t bookquote-api .
   docker run -p 5073:8080 bookquote-api
   ```

3. **IIS (Windows Server)**
   - Copy `publish/` folder to IIS
   - Configure application pool (.NET 9)

### Database Setup
```bash
dotnet ef database update
```

### Configuration
1. Update `appsettings.Production.json`:
   - Change JWT Key to a secure random string
   - Update CORS origins to your frontend URL
   - Configure connection string

2. Set environment variables:
   ```bash
   export ASPNETCORE_ENVIRONMENT=Production
   ```

## Security Checklist
- [ ] Change JWT secret key
- [ ] Configure CORS for production domain only
- [ ] Enable HTTPS
- [ ] Set secure connection strings
- [ ] Remove development tools (Swagger in production)
- [ ] Configure rate limiting
- [ ] Set up logging and monitoring

## Post-Deployment
1. Test all CRUD operations
2. Verify authentication flow
3. Check responsive design on mobile
4. Test API endpoints
5. Monitor error logs

## Troubleshooting
- **CORS errors**: Update CORS policy in `Program.cs`
- **Database errors**: Check connection string and run migrations
- **Auth errors**: Verify JWT key matches between environments
