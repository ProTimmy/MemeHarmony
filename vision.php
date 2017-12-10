<?php
    $auth_key = "AIzaSyA5eT5cmEVop6msDBtveV6g0t4HyVRIGbM";
    $request = $_POST["resource"];
	$request = json_decode($request);

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, "https://vision.googleapis.com/v1/images:annotate?key=" . $auth_key);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json", "Content-Length: " . strlen($request)));
	curl_setopt($curl, CURLOPT_POST, true);
	curl_setopt($curl, CURLOPT_POSTFIELDS, $request);

	$response = curl_exec($curl);
	$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	curl_close($curl);

	// if ($status != 200) {
	//     die("Error: curl failed");
	// }

	echo $response;
?>
