<?php

namespace App\Models\Workspace;

use App\Models\Base;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Base
{
	use HasFactory;

	protected $table = "workspace_users";
}
