ScribeConnect: AI-Powered Real-Time ScribeConnect for Students with Disabilities Learning without Limits
## Quick Start

You can easily set up and run the entire project (backend + frontend) using the provided scripts.

### Prerequisite
- **Node.js**: Ensure Node.js is installed on your machine.
- **MongoDB**: Ensure you have a MongoDB instance running or a connection string ready.

### Environment Setup
The setup script will automatically create `.env` files from `.env.example` templates.
**Important**: After running the script for the first time, you must edit `backend/.env` to add your **MongoDB URI**.

### One-Click Run

#### Mac / Linux
1. Open a terminal in the project root.
2. Run the script:
   ```bash
   ./run_project.sh
   ```
   (If you get a permission error, run `chmod +x run_project.sh` first)

#### Windows
1. Double-click `run_project.bat` or run it from the command line:
   ```cmd
   run_project.bat
   ```

These scripts will:
1. Install dependencies for both backend and frontend (if missing).
2. Create `.env` files (if missing).
3. Start both servers in parallel.

---