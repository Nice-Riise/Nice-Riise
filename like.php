<?php

// Connect to the MySQL database
$conn = mysqli_connect("6928fe13dc83", "jonasriise", "jonas0253", "NR");

// Retrieve the like and dislike counts from the LikeBtn server
$api_key = 'a5f744a58e450ab8f15fc8122265dce0';
$item_id = 'your_item_id';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.likebtn.com/api/v2/item/get");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_POSTFIELDS, "api_key=$api_key&item_id=$item_id");
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
$like_count = $data['result']['like_count'];
$dislike_count = $data['result']['dislike_count'];

// Update the like and dislike counts in the database
$sql = "UPDATE likes SET like_count = $like_count, dislike_count = $dislike_count WHERE id = 1";
mysqli_query($conn, $sql);
