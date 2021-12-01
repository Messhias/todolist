<?php

namespace App\Http\Controllers\API;

use App\Models\Status;
use App\Models\Workspace\User;
use App\Repositories\TaskRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TasksController extends AbstractAPIController
{
	/**
	 * @param TaskRepository $repository
	 */
	public function __construct(
		protected TaskRepository $repository
	)
	{
		parent::__construct();
		$this->repository->setValidators([
			"status_id" => [
				"integer",
			],
			"deadline" => [
				"date",
			]
		]);
	}

	/**
	 * @param Request $request
	 * @return array|Collection
	 */
	public function get(Request $request): array|Collection
	{
		$workspaceIds = User::where([
			'user_id' => $this->loggedUser?->id
		])
			?->get("workspace_id")
			?->pluck("workspace_id");

		if (count($workspaceIds) > 0) {
			return Status::with(['tasks' => function ($query) use ($workspaceIds) {
				$query->with(['workspace_task' => function ($q) use ($workspaceIds) {
					$q->whereIn('workspace_id', $workspaceIds);
				}]);
			}])->get();
		}

		return [];
	}

	final public function history($id): JsonResponse
	{
        return $this->defaultJSONResponse($this->repository, $this->repository->history($id));
    }
}
