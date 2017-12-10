<?php

$subreddit = array("wholesomememes", "memes");
$response = array();
$last = json_decode($_GET["after"], true);

foreach($subreddit as $page) {
    $url = "https://www.reddit.com/r/" . $page . "/hot/.json?limit=10&after=" . $last[$page];
    $last["url"] = $url;

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $request = json_decode(curl_exec($curl), true);
    $response[] = $request;

    $last[$page] = $request['data']['after'];

    curl_close($curl);
}
$response[] = json_encode($last);

echo json_encode($response);

?>
