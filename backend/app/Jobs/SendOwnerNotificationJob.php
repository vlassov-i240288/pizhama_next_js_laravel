<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\WhatsAppSender;

class SendOwnerNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function handle()
    {
        $sender = new WhatsAppSender();

        $serviceLabel = $this->data['service'] ?? '—';
        $budgetLabel = $this->data['budget'] ?? '—';

        $text = "Новая заявка на проект — PIZHAMA\n\n"
            . "Услуга: {$serviceLabel}\n"
            . "Бюджет: {$budgetLabel}\n"
            . "Краткое описание: {$this->data['description'] ?? '—'}\n\n"
            . "Контактное лицо: {$this->data['name'] ?? '—'}\n"
            . "Компания: {$this->data['company'] ?? '—'}\n"
            . "Email: {$this->data['email'] ?? '—'}\n"
            . "Телефон: {$this->data['phone'] ?? '—'}\n\n"
            . "Клиент просит обсудить детали."
            ;

        try {
            $owner = env('OWNER_WHATSAPP_NUMBER', '+77019204449');
            $sender->sendTextMessage($owner, $text);
        } catch (\Throwable $e) {
            // Log error but don't throw
            logger()->error('Failed to send WhatsApp notification', ['error' => $e->getMessage()]);
        }
    }
}
