<?php

namespace Database\Factories;

use App\Models\Status;
use App\Models\Task;
use App\Models\Workspace;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
		$statusArray = [
			"OPEN",
			"IN PROGRESS",
			"CLOSED"
		];

		$currentStatus = $statusArray[rand(0, 2)];
		$percentageOfTrue = 0;

		if ($currentStatus == "CLOSED") {
			$percentageOfTrue = 100;
		}

        return [
            "name" => $this->faker->name(),
	        "status_id" => Status::where('name', $currentStatus)->first()->id,
	        "is_closed" => $this->faker->boolean($percentageOfTrue),
        ];
    }

	public function configure()
	{
		$data = parent::configure();

		return $data->afterCreating(function (Task $task) {
			Task\StatusHistory::create([
				"status_id" => $task->status_id,
				"task_id" => $task->id,
			]);

			\App\Models\Workspace\Task::create([
				"task_id" => $task->id,
				"workspace_id" => Workspace::where('name', "Work")->first()->id,
			]);
		});
	}
}
