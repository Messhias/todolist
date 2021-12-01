<?php

namespace App\Http\Middleware;

use App\Models\UserToken;
use Closure;
use Illuminate\Http\Request;

class AuthorizationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
		$token = $request->header("authorization");

		if (!empty($token)) {
			$token = UserToken::where([
				"token" => $token,
				'active' => true,
			])->first();

			if (!$token) {
				return response()->json("You need to log in to use.", 401);
			}

		} else {
			return response()->json("You need to log in to use.", 401);
		}

        return $next($request);
    }
}
