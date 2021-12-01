<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDeadlineFieldTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		if (Schema::hasTable("tasks")) {
			if (!Schema::hasColumn("tasks", "deadline")) {
				Schema::table("tasks", function (Blueprint $table) {
					$table->date("deadline")
						->default(now()->addWeek());
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
		    if (Schema::hasColumn("tasks", "deadline")) {
			    Schema::table("tasks", function (Blueprint $table) {
				    $table->dropColumn("deadline");
			    });
		    }
	    }
    }
}
