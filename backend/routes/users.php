<?php


use App\Http\Controllers\API\UsersController;
use Illuminate\Support\Facades\Route;

Route::post("/login", [UsersController::class, "login"]);
Route::post("/", [UsersController::class, "create"]);
Route::post("/logout", [UsersController::class, "logout"]);
