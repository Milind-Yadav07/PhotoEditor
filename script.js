document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const container = document.querySelector('.container');
    let isMoving = false;

    function moveButton(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const buttonRect = noButton.getBoundingClientRect();
        const buttonX = buttonRect.left + buttonRect.width / 2;
        const buttonY = buttonRect.top + buttonRect.height / 2;

        // Calculate distance between mouse and button
        const distance = Math.sqrt(
            Math.pow(mouseX - buttonX, 2) + 
            Math.pow(mouseY - buttonY, 2)
        );

        // Move button if mouse is within 100px
        if (distance < 100 && !isMoving) {
            isMoving = true;
            const maxX = window.innerWidth - buttonRect.width;
            const maxY = window.innerHeight - buttonRect.height;
            
            // Get new random position
            const newX = Math.min(Math.max(0, Math.random() * maxX), maxX);
            const newY = Math.min(Math.max(0, Math.random() * maxY), maxY);

            noButton.style.position = 'fixed';
            noButton.style.left = `${newX}px`;
            noButton.style.top = `${newY}px`;
            
            // Reset isMoving after animation completes
            setTimeout(() => {
                isMoving = false;
            }, 200);
        }
    }

    function createHeart() {
        const hearts = ['❤️', '💖', '💝', '💕', '💗'];
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = '24px';
        document.body.appendChild(heart);
        
        // Remove heart element after animation
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }

    document.addEventListener('mousemove', moveButton);

    yesButton.addEventListener('click', () => {
        // Create multiple hearts
        for(let i = 0; i < 15; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 100);
        }
        
        alert('Yay! Happy Valentine\'s Day! ❤️');
    });
});