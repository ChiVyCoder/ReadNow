// ======================= BANNER SLIDE SHOW=================================
if (window.jQuery) {
    $(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        dots: false,
        autoplay:true,
        items: 1,              
        autoplayTimeout: 3000, // Thời gian chuyển ảnh (3 giây)
        autoplayHoverPause: true , // Tạm dừng khi hover chuột
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
})
} else console.log("ERROR")
// ============================ FEATURE-BOOLS SIDE SHOW=================================
if (window.jQuery) {
    $(document).ready(function(){
    $('#feature-books-slideShow').owlCarousel({
        loop:true,
        margin:10,
        dots: false,
        nav:true,
        autoplay:true,
        items: 1,              
        autoplayTimeout: 3000, // Thời gian chuyển ảnh (3 giây)
        autoplayHoverPause: true , // Tạm dừng khi hover chuột
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
})
} else console.log("ERROR")
// ================== FOOTER ANIMATION =================================================

window.addEventListener('scroll', function() {
    const footer = document.querySelector('.footer-content');
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.body.offsetHeight;

    if (scrollPosition >= documentHeight) {
        footer.classList.add('show-footer');
    } else {
        footer.classList.remove('show-footer');
    }
});
// count down 

// Thiết lập thời gian đếm ngược là 30 phút (30 * 60 * 1000 milliseconds)
 let countdownTime = 30 * 60 * 1000; 
 let endTime = new Date().getTime() + countdownTime; // Cập nhật đồng hồ đếm ngược mỗi giây 
 let countdownFunction = setInterval(function() { let now = new Date().getTime(); 
    let distance = endTime - now;
     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); 
    let seconds = Math.floor((distance % (1000 * 60)) / 1000); // Hiển thị thời gian đếm ngược 
    document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s "; // Nếu đếm ngược kết thúc, hiển thị thông báo 
    if (distance < 0) { clearInterval(countdownFunction); 
        document.getElementById("countdown").innerHTML = "EXPIRED"; } }, 1000);

  