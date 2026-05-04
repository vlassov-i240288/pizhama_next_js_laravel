<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\SendOwnerNotificationJob;

class LeadController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'service' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'name' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:64',
        ]);

        $data['created_at'] = now()->toDateTimeString();

        // Append lead to storage log for now
        try {
            $log = storage_path('logs/leads.log');
            file_put_contents($log, json_encode($data, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND | LOCK_EX);
        } catch (\Throwable $e) {
            // ignore write errors
        }

        // Dispatch job to notify owner via WhatsApp (will use sync queue if none configured)
        try {
            SendOwnerNotificationJob::dispatch($data);
        } catch (\Throwable $e) {
            // ignore failures to avoid blocking client
        }

        return response()->json(['status' => 'ok'], 201);
    }
}
