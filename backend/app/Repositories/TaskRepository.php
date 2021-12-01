<?php

namespace App\Repositories;

use App\Models\Task;
use App\Models\Task\StatusHistory;
use Illuminate\Http\JsonResponse;

/**
* Class TaskRepository
* @package App\Repositories
*/
class TaskRepository extends AbstractEloquentRepository
{
	protected function model(): string
	{
		return Task::class;
	}

	/**
	 * @param array $data
	 * @return JsonResponse
	 */
	public function create(array $data)
	{
		$result = parent::create($data);

		if ($result) {
			StatusHistory::create([
				'task_id' => $result->id,
				'status_id' => $result->status_id,
			]);
		}

		return $result;
	}

	public function update($id, array $data)
	{
		if (array_key_exists("status_id", $data)) {
			StatusHistory::create([
				"task_id" => $id,
				'status_id' => $data['status_id'],
			]);
		}

		return parent::update($id, $data);
	}

	public function find($id, array $relations = []): mixed
	{
		$records = $this->getModel();


		if (count($relations) > 0) {
			$relations = explode(",", $relations[0]);
			if (count($relations) == 1) {
                $records = $records->with($relations);
            } else {
				foreach ($relations as $relation) {
					$relation = str_replace("=", "", $relation);
					$relation = preg_replace("/[0-9]+/", "", $relation);

					$records = $records->with($relation);
				}
            }
		}

		return $records->find($id);
	}
}
