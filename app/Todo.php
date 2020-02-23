<?php

namespace App;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use SoftDeletes;

    protected $table = 'todo';
    protected $dates = ['deleted_at'];

    public function scopeUserTodo($query,$userId,$isAdmin=false)
    {
        if($isAdmin == false){
            return $query->where('user_id',$userId)->get()->toArray();
        }
    }
}
