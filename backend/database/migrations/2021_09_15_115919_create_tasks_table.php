<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
			$table->bigInteger("status_id");
			$table->string("name");
			$table->boolean("is_closed")
				->default(false);

			$table->foreign("status_id", "fk_status_status_id")
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
        Schema::dropIfExists('tasks');
    }
}
