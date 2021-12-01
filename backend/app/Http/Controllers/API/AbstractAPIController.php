<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserToken;
use App\Traits\AbstractAPIControllerTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 *
 */
abstract class AbstractAPIController extends Controller
{
	use AbstractAPIControllerTrait;

	protected User|null $loggedUser = null;

	public function __construct()
	{
		$request = app("request");

		$this->insertLoggedUser($request);
	}

	private function insertLoggedUser(Request $request)
	{
		$this->loggedUser = UserToken::where([
			"token" => $request->header("authorization"),
			'active' => true,
		])
			->with("user.workspace_user")
			?->first()
			?->user;
	}

	/**
	 * @param Request $request
	 * @return mixed
	 */
	public function get(Request $request)
	{
		return $this->defaultJSONResponse(
			$this->repository,
			$this->repository->{__FUNCTION__}($request?->all() ?? []),
		);
	}

	/**
	 * @param Request $request
	 * @param $id
	 * @return mixed
	 */
	public function update(Request $request, $id)
	{
		return $this->defaultJSONResponse(
			$this->repository,
			$this->repository->{__FUNCTION__}($id, $request->all()),
		);
	}

	/**
	 * @param $id
	 * @return mixed
	 */
	public function delete($id)
	{
		return $this->defaultJSONResponse(
			$this->repository,
			$this->repository->{__FUNCTION__}($id),
		);
	}

	/**
	 * @param Request $request
	 * @return mixed
	 */
	public function create(Request $request)
	{
		return $this->defaultJSONResponse(
			$this->repository,
			$this->repository->{__FUNCTION__}($request->all()),
		);
	}

	/**
	 * @param Request $request
	 * @param mixed $id
	 * @return mixed
	 */
	public function find(Request $request, mixed $id): mixed
	{
		return $this->defaultJSONResponse(
			$this->repository,
			$this->repository->{__FUNCTION__}($id, $request->all()),
		);
	}


	/**
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function login(Request $request): JsonResponse
	{
		$entity = $this->repository->getModel()->where('email', $request->input("email"))->first();

		if ($entity) {
			if (password_verify($request->input("password"), $entity->password)) {
				$header = json_encode([
					'typ' => "jwt",
					'alg' => 'HS256',
				]);

				$payload = json_encode($entity->toArray());

				$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

				$base64Payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

				$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64Payload, 'abC123!');

				$base64Signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

				$token = $base64UrlHeader . "." . $base64Payload . "." . $base64Signature;

				UserToken::where('user_id', $entity->id)->delete();

				UserToken::create([
					'user_id' => $entity->id,
					'token' => $token,
					'active' => true,
					'expiration_date' => now()->addDays(7),
				]);

				Auth::login($entity);

				return response()->json($token);
			}
		}

		return response()->json("User not found", 404);
	}

	/**
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function logout(Request $request)
	{
		$token = $request->header("authorization");

		if ($token) {
			Auth::logout();
			return response()->json(UserToken::where('token', $token)
				->delete());
		}

		return response()->json(true);
	}
}
