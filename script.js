const BOT_TOKEN = '7741011440:AAG5NJyQ71q5wpdOoDci32UgQDgBFXsF_XM';
const CHAT_ID = '-1002647674903';

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

async function submitPayment() {
  const utr = document.getElementById('utr').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const username = document.getElementById('username').value.trim();
  const imageFile = document.getElementById('paymentImage').files[0];

  if (!utr || !amount || !username || !imageFile) {
    alert('Please fill in all fields and upload an image.');
    return;
  }

  const caption = `📥 *New Payment Submitted*\n\n🧾 *UTR:* ${utr}\n💰 *Amount:* ₹${amount}\n👤 *Username:* ${username}\n📸 *Screenshot Below*`;

  const formData = new FormData();
  formData.append('chat_id', CHAT_ID);
  formData.append('caption', caption);
  formData.append('photo', imageFile);
  formData.append('parse_mode', 'Markdown');

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert("✅ Payment submitted successfully!\nFunds will be added within 1 hour.\nYou can also contact support @dllsmm for instant add.");
    } else {
      alert("❌ Failed to send payment details. Please try again.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong. Try again later.");
  }
}
