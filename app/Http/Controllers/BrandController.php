<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrandRequest;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Brand::query()
        ->where('name', 'like', '%'. request('search') .'%')
        ->orWhere('description', 'like', '%'. request('search').'%')
        ->orderBy(request('sort_by'), request('sort_order'))
        ->paginate(10);
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response()->json(['status' => 'ok' ]);
    }

    public function store(BrandRequest $request)
    {
        return Brand::query()->updateOrCreate(['id' => $request->id], $request->validated());
    }
}
