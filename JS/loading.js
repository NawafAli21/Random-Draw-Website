
document.addEventListener("DOMContentLoaded", function () {

    const chooseButton = document.getElementById("choose");
    const modal = document.getElementById("Modal");
    const closeButton = document.getElementById("closeModal");
    const modalBody = modal?.querySelector(".modal-body");
    const canvas = document.getElementById("circularLoader");
    const loaderContainer = document.querySelector(".loader-con");

    if (
        !chooseButton ||
        !modal ||
        !closeButton ||
        !modalBody ||
        !canvas ||
        !loaderContainer
    ) {
        console.error("تعذر العثور على عناصر السحب المطلوبة.");
        return;
    }

    const ctx = canvas.getContext("2d");

    let isDrawing = false;
    let animationId = null;
    let confettiAnimationId = null;
    let confettiEndTime = 0;
    let pieces = [];

    // إخفاء دائرة التحميل عند فتح الصفحة
    loaderContainer.style.display = "none";

    // رسم دائرة التحميل والنسبة المئوية
    function drawLoader(progress) {

        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 78;

        ctx.clearRect(0, 0, width, height);

        // الدائرة الخلفية
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#302c4c";
        ctx.lineWidth = 10;
        ctx.stroke();

        // دائرة التقدم
        ctx.beginPath();
        ctx.arc(
            centerX,
            centerY,
            radius,
            -Math.PI / 2,
            -Math.PI / 2 + (Math.PI * 2 * progress) / 100
        );

        ctx.strokeStyle = "#a78bfa";
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.stroke();

        // النسبة المئوية
        ctx.fillStyle = "#f5f3ff";
        ctx.font = "bold 32px Tahoma, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${Math.floor(progress)}%`, centerX, centerY);

        // النص أسفل النسبة
        ctx.fillStyle = "#a6a3bd";
        ctx.font = "13px Tahoma, Arial, sans-serif";
        ctx.fillText("جاري السحب", centerX, centerY + 28);
    }

    // إنشاء لوحة الاحتفالية
    const confettiCanvas = document.createElement("canvas");
    confettiCanvas.id = "confettiCanvas";

    Object.assign(confettiCanvas.style, {
        position: "fixed",
        inset: "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: "2000"
    });

    document.body.appendChild(confettiCanvas);

    const confettiCtx = confettiCanvas.getContext("2d");

    // ضبط أبعاد لوحة الاحتفالية
    function resizeConfettiCanvas() {

        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        confettiCanvas.width = window.innerWidth * ratio;
        confettiCanvas.height = window.innerHeight * ratio;

        confettiCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    resizeConfettiCanvas();

    window.addEventListener("resize", resizeConfettiCanvas);

    // إيقاف الاحتفالية
    function stopConfetti() {

        if (confettiAnimationId !== null) {
            cancelAnimationFrame(confettiAnimationId);
            confettiAnimationId = null;
        }

        pieces = [];

        confettiCtx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );
    }

    // تشغيل الاحتفالية
    function startConfetti() {

        stopConfetti();
        resizeConfettiCanvas();

        const colors = [
            "#a78bfa",
            "#c4b5fd",
            "#f5c76b",
            "#ffe3a3",
            "#60a5fa",
            "#4ade80",
            "#fb7185",
            "#ffffff"
        ];

        pieces = Array.from({ length: 180 }, () => ({
            x: Math.random() * window.innerWidth,
            y: -Math.random() * window.innerHeight,
            size: Math.random() * 7 + 4,
            speed: Math.random() * 3 + 2,
            drift: Math.random() * 2 - 1,
            rotation: Math.random() * Math.PI * 2,
            spin: Math.random() * 0.12 - 0.06,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));

        confettiEndTime = performance.now() + 6000;

        function animate(now) {

            confettiCtx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

            pieces.forEach(piece => {

                piece.x += piece.drift;
                piece.y += piece.speed;
                piece.rotation += piece.spin;

                if (piece.y > window.innerHeight + 20) {
                    piece.y = -20;
                    piece.x = Math.random() * window.innerWidth;
                }

                confettiCtx.save();
                confettiCtx.translate(piece.x, piece.y);
                confettiCtx.rotate(piece.rotation);
                confettiCtx.fillStyle = piece.color;

                confettiCtx.fillRect(
                    -piece.size / 2,
                    -piece.size,
                    piece.size,
                    piece.size * 1.8
                );

                confettiCtx.restore();
            });

            if (
                now < confettiEndTime &&
                modal.classList.contains("is-open")
            ) {
                confettiAnimationId = requestAnimationFrame(animate);
            } else {
                stopConfetti();
            }
        }

        confettiAnimationId = requestAnimationFrame(animate);
    }

    // فتح نافذة الفائز
    function openModal(winnerName) {

        const winnerElement = document.createElement("h3");

        winnerElement.className = "winner-name";
        winnerElement.textContent = winnerName;

        modalBody.replaceChildren(winnerElement);

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        startConfetti();

        closeButton.focus();
    }

    // إغلاق نافذة الفائز
    function closeModal() {

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        stopConfetti();

        chooseButton.focus();
    }

    // الضغط على زر اختيار الفائز
    chooseButton.addEventListener("click", function () {

        if (isDrawing) {
            return;
        }

        const winnerElement = modalBody.querySelector(".winner-name");

        if (!winnerElement) {
            alert("لا يوجد فائز متاح. تأكد من وجود مشاركين في قاعدة البيانات.");
            return;
        }

        const winnerName = winnerElement.textContent.trim();

        if (!winnerName) {
            alert("اسم الفائز غير متوفر.");
            return;
        }

        // بدء عملية السحب
        isDrawing = true;

        chooseButton.disabled = true;
        chooseButton.textContent = "جاري السحب...";

        // إظهار دائرة التحميل عند الضغط فقط
        loaderContainer.style.display = "flex";

        drawLoader(0);

        const duration = 4000;
        const startTime = performance.now();

        function animateLoader(now) {

            const elapsed = now - startTime;
            const linearProgress = Math.min(elapsed / duration, 1);

            // تسارع تدريجي ثم تباطؤ قرب النهاية
            const easedProgress = 1 - Math.pow(1 - linearProgress, 2);
            const progress = easedProgress * 100;

            drawLoader(progress);

            if (linearProgress < 1) {

                animationId = requestAnimationFrame(animateLoader);

            } else {

                drawLoader(100);

                // إخفاء التحميل بعد الوصول إلى 100%
                loaderContainer.style.display = "none";

                // إعلان الفائز وتشغيل الاحتفالية
                setTimeout(function () {

                    openModal(winnerName);

                    isDrawing = false;

                    chooseButton.disabled = false;
                    chooseButton.textContent = "اختيار الفائز";

                }, 300);
            }
        }

        animationId = requestAnimationFrame(animateLoader);
    });

    // إغلاق النافذة بزر الإغلاق
    closeButton.addEventListener("click", closeModal);

    // إغلاق النافذة عند الضغط خارجها
    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closeModal();
        }
    });

    // إغلاق النافذة بزر Escape
    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("is-open")
        ) {
            closeModal();
        }
    });

});

