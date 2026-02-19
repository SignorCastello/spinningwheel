# 🎯 Spin Wheel — Lightweight Web Component

A clean, physics-based spin wheel built with pure HTML, CSS and Canvas.

Designed to look polished, feel real, and work instantly — no frameworks, no dependencies.

---

## ✨ Features

* 🎡 Smooth physics-based spinning (real friction, no fake easing)
* 📥 Names loaded dynamically from URL
* 🚀 Auto-spin on page load
* 🎯 Accurate result detection
* 🌞 Light premium UI
* 📱 Fully responsive-ready structure
* ⚡ Zero libraries

---

## 🔗 Passing Names via URL

The wheel reads entries from the query string.

Format:

```
?names=Name1,Name2,Name3
```

Example:

```
index.html?names=Ali,Hanna,Gabriel,Fatima
```

Supports spaces using URL encoding:

```
?names=Marco%20Rossi,Luca%20Bianchi,Anna%20Verdi
```

---

## ⚙️ How It Works

1. Names are parsed from the URL
2. Wheel is drawn using Canvas
3. On page load, spin starts automatically
4. Wheel slows down via friction simulation
5. Final segment under the pin is detected mathematically

No randomness after the spin starts → motion feels natural.

---

## 🧠 Physics Model

Instead of rotating toward a fixed target, the wheel uses:

```
Initial Velocity → Friction → Natural Stop
```

This makes the motion:

* unpredictable
* believable
* game-show realistic

---

## 📁 Project Structure

```
index.html
style.css
app.js
```

No build step required.

---

## 🚀 Run Locally

Just open:

```
index.html?names=Ali,Hanna,Gabriel
```

Done.

---

## 🛠 Customization

You can easily modify:

* Colors → in `app.js`
* Friction → adjust:

```js
const friction = 0.985;
```

Higher = longer spins
Lower = faster stop

---

## 🧩 Ready For

* Giveaways
* Live streams
* Events
* Gamification
* SaaS integrations

---

## 📌 Next Possible Upgrades

* Tick sound on pin
* Weighted probabilities
* Backend-controlled winners
* Confetti celebration

---

Built for speed, realism and simplicity.
