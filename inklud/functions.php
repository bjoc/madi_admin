<?php
include_once 'config.php';
/*
function sec_session_start() {
    $session_name = 'szekure_szesson';   // Set a custom session name
    $secure = SECURE;
    // This stops JavaScript being able to access the session id.
    $httponly = true;
    // Forces sessions to only use cookies.
    if (ini_set('session.use_only_cookies', 1) === FALSE) {
        header("Location: ../error.php?err=Could not initiate a safe session (ini_set)");
        exit();
    }
    // Gets current cookies params.
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params($cookieParams["lifetime"],
        $cookieParams["path"],
        $cookieParams["domain"],
        $secure,
        $httponly);
    // Sets the session name to the one set above.
    session_name($session_name);
    session_start();            // Start the PHP session
    session_regenerate_id(true);    // regenerated the session, delete the old one.
}
*/
function login($email, $password, $mysqli)
{
    if ($stmt = $mysqli->prepare("SELECT id, Client_Username, Client_Password, Client_Salt
        FROM Client
       WHERE Client_Username = ?
        LIMIT 1"))
    {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($user_id, $username, $db_password, $salt);
        $stmt->fetch();
        /*         $password = hash('sha512', $password . $salt); */
        if ($stmt->num_rows == 1)
        {
            if (checkbrute($user_id, $mysqli) == true)
            {
                return 3; // too many failed logins

            }
            else
            {
                if ($db_password == $password)
                {
                    $user_browser = $_SERVER['HTTP_USER_AGENT'];
                    // XSS protection as we might print this value
                    $user_id = preg_replace("/[^0-9]+/", "", $user_id);
                    $_SESSION['user_id'] = $user_id;
                    // XSS protection as we might print this value
                    $username = preg_replace("/[^a-zA-Z0-9_\-]+/", "", $username);
                    $_SESSION['username'] = $username;
                    $_SESSION['db'] = $_POST['db'];
                    $_SESSION['login_string'] = hash('sha512', $password . $user_browser);
                    // Login successful.
                    return $user_id + 1000;
                }
                else
                {
                    $now = time();
                    $mysqli->query("INSERT INTO login_attempts(user_id, time)
                                    VALUES ('$user_id', '$now')");
                    return 2; // wrong password

                }
            }
        }
        else
        {
            return 1; // no such user

        }
    }
}
function checkbrute($user_id, $mysqli)
{
    // Get timestamp of current time
    $now = time();
    // All login attempts are counted from the past 1 hours.
    $valid_attempts = $now - (60 * 60);
    if ($stmt = $mysqli->prepare("SELECT time
                             FROM login_attempts
                             WHERE user_id = ?
                            AND time > '$valid_attempts'"))
    {
        $stmt->bind_param('i', $user_id);
        // Execute the prepared query.
        $stmt->execute();
        $stmt->store_result();
        // If there have been more than 5 failed logins
        if ($stmt->num_rows > 5)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
function login_check($mysqli)
{
    if (isset($_SESSION['user_id'], $_SESSION['username'], $_SESSION['login_string']))
    {
        $user_id = $_SESSION['user_id'];
        $login_string = $_SESSION['login_string'];
        $username = $_SESSION['username'];
        $user_browser = $_SERVER['HTTP_USER_AGENT'];
        if ($stmt = $mysqli->prepare("SELECT Client_Password
                                      FROM Client
                                      WHERE id = ? LIMIT 1"))
        {
            $stmt->bind_param('i', $user_id);
            $stmt->execute();
            $stmt->store_result();
            if ($stmt->num_rows == 1)
            {
                $stmt->bind_result($password);
                $stmt->fetch();
                $login_check = hash('sha512', $password . $user_browser);
                if ($login_check == $login_string)
                {
                    // Logged In!!!!
                    return $user_id;
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                return 0;
            }
        }
        else
        {
            return 0;
        }
    }
    else
    {
        return 0;
    }
}
function esc_url($url)
{
    if ('' == $url)
    {
        return $url;
    }
    $url = preg_replace('|[^a-z0-9-~+_.?#=!&;,/:%@$\|*\'()\\x80-\\xff]|i', '', $url);
    $strip = array(
        '%0d',
        '%0a',
        '%0D',
        '%0A'
    );
    $url = (string)$url;
    $count = 1;
    while ($count)
    {
        $url = str_replace($strip, '', $url, $count);
    }
    $url = str_replace(';//', '://', $url);
    $url = htmlentities($url);
    $url = str_replace('&amp;', '&#038;', $url);
    $url = str_replace("'", '&#039;', $url);
    if ($url[0] !== '/')
    {
        // We're only interested in relative links from $_SERVER['PHP_SELF']
        return '';
    }
    else
    {
        return $url;
    }
}
