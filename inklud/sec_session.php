<?php
function sec_session_start() {
    $session_name = 'secure_tourist_admin';
    $secure = false;
    $httponly = true;

    if (ini_set('session.use_only_cookies', 1) === FALSE) {
        header("Location: ../error.php?err=Could not initiate a safe session (ini_set)");
        exit();
    }
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params($cookieParams["lifetime"],
        $cookieParams["path"],
        $cookieParams["domain"],
        $secure,
        $httponly);
    session_name($session_name);
//	session_save_path('/home/users/web/b957/ipg.devtopcom/cgi-bin/tmp');
    session_start();
    session_regenerate_id(TRUE);
}
