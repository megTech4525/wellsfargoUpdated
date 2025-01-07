<?php
$host = 'localhost';
$db = 'wellsfargo';
$user = 'root';
$pass = '';

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Handle Registration
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['fullName'])) {
    $fullName = htmlspecialchars(trim($_POST['fullName']));
    $email = htmlspecialchars(trim($_POST['email']));
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];
    $phoneNumber = htmlspecialchars(trim($_POST['phoneNumber']));
    $address = htmlspecialchars(trim($_POST['address']));
    $postalCode = htmlspecialchars(trim($_POST['postalCode']));
    $occupation = htmlspecialchars(trim($_POST['occupation']));

    // Validate password match
    if ($password !== $confirmPassword) {
        die('Passwords do not match.');
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Prepare and execute the query
    $stmt = $conn->prepare("INSERT INTO users (full_name, email, password, phone_number, address, postal_code, occupation) VALUES (?, ?, ?, ?, ?, ?, ?)");
    if ($stmt) {
        $stmt->bind_param("sssssss", $fullName, $email, $hashedPassword, $phoneNumber, $address, $postalCode, $occupation);

        if ($stmt->execute()) {
            echo 'Registration successful!';
        } else {
            echo 'Error: ' . $stmt->error;
        }
        $stmt->close();
    } else {
        echo 'Error preparing the statement: ' . $conn->error;
    }
}

// Handle Login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['loginEmail'])) {
    $email = htmlspecialchars(trim($_POST['loginEmail']));
    $password = $_POST['loginPassword'];

    $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
    if ($stmt) {
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($hashedPassword);
        $stmt->fetch();

        if ($hashedPassword && password_verify($password, $hashedPassword)) {
            echo 'Login successful!';
        } else {
            echo 'Invalid email or password.';
        }
        $stmt->close();
    } else {
        echo 'Error preparing the statement: ' . $conn->error;
    }
}

$conn->close();
