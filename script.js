document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Cảm ơn bạn đã đăng ký nhận tin!');
    this.reset();
});