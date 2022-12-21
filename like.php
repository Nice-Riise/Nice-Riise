<?php

// Connect to the MySQL database
$conn = mysqli_connect("6928fe13dc83", "jonasriise", "jonas0253", "NR");

// Check if the form has been submitted
if (isset($_POST['like'])) {
  // Update the like count in the database
  $sql = "UPDATE likes SET like_count = like_count + 1 WHERE id = 1";
  mysqli_query($conn, $sql);
  $like_count = mysqli_affected_rows($conn);
  echo json_encode(array('count' => $like_count));
} elseif (isset($_POST['dislike'])) {
  // Update the dislike count in the database
  $sql = "UPDATE likes SET dislike_count = dislike_count + 1 WHERE id = 1";
  mysqli_query($conn, $sql);
  $dislike_count = mysqli_affected_rows($conn);
  echo json_encode(array('count' => $dislike_count));
} else {
  // Retrieve the current like and dislike counts from the database
  $sql = "SELECT * FROM likes WHERE id = 1";
  $result = mysqli_query($conn, $sql);
  $like_dislike_counts = mysqli_fetch_assoc($result);
  $like_count = $like_dislike_counts['like_count'];
  $dislike_count = $like_dislike_counts['dislike_count'];

  // Return the current like and dislike counts as JSON
  echo json_encode(array(
    'like_count' => $like_count,
    'dislike_count' => $dislike_count
  ));
}

?>
