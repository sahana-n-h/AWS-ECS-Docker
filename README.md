
# AWS ECS Guide App 🚀

This repository contains a sample React application prepared for deployment using **GitHub Pages** and containerized for use with **AWS ECS (EC2 Launch Type)**. It includes frontend code, Docker setup (optional), and build instructions.

---

## 🌐 Live Demo

🔗 [View Deployed Site](https://sahana-n-h.github.io/AWS-ECS-Docker)

---

## 📦 Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/sahana-n-h/AWS-ECS-Docker.git
cd AWS-ECS-Docker/app
```

2. Install dependencies:

```bash
npm install
```

3. Start the app locally:

```bash
npm start
```

---

## 🚀 Deploy to GitHub Pages

1. Set the `homepage` in `package.json`:

```json
"homepage": "https://sahana-n-h.github.io/AWS-ECS-Docker"
```

2. Build the app:

```bash
npm run build
```

3. Copy the build output to the `docs` folder:

```bash
cp -R build ../docs
```

4. Commit and push:

```bash
git add ../docs
git commit -m "Deploy build to GitHub Pages"
git push
```

5. Go to your repo → **Settings** → **Pages**  
   Set the source to `main` branch → `/docs` folder

---

## 🐳 Docker Support (Optional)

To build and run the container:

```bash
docker build -t aws-ecs-guide-app .
docker run -p 8080:80 aws-ecs-guide-app
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Author

**Sahana H**  
GitHub: [@sahana-n-h](https://github.com/sahana-n-h)
