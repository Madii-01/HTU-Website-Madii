<?php
	session_start();
	$msgBox = '';

	if ($_SERVER['REQUEST_METHOD'] == 'POST'){

		require "connection_web.php";

		$sql = "SELECT * FROM employee WHERE email = :email AND password = :password";
        $email = $_POST["email"];
		$password = $_POST["pass"];	

		$statement = $pdo->prepare($sql);
		$statement->bindParam(':email', $email, PDO::PARAM_STR);
		$statement->bindParam(':password', $password, PDO::PARAM_STR);
		$statement->execute();
		$data = $statement->fetch();
		$pdo = null;

		if(!$data){
			$msgBox = "<div id='msg'>Invalid username and/or password</div>";
		}else{header("Location: emp.php");
            exit();}
        
	
	}

	
?>

<!DOCTYPE html>
<html>
	<head>
    <style>
        html,body {
	height: 100%;
}

body.my-login-page {
	background-color: #f7f9fb;
	font-size: 14px;
}

.my-login-page .brand {
	width: 90px;
	height: 90px;
	overflow: hidden;

	margin: 40px auto;
	position: relative;
	z-index: 1;
}

.my-login-page .brand ion-icon {
	width: 100%;
    font-size: 99px;
}

.my-login-page .card-wrapper {
	width: 400px;
}

.my-login-page .card {
	border-color: transparent;
	box-shadow: 0 4px 8px rgba(0,0,0,.05);
}

.my-login-page .card.fat {
	padding: 10px;
}

.my-login-page .card .card-title {
	margin-bottom: 30px;
}

.my-login-page .form-control {
	border-width: 2.3px;
}

.my-login-page .form-group label {
	width: 100%;
}

.my-login-page .btn.btn-block {
	padding: 12px 10px;
}



@media screen and (max-width: 425px) {
	.my-login-page .card-wrapper {
		width: 90%;
		margin: 0 auto;
	}
}

@media screen and (max-width: 320px) {
	.my-login-page .card.fat {
		padding: 0;
	}

	.my-login-page .card.fat .card-body {
		padding: 15px;
	}
}
    </style>
	</head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <body class="my-login-page">
	<section class="h-100">
		<div class="container h-100">
			<div class="row justify-content-md-center h-100">
				<div class="card-wrapper">
					<div class="brand">
                    <ion-icon name="person-circle-outline"></ion-icon>
					</div>
					<div class="card fat">
						<div class="card-body">
							<h4 class="card-title">Login</h4>
	<form action='index.php' method='post' id="login">
	
		<div class="form-group">
			<label for="email">E-Mail Address</label>
				<input id="email" type="email" class="form-control" name="email" value="" required autofocus>
        </div>

		
        
        <div class="form-group">
		    <label for="password">Password
					</label>
						<input id="password" type="password" class="form-control" name="pass" required data-eye>
        </div>
        <div class="form-group m-0">
			<button type="submit" class="btn btn-primary btn-block">
			    Login
				</button>
				</div>
		<?php echo $msgBox ?>
	</form>
    
				</div>
			</div>
		</div>
	</section>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script src="js/my-login.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>
</html>