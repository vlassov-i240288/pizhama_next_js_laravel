<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WhatsAppSender
{
    public function sendTextMessage(string $to, string $body): bool
    {
        $token = env('WHATSAPP_CLOUD_TOKEN');
        $phoneId = env('WHATSAPP_PHONE_ID');
        $apiVersion = env('WHATSAPP_API_VERSION', 'v17.0');

        if (empty($token) || empty($phoneId)) {
            logger()->warning('WhatsAppSender: missing config, skipping send');
            return false;
        }

        $url = "https://graph.facebook.com/{$apiVersion}/{$phoneId}/messages";

        $payload = [
            'messaging_product' => 'whatsapp',
            'to' => $this->normalizeNumber($to),
            'type' => 'text',
            'text' => [
                'preview_url' => false,
                'body' => $body,
            ],
        ];

        $res = Http::withToken($token)
            ->post($url, $payload);

        if ($res->successful()) {
            return true;
        }

        logger()->error('WhatsAppSender: send failed', ['status' => $res->status(), 'body' => $res->body()]);
        return false;
    }

    protected function normalizeNumber(string $number): string
    {
        // remove non-digit characters and leading +
        $digits = preg_replace('/[^0-9]/', '', $number);
        return $digits;
    }
}
