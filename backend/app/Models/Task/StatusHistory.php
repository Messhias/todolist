<?php

namespace App\Models\Task;

use App\Models\Status;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class StatusHistory extends Model
{
    use HasFactory;

	/**
	 * @var string
	 */
	protected $table = "task_status_history";

	/**
	 * @var string[]
	 */
	protected $fillable = [
		"status_id",
		"task_id",
	];

	/**
	 * @return HasOne
	 */
	public function status(): HasOne
	{
		return $this->hasOne(Status::class, "id", "status_id");
	}

	/**
	 * @return HasOne
	 */
	public function task(): HasOne
	{
        return $this->hasOne(Task::class, "id", "task_id");
    }
}
