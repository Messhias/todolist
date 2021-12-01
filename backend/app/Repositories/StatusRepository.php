<?php

namespace App\Repositories;

use App\Models\Status;

/**
* Class StatusRepository
* @package App\Repositories
*/
class StatusRepository extends AbstractEloquentRepository
{
	/**
	 * @return string
	 */
	protected function model(): string
	{
		return Status::class;
	}
}
