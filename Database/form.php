<?php
$Errors = [
    'FirstNameError' => '',
    'LastNameError'=> '',
    'EmailError'=> '',
];
$FirstName = '';
$LastName = '';
$Email = '';
if (isset($_POST['submit'])) {

    $FirstName = $_POST['FirstName'];
    $LastName = $_POST['LastName'];
    $Email = $_POST['Email'];
    
    
    

    // echo $FirstName . ' x ' . $LastName . ' x ' . $Email;
   
        if(empty($FirstName)) {
            $Errors ['FirstNameError'] = 'يرجى ادخال الإسم الأول   ';
            
        }
         if (empty($LastName)) {
             $Errors ['LastNameError'] = 'يرجى ادخال الإسم الأخير  ';
        }
           if (empty($Email)) {
            $Errors ['EmailError'] = 'يرجى ادخال البريد الإلكتروني  ';
        }
        else if (!filter_var($Email,FILTER_VALIDATE_EMAIL)){
           $Errors ['EmailError'] = 'يرجى ادخال البريد الإلكتروني بشكل صحيح';
        }
                if(!array_filter($Errors)){
              $FirstName = mysqli_real_escape_string($Connect, $_POST['FirstName']);
              $LastName = mysqli_real_escape_string($Connect, $_POST['LastName']);
              $Email = mysqli_real_escape_string($Connect, $_POST['Email']);

              $sql = "INSERT INTO users(FirstName, LastName, Email)
              VALUES ('$FirstName', '$LastName', '$Email')";

              if(mysqli_query($Connect, $sql)){
              header('Location: ' . $_SERVER['PHP_SELF']);
                    exit;
              }
              else{
                  echo 'فشل الارسال';
              }
}
          
     
      
}