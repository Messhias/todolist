<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDescriptionFieldTasksTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		if (Schema::hasTable("tasks")) {
			if (!Schema::hasColumn("tasks", "description")) {
				Schema::table("tasks", function (Blueprint $table) {
					$table->text("description")->nullable();
				});
			}
		}
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		if (Schema::hasTable("tasks")) {
			if (Schema::hasColumn("tasks", "description")) {
				Schema::table("tasks", function (Blueprint $table) {
					$table->dropColumn("description");
				});
			}
		}
	}
}
