<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class UsersController extends AbstractAPIController
{
	public function __construct(
		protected UserRepository $repository
	)
	{
		$this->repository->setValidators([
			"name" => [
				"required",
				"min:5",
				"max:255",
			],
			"password" => [
				"required",
				"min:5",
				"max:255",
			],
			"email" => [
				"required",
				"min:5",
				"max:255",
				"unique:users",
				'email:rfc,dns',
			],
		]);
	}
}
