<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Get WordPress Version</title>
    <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Montserrat|Passion+One" rel="stylesheet">
    <style>
        * {box-sizing: border-box;}
        body {background: #c7c6c4;color: #008e8f;font-family: 'Montserrat', sans-serif;margin: 0;}
        h1   {font-family: 'Passion One', serif;}
        input { width: 90%; height: 50px; padding: 10px 7px; font-size: 22px; border: 3px solid #008e8f; color: #008e8f; }
        .wrap { background: #fff;max-width: 500px;min-height: 100vh;margin: 0 auto;text-align: center;padding: 25vh 0 0; }
        .wrap h1 { font-size: 40px;display: inline-block;}
        .fa, #result { display: block; margin: 30px; font-size: 30px; }
        </style>
</head>
<body>
    <div class="wrap">
        <h1>Get WordPress Version by URL</h1>
        <input type="url" name="url" ic-post-to="/ajax.php" ic-trigger-on="keyup changed" ic-target="#result" ic-trigger-delay="700ms" placeholder="Enter Wordpress URL" ic-indicator="#loading">
        <i id="loading" class="fa fa-spinner fa-spin" style="display:none"></i>
        <div id="result"></div>
    </div>

    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/intercooler-js/1.0.3/intercooler.min.js"></script>
</body>
</html>