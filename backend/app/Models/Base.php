<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

abstract class Base extends Model
{
	use HasFactory;

	/**
	 * @var string[]
	 */
	protected $appends = [
		"formatted_created_date",
	];

	/**
	 * @return string
	 */
	public function getFormattedCreatedDateAttribute(): string
	{
		return Carbon::parse($this->created_at)->format("Y-m-d H:m:s");
	}
}
