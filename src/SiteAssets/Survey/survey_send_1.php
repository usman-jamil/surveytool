<!DOCTYPE html>
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if IE 9 ]><html class="ie ie9" lang="en"> <![endif]-->
<html lang="en">
<!--<![endif]-->
<head>

<!-- Basic Page Needs -->
<meta charset="utf-8">
<title>Survey Responsive Template</title>
<meta name="description" content="">
<meta name="author" content="Ansonika">

<!-- Favicons-->
<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon"/>
<link rel="apple-touch-icon" type="image/x-icon" href="img/apple-touch-icon-57x57-precomposed.png">
<link rel="apple-touch-icon" type="image/x-icon" sizes="72x72" href="img/apple-touch-icon-72x72-precomposed.png">
<link rel="apple-touch-icon" type="image/x-icon" sizes="114x114" href="img/apple-touch-icon-114x114-precomposed.png">
<link rel="apple-touch-icon" type="image/x-icon" sizes="144x144" href="img/apple-touch-icon-144x144-precomposed.png">

<!-- Mobile Specific Metas -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- CSS -->
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">

<!-- Google web font -->
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800,300' rel='stylesheet' type='text/css'>

<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<!-- HTML5 and CSS3-in older browsers-->
<script src="js/modernizr.custom.17475.js"></script>

<!-- Support media queries for IE8 -->
<script src="js/respond.min.js"></script>

<!--[if IE 7]>
  <link rel="stylesheet" href="font-awesome/css/font-awesome-ie7.min.css">
<![endif]-->
<script type="text/javascript">
function delayedRedirect(){
    window.location = "index.html"
}
</script>

</head>
<body onLoad="setTimeout('delayedRedirect()', 5000)">
<?php
						$mail = $_POST['email'];

						/*$subject = "".$_POST['subject'];*/
						$to = "info@ansonika.com";		/* YOUR EMAIL HERE */
						$subject = "Survey from ANNOVA";
						$headers = "From: Survey from ANNOVA <noreply@yourdomain.com>";
						$message = "USER INFO\n";
						$message .= "\nName: " . $_POST['firstname'];
						$message .= "\nLast Name: " . $_POST['lastname'];
						$message .= "\nEmail: " . $_POST['email'];
						$message .= "\nCountry: " . $_POST['country'];
						$message .= "\nHow many children: " . $_POST['quantity'];
						$message .= "\nAge: " . $_POST['age'];
						$message .= "\nGender: " . $_POST['gender'];
						$message .= "\nTerms and conditions: " . $_POST['terms'] . "\n";
						$message .= "\nOverall satisfaction value: " . $_POST['rate'] . "\n";
						$message .= "\nHow did you heard about our company?\n" ;
						foreach($_POST['question_1'] as $value) 
							{ 
							$message .=   "- " .  trim(stripslashes($value)) . "\n"; 
							};
						$message .= "\nDo you think to suggest our company to a friend or parent?: " . $_POST['question_2'];
						$message .= "\nOptional message: " . $_POST['message_suggest_no'];
						//Receive Variable
						$sentOk = mail($to,$subject,$message,$headers);
						
						//Confirmation page
						$user = "$mail";
						$usersubject = "Thank You";
						$userheaders = "From: info@annova.com\n";
						/*$usermessage = "Thank you for your time. Your survey is successfully submitted.\n"; WITH OUT SUMMARY*/
						//Confirmation page WITH  SUMMARY
						$usermessage = "Thank you for your time. Your survey is successfully submitted.\n\nBELOW A SUMMARY\n\n$message"; 
						mail($user,$usersubject,$usermessage,$userheaders);
	
?>

<!-- END SEND MAIL SCRIPT -->   
<div class="container">
<div class="row">
        <div class=" col-md-12" style="text-align:center; padding-top:80px;">
         	<h1 style="color:#333">Thank you!</h1>
          <h3 style="color: #6C3">Form Successfully Submitted.</h3>
         <p>You will be redirect back in 5 seconds.</p>
        </div>
</div>
</div>
</body>
</html>