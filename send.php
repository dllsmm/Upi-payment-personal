<?php
require 'vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$botToken = $_ENV['BOT_TOKEN'];
$chatId = $_ENV['CHAT_ID'];

$utr = $_POST['utr'] ?? '';
$amount = $_POST['amount'] ?? '';
$username = $_POST['username'] ?? '';

if (!$utr || !$amount || !$username) {
    echo "Missing required fields";
    exit;
}

$message = "💸 *New Payment Verification Received*\n\n"
         . "👤 *Username:* `$username`\n"
         . "💰 *Amount:* ₹$amount\n"
         . "🔁 *UTR:* `$utr`\n"
         . "🕐 *Time:* " . date("d-m-Y H:i:s");

$url = "https://api.telegram.org/bot$botToken/sendMessage";

$data = [
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'Markdown'
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    ]
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo "OK";
?>
