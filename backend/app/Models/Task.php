<?php

namespace App\Models;

use App\Models\Task\StatusHistory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Task extends Base
{
	use HasFactory;

	/**
	 * @var string[]
	 */
	protected $fillable = [
		"status_id",
		"name",
		"is_closed",
		"deadline",
		"description",
	];

	/**
	 * @return HasOne
	 */
	public function status(): HasOne
	{
		return $this->hasOne(Status::class, "id", "status_id");
	}

	public function workspace_task(): HasOne
	{
		return $this->hasOne(Workspace\Task::class, "task_id");
	}

	public function status_history(): HasMany
	{
		return $this->hasMany(StatusHistory::class, "task_id");
	}
}
