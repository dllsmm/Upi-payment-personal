let timeLeft = 15 * 60;
const countdownEl = document.getElementById("countdown");

const countdown = setInterval(() => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  countdownEl.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  timeLeft--;
  if (timeLeft < 0) {
    clearInterval(countdown);
    countdownEl.textContent = "QR expired, refresh the page";
  }
}, 1000);

function verifyPayment() {
  const utr = document.getElementById("utr").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const username = document.getElementById("username").value.trim();

  if (!utr || !amount || !username) {
    alert("Please fill all fields.");
    return;
  }

  const message = `
🔔 *New Payment Request*
————————————
👤 Username: ${username}
💰 Amount: ₹${amount}
🔢 UTR: ${utr}
————————————
📟 UPI ID: BHARATPE.8F0E0L7R6Y68168@fbpe
`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    })
  })
  .then(() => {
    alert("✅ Payment details sent successfully!\nYour funds will be added within 1 hour.\nYou can also contact support for faster update.");
    document.getElementById("utr").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("username").value = "";
  })
  .catch((err) => {
    alert("❌ Something went wrong. Try again.");
    console.error(err);
  });
}
