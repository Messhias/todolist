<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkspaceUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workspace_users', function (Blueprint $table) {
            $table->id();
	        $table->bigInteger("workspace_id");
	        $table->bigInteger("user_id");
			$table->boolean("owner")
				->default(false);

	        $table->foreign("user_id", "fk_users_user_id")
		        ->references("id")
		        ->on("users")
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
        Schema::dropIfExists('workspace_users');
    }
}
