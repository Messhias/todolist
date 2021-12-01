<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskStatusHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_status_history', function (Blueprint $table) {
            $table->id();
			$table->bigInteger("status_id");
			$table->bigInteger("task_id");

			$table->foreign("task_id", "fk_tasks_task_id")
				->on("tasks")
				->references('id')
				->onDelete("CASCADE")
				->onUpdate("CASCADE");

			$table->foreign("status_id")
				->on("status")
				->references("id")
				->onDelete("CASCADE")
				->onUpdate("CASCADE");

            $table->timestamps();
			$table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_status_history');
    }
}
