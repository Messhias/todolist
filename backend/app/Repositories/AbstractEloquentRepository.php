<?php

namespace App\Repositories;

use App\Events\TestEvent;
use Exception;
use Illuminate\Container\Container as App;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

/**
 *
 */
abstract class AbstractEloquentRepository
{
	/**
	 * @var Model
	 */
	protected Model $model;

	/**
	 * @var int
	 */
	private static int $responseCode = 200;

	/**
	 * @throws Exception
	 */
	public function __construct(
		protected App $app
	)
	{
		$this->makeModel();
	}

	/**
	 * @var array
	 */
	private array $validators = [];

	/**
	 * @return mixed
	 */
	abstract protected function model();

	/**
	 * @return array
	 */
	public function getValidators(): array
	{
		return $this->validators;
	}

	/**
	 * @param array $validators
	 */
	public function setValidators(array $validators): void
	{
		$this->validators = $validators;
	}

	/**
	 * @param array $data
	 * @param array $validators
	 * @return bool|array
	 */
	public function runValidators(array $data, array $validators): bool|array
	{
		$validation = Validator::make($data, $validators);

		if ($validation->fails()) {
			return [
				"error"=> true,
				"errors" => $validation->errors(),
			];
		}

		return true;
	}

	/**
	 * @param array $data
	 * @return Builder[]|Collection
	 * @throws Exception
	 */
	public function get(array $data = []): Collection|array
	{
		$records = $this->model;

		if (count($data) > 0) {
			$records = $records->with($data);
		}

		return $records->get();
	}

	/**
	 * @param $id
	 * @return mixed
	 */
	public function delete($id)
	{
		if (empty($id)) {
			self::setResponseCode(400);
		}
		$data =  $this->model->where('id', $id)->delete();

		if ($data) {
			event(new TestEvent('hello world'));
		}

		return $data;
	}

	/**
	 * @param $id
	 * @param array $data
	 * @return mixed
	 */
	public function update($id, array $data)
	{
		if (empty($id)) {
			self::setResponseCode(400);
		}


		if (count($this->getValidators()) > 0) {
			$validation = $this->runValidators($data, $this->getValidators());


			if (is_array($validation) && array_key_exists("error", $validation)) {
				self::setResponseCode(400);
				return $validation['errors'];
			}
		}

		$data = $this->model->where('id', $id)
			->update($data);

		if ($data) {
			event(new TestEvent('hello world'));
		}

		return $data;
	}

	/**
	 * @param array $data
	 * @return mixed
	 */
	public function create(array $data)
	{
		self::setResponseCode(201);

		if (empty($data)) {
			self::setResponseCode(400);
		}

		if (count($this->getValidators()) > 0) {
			$validation = $this->runValidators($data, $this->getValidators());

			if (is_array($validation) && array_key_exists("error", $validation)) {
				self::setResponseCode(400);
				return $validation['errors'];
			}
		}

		$data = $this->model->create($data);


		if ($data) {
			event(new TestEvent('hello world'));
		}

		return $data;
	}

	/**
	 * @param $id
	 * @param array $relations
	 * @return mixed
	 */
	public function find($id, array $relations = []): mixed
	{
		if (!$id) {
			self::setResponseCode(400);

			return false;
		}

		$records = $this->model;

		if (count($relations) > 0) {
			$records = $records->with($relations);
		}

		return $records->find($id);
	}

	/**
	 * @return Model
	 */
	public function getModel(): Model
	{
		return $this->model;
	}

	/**
	 * @param int $code
	 */
	public static function setResponseCode(int $code = 200)
	{
		self::$responseCode = $code;
	}

	/**
	 * @return int
	 */
	public static function getResponseCode(): int
	{
		return self::$responseCode;
	}

	/**
	 * @throws BindingResolutionException
	 */
	private function makeModel(): void
	{
		$model = $this->app->make($this->model());

		if (!$model instanceof Model) {
			throw new Exception("Class {$this->model()} must bem a instance of Model");
		}

		$this->model = $model;
	}
}
