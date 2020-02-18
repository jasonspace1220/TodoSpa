<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>TodoSpa</title>


</head>

<body>
        {{-- <div id="app"></div> --}}
        <v-app id="app"></v-app>
        {{-- <v-app></v-app> --}}
    {{-- <script src="{{ asset(mix('/static/js/app.js')) }}"></script> --}}
    <script src="{{ asset('/static/js/app.js') }}"></script>

</body>

</html>
