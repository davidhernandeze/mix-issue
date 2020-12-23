<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained();
            $table->foreignId('laboratory_id')->constrained();
            $table->string('code', 10);
            $table->string('gpo', 10);
            $table->string('gen', 10);
            $table->string('esp', 10);
            $table->string('di', 10);
            $table->string('va', 10);
            $table->string('name')->nullable();
            $table->string('description');
            $table->string('indications')->nullable();
            $table->string('dose')->nullable();
            $table->double('quantity', 8,2)->default(0);
            $table->string('origin');
            $table->double('cost', 8,2)->default(0);
            $table->string('generalities');
            $table->string('risk_pregnancy', 5);
            $table->string('various_effects');
            $table->string('contraindications');
            $table->string('precautions');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
