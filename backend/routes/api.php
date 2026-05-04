<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\LeadController;

Route::get('status', [StatusController::class, 'index']);
Route::post('lead', [LeadController::class, 'store']);
