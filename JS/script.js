
document.addEventListener("DOMContentLoaded", function () {

    const countdown = document.getElementById("countdown");
    const chooseButton = document.getElementById("choose");

    if (!countdown || !chooseButton) {
        console.error("تعذر العثور على العداد أو زر اختيار الفائز.");
        return;
    }

    // موعد انتهاء السحب
    const countDownDate = new Date("2026-09-13T12:30:25+03:00").getTime();

    let timer = null;

    function updateCountdown() {

        const now = Date.now();
        const distance = countDownDate - now;

        // إذا انتهى الوقت
        if (distance <= 0) {
            clearInterval(timer);

            countdown.textContent = "انتهى الوقت";
            chooseButton.hidden = false;

            return;
        }

        // حساب الأيام والساعات والدقائق والثواني
        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) / 1000
        );

        countdown.textContent =
            `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`;

        chooseButton.hidden = true;
    }

    // تشغيل العداد مباشرة
    updateCountdown();

    // تحديثه كل ثانية ما دام الوقت باقيًا
    if (Date.now() < countDownDate) {
        timer = setInterval(updateCountdown, 1000);
    }

});

