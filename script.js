// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    // Integrate with Mailchimp API (example placeholder)
    fetch('https://your-mailchimp-api-endpoint', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        alert('Cảm ơn bạn đã đăng ký nhận tin!');
        this.reset();
    })
    .catch(error => alert('Đã có lỗi xảy ra, vui lòng thử lại!'));
});

// Cart Functionality
let cartCount = 0;
const cartCountElement = document.getElementById('cart-count');

document.querySelectorAll('.cta-button').forEach(button => {
    if (button.textContent === 'Mua ngay') {
        button.addEventListener('click', function(e) {
            cartCount++;
            cartCountElement.textContent = cartCount;
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
        });
    }
});