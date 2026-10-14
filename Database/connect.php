<?php
$Connect = mysqli_connect('localhost', 'root', '', 'fproject');

/* if ($Connect) {
    echo 'تم الاتصال بقاعدة البيانات';
} else {
    echo 'فشل الاتصال';
} */
if (!$Connect) {
    echo 'فشل الاتصال'  . mysqli_connect_error();
}