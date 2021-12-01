<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_tokens', function (Blueprint $table) {
            $table->id();
			$table->bigInteger("user_id");

			$table->text("token");
			$table->dateTime("expiration_date");
			$table->boolean("active")
				->default(true);

			$table->foreign("user_id", "fk_users_user_id")
				->references("id")
				->on("users")
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
        Schema::dropIfExists('user_tokens');
    }
}
