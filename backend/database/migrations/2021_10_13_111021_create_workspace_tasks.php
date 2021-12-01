<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkspaceTasks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workspace_tasks', function (Blueprint $table) {
            $table->id();
			$table->bigInteger("workspace_id");
			$table->bigInteger("task_id");

			$table->foreign("task_id", "fk_tasks_task_id")
				->references("id")
				->on("tasks")
				->onDelete("CASCADE")
				->onUpdate("CASCADE");

			$table->foreign("workspace_id", "fk_workspaces_workspace_id")
				->references("id")
				->on("workspaces")
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
        Schema::dropIfExists('workspace_tasks');
    }
}
