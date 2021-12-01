<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CreateStatusesSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		DB::transaction(function () {
			$statues = [
				[
					"name" => "OPEN",
				],
				[
					"name" => "IN PROGRESS",
				],
				[
					"name" => "CLOSED",
				],
			];

			foreach ($statues as $status) {
				if (!Status::where($status)->first()) {
					Status::create($status);
				}
			}
		});
	}
}
