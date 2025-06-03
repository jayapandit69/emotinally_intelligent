
# 🔮 EmotionChain — Emotion-Based Smart Contracts

## 🧠 Project Name
**EmotionChain**  
Emotion-Aware Smart Contracts for Human-Centric Blockchain Interactions

---

## 📝 Description

EmotionChain is a next-generation smart contract platform that reacts to users' emotional states in real-time using AI-powered emotion detection from text or voice inputs. The system enables adaptive and empathetic contract logic — ideal for use in relationship agreements, mental health apps, or emotionally-aware financial decisions.

---

## 🛠️ Tech Stack

| Layer         | Tech Used                                  |
| ------------- | ------------------------------------------ |
| 🌐 Frontend   | React.js, Tailwind CSS, Web3.js            |
| 🧠 Emotion Detection | Python (HuggingFace Transformers), Whisper |
| ⛓️ Smart Contracts | Solidity (Ethereum / Polygon)         |
| 🔗 Middleware | Chainlink / Flask API (Oracle bridge)       |
| 🗄️ Storage (optional) | IPFS (for hashed emotion logs)      |
| 🚀 Hosting    | Netlify (Frontend), Render (Backend)        |

---

## ⚙️ Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/emotionchain.git
cd emotionchain

# 2. Install frontend dependencies
cd client
npm install

# 3. Run the frontend
npm run dev

# 4. Install backend (Flask API)
cd ../backend
pip install -r requirements.txt
python app.py

# 5. Deploy contract (Hardhat/Remix)
cd ../smart-contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

---

## 🚀 Usage Example

1. **🎙️ Speak or type a message in the UI**  
   _Example:_ “I’m feeling too overwhelmed right now.”

2. **🧠 The AI analyzes your emotion**  
   _Example output:_ `angry`, `sad`, `calm`, etc.

3. **🔐 Emotion result is signed and sent to a smart contract**  
   - The detected emotion is securely processed and recorded on-chain.

4. **⚙️ Contract Behavior**  
   Based on the emotion, the contract may:  
   - Pause execution  
   - Send a notification  
   - Delay action  
   - Store hashed logs

---

## 🤝 Contribution Guidelines

We welcome open-source contributions! Please:

- Fork the repo
- Create a feature branch:  
  `git checkout -b feature/your-feature-name`
- Commit your changes
- Submit a pull request with a clear explanation

---

## 📜 License

MIT License  
Feel free to use, remix, and extend.

---

## 👤 Author / Contact

**Jayesh Pandit**  
👨‍💻 Full Stack Developer | Blockchain | AI  
📧 [jayeshpandit.dev@gmail.com](mailto:jayeshpandit.dev@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/jayeshpandit/)  
🌐 [Portfolio Website](https://jayeshpandit.dev/)

---Made with passion ❤️❤️
