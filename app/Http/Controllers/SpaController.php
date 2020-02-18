<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SpaController extends Controller
{
    public function index()
    {
        return view('welcome');
    }
    public function staticResource(Request $req)
    {
        $file = public_path($req->any);

        return  response()->file($file);
    }
}
