window.addEventListener('scroll', () => {
    const card = document.getElementById('profileCard');
    const photo = document.querySelector('.photo-box');
    const scrollPos = window.scrollY;
    
    // Desktop logic
    if (window.innerWidth > 768) {
        if (scrollPos > 100) {
            // Photo moves slightly Left
            photo.style.transform = 'translateX(-250px)'; 
            
            // Card moves Right and aligns beside photo
            card.style.transform = 'translate(250px, -280px)'; 
            card.style.boxShadow = '0 20px 50px rgba(0, 242, 255, 0.25)';
        } else {
            // Wapas original center position pe (Photo upar, Card niche)
            photo.style.transform = 'translateX(0)';
            card.style.transform = 'translate(0, 0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        }
    }
});