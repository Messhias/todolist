<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use App\Models\Workspace;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 *
	 * @return void
	 */
	public function run()
	{
		$this->call([
			CreateStatusesSeeder::class,
		]);

		Workspace::factory(1)->create([
			"name" => "Work",
			"active" => true,
		]);
		Task::factory()->count(10)->create();
		User::factory(5)->create();
	}
}
