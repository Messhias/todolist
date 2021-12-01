<?php


use App\Http\Controllers\API\TasksController;
use App\Http\Middleware\AuthorizationMiddleware;
use Illuminate\Support\Facades\Route;

Route::group([
	"prefix" => "/",
	"middleware" => AuthorizationMiddleware::class,
], function() {

	Route::get("/", [TasksController::class,  "get" ]);

	Route::get("/{id}", [ TasksController::class, "find"]);

	Route::post("/", [TasksController::class, "create"]);

	Route::put("/{id}", [ TasksController::class, "update"]);


	Route::delete("/{id}", [ TasksController::class, "delete"]);
});

