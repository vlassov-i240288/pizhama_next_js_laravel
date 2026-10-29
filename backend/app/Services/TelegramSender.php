<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TelegramSender
{
    public function sendTextMessage(string $text): bool
    {
        $token = config('services.telegram.bot_token');
        $chatId = config('services.telegram.chat_id');

        if (empty($token) || empty($chatId)) {
            logger()->warning('TelegramSender: missing config, skipping send');
            return false;
        }

        $res = Http::timeout(10)->post("https://api.telegram.org/bot{$token}/sendMessage", [
            'chat_id' => $chatId,
            'text' => $text,
            'disable_web_page_preview' => true,
        ]);

        if ($res->successful()) {
            return true;
        }

        logger()->error('TelegramSender: send failed', ['status' => $res->status(), 'body' => $res->body()]);
        return false;
    }
}
