<?php
if(isset($_POST['submit'])){
    $to = "swildrick@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['fname'];

    $subject = "stephenwildrick.com - Contact";
    $message = $name . "\n\n" . $from . "\n\n" . $_POST['message'];
    $headers = "From:" . $from . "\r\n" .

    mail($to,$subject,$message,$headers);

    header("Location:/thanks.htm");
    exit;

    }
?>