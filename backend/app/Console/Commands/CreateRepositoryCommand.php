<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;

class CreateRepositoryCommand extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new repository.';

	protected function getStub(): string
	{
		return app_path() . "/Console/Stubs/api-repository.stub";
	}

	protected function getDefaultNamespace($rootNamespace): string
	{
		return $rootNamespace . "\Repositories";
	}
}
