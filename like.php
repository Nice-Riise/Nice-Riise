<?php

// Connect to the MySQL database
$conn = mysqli_connect("6928fe13dc83", "jonasriise", "jonas0253", "NR");

// Check if the form has been submitted
if (isset($_POST['like'])) {
  // Update the like count in the database
  $sql = "UPDATE likes SET like_count = like_count + 1 WHERE id = 1";
  mysqli_query($conn, $sql);
} elseif (isset($_POST['dislike'])) {
  // Update the dislike count in the database
  $sql = "UPDATE likes SET dislike_count = dislike_count + 1 WHERE id = 1";
  mysqli_query($conn, $sql);
}

// Retrieve the current like and dislike counts from the database
$sql = "SELECT * FROM likes WHERE id = 1";
$result = mysqli_query($conn, $sql);
$like_dislike_counts = mysqli_fetch_assoc($result);
$like_count = $like_dislike_counts['like_count'];
$dislike_count = $like_dislike_counts['dislike_count'];

?>

<!-- Display the like and dislike buttons and counts -->
<form action="" method="post">
  <button type="submit" name="like">Like</button>
  <span><?php echo $like_count; ?></span>
  <button type="submit" name="dislike">Dislike</button>
  <span><?php echo $dislike_count; ?></span>
</form>