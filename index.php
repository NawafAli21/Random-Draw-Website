<?php
include './Database/connect.php';
include './Database/form.php';
include './Database/select.php';
?>

<?php include_once './parts/header.php'; ?>

<main class="page-container">

    <section class="hero-section">
        <h1 class="site-title">نواف علي الخثعمي</h1>
        <h2 class="section-subtitle">السحب العشوائي</h2>
        <div id="countdown" class="countdown"></div>
    </section>

    <section class="instructions">
        <h2>تعليمات المشاركة</h2>
        <ul class="instructions-list">
            <li>التسجيل متاح للجميع.</li>
            <li>يرجى إدخال بيانات صحيحة.</li>
            <li>يتم تسجيل البيانات في قاعدة البيانات.</li>
            <li>يتم اختيار فائز عشوائي واحد.</li>
            <li>تُعلن النتيجة بعد انتهاء العداد.</li>
        </ul>
    </section>

    <section class="form-section">
        <h2 class="form-title">سجّل مشاركتك</h2>

        <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">

            <div class="form-group">
                <label for="FirstName">الاسم الأول</label>
                <input
                    type="text"
                    name="FirstName"
                    id="FirstName"
                    class="form-input"
                    value="<?php echo htmlspecialchars($FirstName); ?>"
                >
                <div class="form-error">
                    <?php echo $Errors['FirstNameError']; ?>
                </div>
            </div>

            <div class="form-group">
                <label for="LastName">الاسم الأخير</label>
                <input
                    type="text"
                    name="LastName"
                    id="LastName"
                    class="form-input"
                    value="<?php echo htmlspecialchars($LastName); ?>"
                >
                <div class="form-error">
                    <?php echo $Errors['LastNameError']; ?>
                </div>
            </div>

            <div class="form-group">
                <label for="Email">البريد الإلكتروني</label>
                <input
                    type="email"
                    name="Email"
                    id="Email"
                    class="form-input"
                    value="<?php echo htmlspecialchars($Email); ?>"
                >
                <div class="form-error">
                    <?php echo $Errors['EmailError']; ?>
                </div>
            </div>

            <button type="submit" name="submit" class="primary-button">
                تسجيل المشاركة
            </button>

        </form>
    </section>

    <section class="draw-section">

        <div class="loader-con">
            <div id="loader">
                <canvas id="circularLoader" width="200" height="200"></canvas>
            </div>
        </div>

        <button
            type="button"
            id="choose"
            class="primary-button choose-button"
            hidden
        >
            اختيار الفائز
        </button>

    </section>

    <div
        class="modal-overlay"
        id="Modal"
        aria-labelledby="ModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="dialog" aria-modal="true">

            <div class="modal-header">
                <h2 id="ModalLabel">الفائز بالسحب</h2>

                <button
                    type="button"
                    class="modal-close"
                    id="closeModal"
                    aria-label="إغلاق"
                >&times;</button>
            </div>

            <div class="modal-body">

                <?php if (!empty($users)): ?>

                    <?php foreach ($users as $user): ?>
                        <h3 class="winner-name">
                            <?php
                            echo htmlspecialchars(
                                $user['FirstName'] . ' ' . $user['LastName']
                            );
                            ?>
                        </h3>
                    <?php endforeach; ?>

                <?php else: ?>

                    <p>لا يوجد مشاركون في قاعدة البيانات حتى الآن.</p>

                <?php endif; ?>

            </div>
        </div>
    </div>

</main>

<?php include_once './parts/footer.php'; ?>