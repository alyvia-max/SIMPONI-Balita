<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

// Konfigurasi Database (Sesuaikan jika Anda menggunakan password di database)
$host = "localhost";
$db_name = "db_simponi";
$username = "root";
$password = "";

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $exception) {
    echo json_encode(["status" => "error", "message" => "Koneksi database gagal: " . $exception->getMessage()]);
    exit;
}

$action = $_GET['action'] ?? '';

// --- 1. MENARIK DATA DARI MYSQL KE JAVASCRIPT ---
if ($action === 'getData') {
    $children = $conn->query("SELECT * FROM children")->fetchAll(PDO::FETCH_ASSOC);
    $growth = $conn->query("SELECT * FROM growth")->fetchAll(PDO::FETCH_ASSOC);
    $immunizations = $conn->query("SELECT * FROM immunizations")->fetchAll(PDO::FETCH_ASSOC);
    $users = $conn->query("SELECT * FROM users")->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => [
            "children" => $children,
            "growth" => $growth,
            "immunizations" => $immunizations,
            "users" => $users
        ]
    ]);
    exit;
}

// --- 2. MENYIMPAN DATA BALITA, PERTUMBUHAN & IMUNISASI ---
if ($action === 'saveSync' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if(!$data) exit(json_encode(["status" => "error", "message" => "Format JSON tidak valid"]));

    try {
        $conn->beginTransaction();

        // Bersihkan tabel untuk melakukan replace menyeluruh (Sesuai mekanisme state JS Anda)
        $conn->exec("SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE growth; TRUNCATE TABLE immunizations; TRUNCATE TABLE children; SET FOREIGN_KEY_CHECKS = 1;");

        // Insert Children
        if (!empty($data['children'])) {
            $stmtC = $conn->prepare("INSERT INTO children (id, name, nik, birthDate, gender, posyandu, parent, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            foreach ($data['children'] as $c) {
                $stmtC->execute([$c['id'], $c['name'], $c['nik'], $c['birthDate'], $c['gender'], $c['posyandu'] ?? '', $c['parent'], $c['phone'], $c['address']]);
            }
        }

        // Insert Growth
        if (!empty($data['growth'])) {
            $stmtG = $conn->prepare("INSERT INTO growth (id, childId, visitDate, weight, height, head, lila) VALUES (?, ?, ?, ?, ?, ?, ?)");
            foreach ($data['growth'] as $g) {
                $stmtG->execute([$g['id'], $g['childId'], $g['visitDate'], $g['weight'], $g['height'], $g['head'] ?? 0, $g['lila'] ?? 0]);
            }
        }

        // Insert Immunizations
        if (!empty($data['immunizations'])) {
            $stmtI = $conn->prepare("INSERT INTO immunizations (id, childId, vaccineKey, date) VALUES (?, ?, ?, ?)");
            foreach ($data['immunizations'] as $i) {
                $stmtI->execute([$i['id'], $i['childId'], $i['vaccineKey'], $i['date']]);
            }
        }

        $conn->commit();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}

// --- 3. MENYIMPAN DATA USER (AKUN KADER) ---
if ($action === 'syncUsers' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if(!$data) exit;

    try {
        $conn->beginTransaction();
        $conn->exec("TRUNCATE TABLE users;");
        $stmtU = $conn->prepare("INSERT INTO users (id, fullName, username, password, posyandu, createdAt) VALUES (?, ?, ?, ?, ?, ?)");
        
        foreach ($data as $u) {
            $stmtU->execute([$u['id'], $u['fullName'], $u['username'], $u['password'], $u['posyandu'], $u['createdAt']]);
        }
        $conn->commit();
        echo json_encode(["status" => "success"]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
    exit;
}
?>