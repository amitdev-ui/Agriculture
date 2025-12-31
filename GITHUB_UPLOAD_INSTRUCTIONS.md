# How to Upload to GitHub (Bypassing 100 File Limit)

## Option 1: Using Git Command Line (Recommended)

### Step 1: Initialize Git Repository
Open PowerShell/Command Prompt in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit - Agricom website"
```

### Step 2: Create Repository on GitHub
1. Go to https://github.com/new
2. Create a new repository (e.g., "agricom-website")
3. **DO NOT** initialize with README, .gitignore, or license
4. Click "Create repository"

### Step 3: Connect and Push
GitHub will show you commands. Use these (replace YOUR-USERNAME and REPO-NAME):

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git push -u origin main
```

You'll be prompted for your GitHub username and password (use a Personal Access Token instead of password).

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch and **/ (root)** folder
4. Click **Save**
5. Your site will be live at: `https://YOUR-USERNAME.github.io/REPO-NAME/`

---

## Option 2: Using GitHub Desktop (Easier GUI)

1. Download GitHub Desktop from: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Click **File** → **Add Local Repository**
4. Click **Choose** and select your `agricom` folder
5. Click **Publish repository** (check "Keep this code private" if you want)
6. Go to repository Settings → Pages and enable GitHub Pages

---

## Option 3: Upload in Batches (Not Recommended)

If you must use web upload, you can upload files in batches:
- Upload HTML files first (about 13 files)
- Then upload CSS/JS files
- Then upload images in smaller batches from `img/` folder

But **Option 1 or 2 is much easier!**

---

## Note About Personal Access Token

GitHub no longer accepts passwords. Create a Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Give it "repo" permissions
4. Use this token as your password when pushing

