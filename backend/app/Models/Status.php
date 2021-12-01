<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Base
{
	protected $table = "status";

	protected $fillable = [
		"name",
	];

	/**
	 * @return HasMany
	 */
	public function tasks(): HasMany
	{
		return $this->hasMany(Task::class, "status_id");
	}
}
