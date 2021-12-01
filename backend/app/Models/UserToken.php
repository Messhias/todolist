<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class UserToken extends Model
{
	use HasFactory;

	/**
	 * @var string[]
	 */
	protected $fillable = [
		"user_id",
		"token",
		"active",
		"expiration_date",
	];

	/**
	 * @return HasOne
	 */
	public function user(): HasOne
	{
		return $this->hasOne(User::class, "id", "user_id");
	}
}
