# Quick Fix for CORS Error

## The Problem

Your backend is configured to allow CORS from `http://localhost:3001`, but React is running on `http://localhost:3000`.

## Quick Solution (2 minutes)

### Step 1: Create `.env` file

Create a file named `.env` in the root directory of your project with this content:

```env
PORT=3001
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

**How to create the file:**

**Windows (Command Prompt):**
```cmd
echo PORT=3001 > .env
echo REACT_APP_API_BASE_URL=http://localhost:8080/api >> .env
```

**Windows (PowerShell):**
```powershell
@"
PORT=3001
REACT_APP_API_BASE_URL=http://localhost:8080/api
"@ | Out-File -FilePath .env -Encoding utf8
```

**Linux/Mac:**
```bash
cat > .env << EOF
PORT=3001
REACT_APP_API_BASE_URL=http://localhost:8080/api
EOF
```

Or manually create the file in your editor and paste the content.

### Step 2: Restart React App

1. **Stop** your React app (Ctrl+C in terminal)
2. **Start** it again:
   ```bash
   npm start
   ```

3. The app will now run on `http://localhost:3001` instead of `http://localhost:3000`

### Step 3: Open in Browser

Navigate to: **http://localhost:3001**

The CORS errors should be gone! ✅

## Why This Works

- Your backend CORS is configured to allow `http://localhost:3001`
- By setting `PORT=3001` in `.env`, React runs on port 3001
- Now the origins match, so CORS allows the requests

## Alternative: Fix Backend (Better Long-term Solution)

If you prefer to keep React on port 3000, update your backend CORS configuration to allow `http://localhost:3000` instead. See [CORS_TROUBLESHOOTING.md](./CORS_TROUBLESHOOTING.md) for backend configuration examples.

## Verify It's Working

After restarting, check the browser console:
- ✅ No CORS errors
- ✅ API calls succeed
- ✅ Data loads correctly

---

**Note**: Remember to update any bookmarks or links from `localhost:3000` to `localhost:3001`!

