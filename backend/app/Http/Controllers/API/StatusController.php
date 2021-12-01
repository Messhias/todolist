<?php

namespace App\Http\Controllers\API;


use App\Repositories\StatusRepository;
use App\Rules\UpperCase;

class StatusController extends AbstractAPIController
{
	public function __construct(
		protected StatusRepository $repository
	)
	{
		$this->repository->setValidators([
			"name" => [
				"unique:status",
				"required",
				new UpperCase
			],
		]);
	}
}
