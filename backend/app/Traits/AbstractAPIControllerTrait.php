<?php

namespace App\Traits;

use App\Repositories\AbstractEloquentRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

trait AbstractAPIControllerTrait
{
	public function defaultJSONResponse(
		AbstractEloquentRepository $repository,
		mixed $response,
	): JsonResponse
	{
		return response()->json(
			$response,
			$repository::getResponseCode(),
		);
	}
}
