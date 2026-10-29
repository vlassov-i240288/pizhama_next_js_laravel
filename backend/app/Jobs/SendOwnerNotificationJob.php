<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Services\TelegramSender;
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
        $text = $this->buildText();

        // Each channel is independent: a failure in one must not block the others
        try {
            (new TelegramSender())->sendTextMessage($text);
        } catch (\Throwable $e) {
            logger()->error('Failed to send Telegram notification', ['error' => $e->getMessage()]);
        }

        $email = config('services.leads.notify_email');
        if (!empty($email)) {
            try {
                Mail::raw($text, fn ($message) => $message->to($email)->subject('Новая заявка с pizhama.kz'));
            } catch (\Throwable $e) {
                logger()->error('Failed to send email notification', ['error' => $e->getMessage()]);
            }
        }

        try {
            $owner = env('OWNER_WHATSAPP_NUMBER', '+77019204449');
            (new WhatsAppSender())->sendTextMessage($owner, $text);
        } catch (\Throwable $e) {
            logger()->error('Failed to send WhatsApp notification', ['error' => $e->getMessage()]);
        }
    }

    protected function buildText(): string
    {
        $field = fn (string $key) => ($this->data[$key] ?? null) ?: '—';

        return "Новая заявка на проект — PIZHAMA\n\n"
            . "Услуга: {$field('service')}\n"
            . "Бюджет: {$field('budget')}\n"
            . "Описание: {$field('description')}\n\n"
            . "Имя: {$field('name')}\n"
            . "Компания: {$field('company')}\n"
            . "Email: {$field('email')}\n"
            . "Телефон: {$field('phone')}\n"
            . "Дата: {$field('created_at')}";
    }
}
