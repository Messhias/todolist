<?php


use App\Http\Controllers\API\StatusController;
use Illuminate\Support\Facades\Route;

Route::group([
	"prefix" => "/",
	"middleware" => \App\Http\Middleware\AuthorizationMiddleware::class,
], function() {
	Route::get("/", [StatusController::class,  "get" ]);

	Route::post("/", [ StatusController::class, "create"]);

	Route::put("/{id}", [ StatusController::class, "update"]);

	Route::delete("/{id}", [ StatusController::class, "delete"]);
});

