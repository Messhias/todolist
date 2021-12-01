<?php

namespace App\Models\Workspace;

use App\Models\Base;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Task extends Base
{
	use HasFactory;

	/**
	 * @var string
	 */
	protected $table = "workspace_tasks";

	/**
	 * @var string[]
	 */
	protected $fillable = [
		"workspace_id",
		"task_id",
	];

	/**
	 * @return HasMany
	 */
	public function tasks(): HasMany
	{
		return $this->hasMany(\App\Models\Task::class, "id", "task_id");
	}

	/**
	 * @return HasOne
	 */
	public function task(): HasOne
	{
		return $this->hasOne(\App\Models\Task::class, "id", "task_id");
	}
}
