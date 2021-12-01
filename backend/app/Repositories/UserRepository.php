<?php

namespace App\Repositories;

use App\Models\User;

/**
* Class UserRepository
* @package App\Repositories
*/
class UserRepository extends AbstractEloquentRepository
{
	protected function model()
	{
		return User::class;
	}
}
