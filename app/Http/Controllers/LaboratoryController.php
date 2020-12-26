<?php

namespace App\Http\Controllers;

use App\Http\Requests\LaboratoryRequest;
use App\Models\Laboratory;

class LaboratoryController extends Controller
{
    public function index()
    {
        return Laboratory::query()
            ->where('name', 'like', '%'. request('search') .'%')
            ->orWhere('description', 'like', '%'. request('search').'%')
            ->orderBy(request('sort_by'), request('sort_order'))
            ->paginate(10);
    }

    public function destroy(Laboratory $laboratory)
    {
        $laboratory->delete();
        return response()->json(['status' => 'ok' ]);
    }

    public function store(LaboratoryRequest $request)
    {
        return Laboratory::query()->updateOrCreate(['id' => $request->id], $request->validated());
    }
}
