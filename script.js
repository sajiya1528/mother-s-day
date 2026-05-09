const balloonData = [
    {
        id: 1,
        color: '#ff6b81',
        image: 'mummmy 1.jpeg',
        message: 'You are my strength ❤️',
        description: 'Thank you for always standing by my side and supporting every dream I chase. Your unwavering belief in me makes me feel like I can conquer the world. You are the strongest person I know.',
        audio: 'audio/audio 1.mp3'
    },
    {
        id: 2,
        color: '#ffa502',
        image: 'mummmy 2.jpeg',
        message: 'Thank you for always loving me 🌸',
        description: 'Through every up and down, your love has been my constant comfort. Your warm hugs and gentle smile have the power to make any bad day disappear instantly.',
        audio: 'audio/audio 2.mp3'
    },
    {
        id: 3,
        color: '#7bed9f',
        image: 'mummmy 3.jpeg',
        message: 'Home is wherever you are 💖',
        description: 'It doesn\'t matter where I go in life, my truest home will always be right next to you. The warmth and peace you bring to our family are irreplaceable.',
        audio: 'audio/audio 3.mp3'
    },
    {
        id: 4,
        color: '#70a1ff',
        image: 'mummmy 4.jpeg',
        message: 'I can never thank you enough ❤️',
        description: 'For all the hidden sacrifices you made, all the sleepless nights, and all the times you put me first... I am endlessly grateful. You truly are an angel in my life.',
        audio: 'audio/audio 4.mp3'
    },
    {
        id: 5,
        color: '#a4b0be',
        image: 'mummmy 5.jpeg',
        message: 'Your smile lights up my world ✨',
        description: 'Seeing you happy is my greatest joy. Your beautiful smile has guided me through my darkest moments, and your infectious laugh is my favorite sound in the world.',
        audio: 'audio/audio 5.mp3'
    },
    {
        id: 6,
        color: '#eccc68',
        image: 'mummmy 6.jpeg',
        message: 'You are the most beautiful soul 💕',
        description: 'Mom, you have a heart of pure gold. The kindness and compassion you show to everyone around you inspires me to be a better person every single day. I love you so much.',
        audio: 'audio/audio 6.mp3'
    }
];

// Initialize Balloons
const balloonsContainer = document.querySelector('.balloons-container');

balloonData.forEach((data, index) => {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.setProperty('--balloon-color', data.color);
    // Randomize balloon floating animation a bit
    balloon.style.animationDelay = `${index * 0.3}s`;
    balloon.style.animationDuration = `${3 + Math.random() * 2}s`;
    
    balloon.addEventListener('click', () => openPopup(data));
    
    balloonsContainer.appendChild(balloon);
});

// Popup Logic
const popupOverlay = document.getElementById('popup');
const popupImage = document.getElementById('popup-image');
const popupMessage = document.getElementById('popup-message');
const popupDescription = document.getElementById('popup-description');
const popupAudio = document.getElementById('popup-audio');
const closeBtn = document.getElementById('close-popup');

function openPopup(data) {
    popupImage.src = data.image;
    popupMessage.textContent = data.message;
    popupDescription.textContent = data.description;
    popupAudio.src = data.audio;
    
    popupOverlay.classList.remove('hidden');
    // small timeout to allow display block to process before opacity changes for transition
    setTimeout(() => {
        popupOverlay.classList.add('active');
    }, 10);
    
    // Play audio, handle catch if browser blocks autoplay or if files don't exist
    let playPromise = popupAudio.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Audio autoplay prevented or audio file missing.");
        });
    }

    createMiniHearts();
}

function closePopup() {
    popupOverlay.classList.remove('active');
    popupAudio.pause();
    popupAudio.currentTime = 0;
    
    // Clear mini hearts after transition
    setTimeout(() => {
        const popupHearts = document.getElementById('popup-hearts');
        popupHearts.innerHTML = '';
        popupOverlay.classList.add('hidden');
    }, 400); // match transition duration
}

closeBtn.addEventListener('click', closePopup);

// Close on clicking outside content
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        closePopup();
    }
});

// Background Floating Hearts Animation
function createBackgroundHearts() {
    const container = document.getElementById('hearts-container');
    const heartSymbols = ['❤️', '💖', '🌸', '✨', '💕'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.animationDuration = `${Math.random() * 5 + 7}s`; // 7 to 12 seconds
        
        container.appendChild(heart);
        
        // Remove after animation completes
        setTimeout(() => {
            heart.remove();
        }, 12000); 
    }, 600); // Create a new heart every 600ms
}

// Exploding Mini Hearts in Popup
function createMiniHearts() {
    const container = document.getElementById('popup-hearts');
    container.innerHTML = ''; // clear existing
    
    const heartSymbols = ['❤️', '✨', '🌸'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('mini-heart');
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            // Random horizontal start position
            heart.style.left = `${50 + (Math.random() * 60 - 30)}%`;
            heart.style.top = `${50 + (Math.random() * 40 - 20)}%`;
            
            // Random horizontal movement
            const tx = Math.random() * 100 - 50; 
            heart.style.setProperty('--tx', `${tx}px`);
            
            container.appendChild(heart);
            
            // Cleanup
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 50); // staggered creation
    }
}

// Start background animation when page loads
window.addEventListener('DOMContentLoaded', () => {
    createBackgroundHearts();
});
