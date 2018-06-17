<?php

use Slim\Http\Request;
use Slim\Http\Response;


// Routes

$app->get('/motorista/listar/[{id}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("SELECT * FROM tbl_driver WHERE id_driver = :id_driver");
    $sth->bindParam("id_driver", $args["id"]);
    $sth->execute();
    $todos = $sth->fetchAll();

    return $response->withJson($todos);
});

$app->get('/motorista/listar', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("SELECT * FROM tbl_driver");
    $sth->execute();
    $todos = $sth->fetchAll();

    return $response->withJson($todos);
});

$app->post('/motorista/editar/[{id}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $array = ["code" => 0, "message" => "Não foi possível atualizar os dados"];

    $param = $request->getParsedBody();

    $sth = $this->db->prepare("UPDATE tbl_driver SET name = :name, cpf = :cpf, birth = :birth, car = :car, status = :status, sex = :sex, email = :email, phone = :phone, car = :car, brand = :brand  WHERE id_driver = :id");
    $sth->bindParam("name", $param["name"]);
    $sth->bindParam("cpf", $param["cpf"]);
    $sth->bindParam("birth", $param["birth"]);
    $sth->bindParam("car", $param["car"]);
    $sth->bindParam("status", $param["status"]);
    $sth->bindParam("sex", $param["sex"]);
    $sth->bindParam("email", $param["email"]);
    $sth->bindParam("phone", $param["phone"]);
    $sth->bindParam("brand", $param["brand"]);
    $sth->bindParam("id", $args["id"]);
    if($sth->execute()) {
        $array = ["code" => "1", "message" => "Motorista atualizado com sucesso"];
    }

    return $response->withJson($array);


});

$app->post('/motorista/criar', function (Request $request, Response $response, array $args) {
    // Sample log message

    $array = ["code" => 0, "message" => "Não foi possível inserir os dados"];

    $param = $request->getParsedBody();

    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("INSERT tbl_driver (name,cpf,birth,car,status,sex,email,phone,brand) VALUES (:name,:cpf,:birth,:car,:status,:sex,:email,:phone,:brand)");

    $sth->bindParam("name", $param["name"]);
    $sth->bindParam("cpf", $param["cpf"]);
    $sth->bindParam("birth", $param["birth"]);
    $sth->bindParam("car", $param["car"]);
    $sth->bindParam("status", $param["status"]);
    $sth->bindParam("sex", $param["sex"]);
    $sth->bindParam("email", $param["email"]);
    $sth->bindParam("phone", $param["phone"]);
    $sth->bindParam("brand", $param["brand"]);
    if($sth->execute()) {
        $array = ["code" => "1", "message" => "Motorista criado com sucesso", "id_driver" => $this->db->lastInsertId()];
    }

    return $response->withJson($array);
});

$app->get('/passageiro/listar/[{id}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("SELECT * FROM tbl_passenger WHERE id_passenger = :id_passenger");
    $sth->bindParam("id_passenger", $args["id"]);
    $sth->execute();
    $todos = $sth->fetchAll();

    return $response->withJson($todos);
});

$app->get('/passageiro/listar', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("SELECT * FROM tbl_passenger");
    $sth->execute();
    $todos = $sth->fetchAll();

    return $response->withJson($todos);
});

$app->post('/passageiro/editar/[{id}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $array = ["code" => 0, "message" => "Não foi possível atualizar os dados"];

    $input = $request->getParsedBody();

    $sth = $this->db->prepare("UPDATE tbl_passenger SET name = :name, cpf = :cpf, birth = :birth, sex = :sex, email = :email, phone = :phone, id_payment = :payment WHERE id_passenger = :id");
    $sth->bindParam("name", $input["name"]);
    $sth->bindParam("cpf", $input["cpf"]);
    $sth->bindParam("birth", $input["birth"]);
    $sth->bindParam("sex", $input["sex"]);
    $sth->bindParam("email", $input["email"]);
    $sth->bindParam("phone", $input["phone"]);
    $sth->bindParam("payment", $input["payment"]);
    $sth->bindParam("id", $args['id']);
    if($sth->execute()) {
        $array = ["code" => "1", "message" => "Passageiro atualizado com sucesso", "id_driver" => $args];
    }

    return $response->withJson($array);


});

$app->post('/passageiro/criar', function (Request $request, Response $response, array $args) {
    // Sample log message

    $array = ["code" => 0, "message" => "Não foi possível inserir os dados"];

    $param = $request->getParsedBody();

    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("INSERT tbl_passenger (name,cpf,birth,sex,phone,email,id_payment) VALUES (:name,:cpf,:birth,:sex,:phone,:email,:payment)");

    $sth->bindParam("name", $param["name"]);
    $sth->bindParam("cpf", $param["cpf"]);
    $sth->bindParam("birth", $param["birth"]);
    $sth->bindParam("sex", $param["sex"]);
    $sth->bindParam("phone", $param["phone"]);
    $sth->bindParam("email", $param["email"]);
    $sth->bindParam("payment", $param["payment"]);

    if($sth->execute()) {
        $array = ["code" => "1", "message" => "Passageiro criado com sucesso", "id_passenger" => $this->db->lastInsertId()];
    }

    return $response->withJson($array);
});

$app->get('/corrida/listar/[{id}]', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("SELECT r.id_race, r.price, d.name AS driver, p.name AS passenger, r.departure, r.destination, m.payment AS payment, d.id_driver AS id_driver, p.id_passenger AS id_passenger  FROM tbl_races AS r LEFT JOIN tbl_passenger AS p ON r.id_passenger = p.id_passenger LEFT JOIN tbl_driver AS d ON r.id_driver = d.id_driver LEFT JOIN tbl_payment_methods AS m ON r.id_payment = m.id_payment WHERE r.id_race = :race");
    $sth->bindParam("race", $args["id"]);
    $sth->execute();
    $todos = $sth->fetchAll();

    return $response->withJson($todos);
});

$app->get('/corrida/listar', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("SELECT r.id_race, r.price, d.name AS driver, p.name AS passenger, r.departure, r.destination, m.payment AS payment, d.id_driver AS id_driver, p.id_passenger AS id_passenger  FROM tbl_races AS r LEFT JOIN tbl_passenger AS p ON r.id_passenger = p.id_passenger LEFT JOIN tbl_driver AS d ON r.id_driver = d.id_driver LEFT JOIN tbl_payment_methods AS m ON r.id_payment = m.id_payment ");
    $sth->execute();
    $todos = $sth->fetchAll();

    return $response->withJson($todos);
});

$app->post('/corrida/criar', function (Request $request, Response $response, array $args) {
    // Sample log message

    $array = ["code" => 0, "message" => "Não foi possível inserir os dados"];

    $param = $request->getParsedBody();

    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("INSERT tbl_races (id_driver,id_passenger,departure,destination,price) VALUES (:driver,:passenger,:from,:to,:price)");

    $sth->bindParam("driver", $param["id_driver"]);
    $sth->bindParam("passenger", $param["id_passenger"]);
    $sth->bindParam("from", $param["departure"]);
    $sth->bindParam("to", $param["destination"]);
    $sth->bindParam("price", $param["price"]);


    if($sth->execute()) {
        $array = ["code" => "1", "message" => "Passageiro criado com sucesso", "id_race" => $this->db->lastInsertId()];
    }

    return $response->withJson($array);
});

$app->get('/pagamentos/listar', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $sth = $this->db->prepare("SELECT * FROM tbl_payment_methods");
    $sth->execute();
    $todos = $sth->fetchAll();

    return $response->withJson($todos);
});

$app->post('/login', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    $array = ['logged' => '0'];

    $input = $request->getParsedBody();

    $sth = $this->db->prepare("SELECT * FROM tbl_users WHERE email = :email AND password = SHA(:pass)");
    $sth->bindParam('email', $input['email']);
    $sth->bindParam('pass', $input['password']);
    $sth->execute();
    $row = $sth->fetch(PDO::FETCH_ASSOC);
    if($row){


        $array = ['logged' => '1'];


    }

    return $response->withJson($array);
});

