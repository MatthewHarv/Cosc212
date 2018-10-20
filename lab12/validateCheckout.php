<!DOCTYPE html>

<?php
require_once("protect/validationFunctions.php");
/*
$name = $_POST['deliveryName'];
$email = $_POST['deliveryEmail'];
$address = $_POST['deliveryAddress1'];
$postCode = $_POST['deliveryPostcode'];
$city = $_POST['deliveryCity'];

echo $name;
*/

$scriptList = array(
    'jquery-3.2.1.min.js',
    'cookies.js'
);
include('protect/header.php'); ?>

<div id="main">
<?php
 $formOK = true;
 /*
echo $name;
*/

 if (!strlen(trim($_POST['deliveryName'])) > 0) {
	 	$formOK = false;
		echo "<p>Please Enter a name</p>";		
		}
		
		if(!isEmail($_POST['deliveryEmail'])){
			$formOK = false;
			echo "<p>Please Enter valid email</p>";
		} 
		 if (!strlen(trim($_POST['deliveryAddress1'])) > 0) {
	 	$formOK = false;
		echo "<p>Please Enter a address</p>";		
		}
		 if (!strlen(trim($_POST['deliveryCity'])) > 0) {
	 	$formOK = false;
		echo "<p>Please Enter a city</p>";		
		}
		
		 if (strlen(trim($_POST['deliveryPostcode'])) == 4&& isDigits($_POST['deliveryPostcode'])) {
		 } else{
		$formOK = false;
		echo "<p>Please Enter a four digit postcode</p>";		
		}
		
		 if (!checkCardNumber($_POST['cardType'], $_POST['cardNumber'])) {
			 $formOK = false;
		echo "<p>Please Enter a valid credit card number</p>";
		 } 
		 	if(!checkCardDate($_POST['cardMonth'], $_POST['cardYear'])){
			$formOK = false;
			echo "<p>Please enter a card date that is currently valid</p>";	
		} 
		
		 if (!checkCardVerification($_POST['cardType'], $_POST['cardValidation'])) {
			 $formOK = false;
		echo "<p>Please Enter a valid credit card varification number</p>";
		 }

if($formOK){
echo "<p>Thank you for your order!!!!</p>";

}	

?>
</div>
<?php include("protect/footer.php"); ?>
</body>
</html>