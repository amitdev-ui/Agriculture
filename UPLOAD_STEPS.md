# Step-by-Step: Upload to GitHub

## Step 1: Create Repository on GitHub
1. Go to: https://github.com/new
2. Repository name: `agricom-website` (or any name you like)
3. Description: (optional) "Agriculture company website"
4. Choose: **Public** or **Private**
5. **DO NOT** check "Add a README file"
6. **DO NOT** check "Add .gitignore"
7. **DO NOT** choose a license
8. Click **"Create repository"**

---

## Step 2: Open PowerShell in Your Project Folder
1. Press `Windows Key + X`
2. Select **"Windows PowerShell"** or **"Terminal"**
3. Type: `cd "C:\Users\Dell\Desktop\All projects\agricom"`
4. Press Enter

---

## Step 3: Run Git Commands (Copy and paste one at a time)

### 3.1 Initialize Git
```powershell
git init
```

### 3.2 Add all files
```powershell
git add .
```

### 3.3 Create first commit
```powershell
git commit -m "Initial commit - Agricom website"
```

### 3.4 Rename branch to main (if needed)
```powershell
git branch -M main
```

### 3.5 Connect to GitHub (REPLACE YOUR-USERNAME and REPO-NAME)
```powershell
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
```
**Example:** If your username is `john` and repo is `agricom-website`:
```powershell
git remote add origin https://github.com/john/agricom-website.git
```

### 3.6 Push files to GitHub
```powershell
git push -u origin main
```

**When prompted:**
- **Username:** Enter your GitHub username
- **Password:** Enter a **Personal Access Token** (not your GitHub password)

---

## Step 4: Create Personal Access Token (If needed)

If GitHub asks for a password, you need a token:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Note: Give it a name like "Agricom Upload"
4. Select scope: Check **"repo"** (this gives full repository access)
5. Click **"Generate token"**
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
7. Use this token as your password when pushing

---

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab (top right)
3. Scroll down to **"Pages"** (left sidebar)
4. Under **"Source"**:
   - Branch: Select **"main"**
   - Folder: Select **"/ (root)"**
5. Click **"Save"**

---

## Step 6: Your Website is Live! 🎉

Your website will be available at:
```
https://YOUR-USERNAME.github.io/REPO-NAME/
```

**Example:** `https://john.github.io/agricom-website/`

It may take 1-2 minutes to publish. You'll see the URL in the Pages settings.

---

## Troubleshooting

### If "git" command not found:
- Git is installed, but you may need to restart PowerShell
- Or use: `C:\Program Files\Git\bin\bash.exe`

### If authentication fails:
- Make sure you're using a Personal Access Token, not password
- Token must have "repo" scope checked

### If push fails:
- Make sure repository name matches exactly
- Make sure you created the repo first (Step 1)
- Check you're in the right folder (should see `agricom` in path)

