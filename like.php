// Connect to MySQL database
$conn = mysqli_connect("localhost", "root", "jonas0253", "NR");

// Check if "like" request was sent
if (isset($_GET["like"])) {
  // Increment like count in database
  $query = "UPDATE likes SET count = count + 1";
  mysqli_query($conn, $query);
}

// Retrieve like count from database
$query = "SELECT count FROM likes";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
$count = $row["count"];

// Return like count in response
echo json_encode(array("count" => $count));