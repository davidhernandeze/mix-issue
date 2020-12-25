<?php

namespace App\Http\Controllers;

use App\Models\Laboratory;
use Illuminate\Http\Request;

class LaboratoryController extends Controller
{
    public function index()
    {
        return Laboratory::query()
            ->where('name', 'like', '%'. request('search') .'%')
            ->where('description', 'like', '%'. request('search').'%')
            ->orderBy(request('sort_by'), request('sort_order'))
            ->paginate(10);
    }
}
