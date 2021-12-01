<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use JetBrains\PhpStorm\ArrayShape;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
		if ($request->isMethod("OPTIONS")) {
			return response()->json('{"method": "OPTIONS"}', 200, $this->mountHeaders());
		}

		$response = $next($request);

		foreach ($this->mountHeaders() as $key => $value) {
			$response->header($key, $value);
		}

        return $response;
    }

	#[ArrayShape([
		"Access-Control-Allow-Origin" => "string",
		"Access-Control-Allow-Methods" => "string",
		"Access-Control-Credentials" => "bool",
		"Access-Control-Allow-Headers" => "string"])
	] private function mountHeaders(): array
	{
		return [
			"Access-Control-Allow-Origin" => "*",
			"Access-Control-Allow-Methods" => "POST, GET, OPTIONS, DELETE, PUT",
			"Access-Control-Credentials" => true,
			"Access-Control-Allow-Headers" => "Content-Type, Authorization, X-Request-With, authorization, Origin, Accept",
		];
	}
}
