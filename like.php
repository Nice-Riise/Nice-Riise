// Connect to the MySQL database

$host = 'jonasriise'; // Replace with the hostname of your MySQL server
$user = 'root'; // Replace with the username for your MySQL user
$password = 'jonas0253'; // Replace with the password for your MySQL user
$database = 'NR'; // Replace with the name of your MySQL database

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    // Connection failed, handle the error
}

// Update the like count in the database
$like_count = 10; // Replace with the current like count
$sql = "UPDATE likes SET likes = $like_count WHERE id = 1"; // Replace with the appropriate table and column names
$result = mysqli_query($conn, $sql);

if (!$result) {
    // Query failed, handle the error
}

echo json_encode(['count' => $like_count]); // Return the updated like count as JSON