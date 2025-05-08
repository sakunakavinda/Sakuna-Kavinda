document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Gigs data
    const gigsData = [
        { date: "Saturday 8 pm - 11 pm", venue: "Kurunegala", info: "@Ceylon Lagos" },
        { date: "Sunday 8 pm - 11 pm", venue: "Habarana", info: "@Curry and Rice" },
    ];

    // YouTube videos data
    const youtubeVideos = [
        { title: "Song Title 1", url: "https://www.youtube.com/embed/RuBe-gu-BKA" },
        { title: "Song Title 2", url: "https://www.youtube.com/embed/mpjtFXyTbvA" },
        { title: "Song Title 3", url: "https://www.youtube.com/embed/WvMa-qh5n30" },
        { title: "Song Title 4", url: "https://www.youtube.com/embed/UEIw3S9H7-I" }
    ];

    // Display gigs
    function displayGigs() {
        const gigsContainer = document.getElementById("gigs-container");
        gigsData.forEach(gig => {
            const gigCard = document.createElement("div");
            gigCard.className = "gig-card";
            gigCard.innerHTML = `
                <h3>${gig.info}</h3>
                <p>${gig.date}</p>
                <p>${gig.venue}</p>
            `;
            gigsContainer.appendChild(gigCard);
        });
    }

    // Display YouTube videos
    function displayYouTubeVideos() {
        const container = document.getElementById("youtube-videos");
        youtubeVideos.forEach(video => {
            const videoDiv = document.createElement("div");
            videoDiv.className = "youtube-video";
            videoDiv.innerHTML = `
                <iframe 
                    src="${video.url}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    title="${video.title}"
                    loading="lazy"
                ></iframe>
            `;
            container.appendChild(videoDiv);
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
        });
    });

    // Button event listeners
    document.getElementById('youtube-channel-btn').addEventListener('click', function() {
        window.open('https://www.youtube.com/@sakuna_kavinda', '_blank');
    });

    document.getElementById('whatsapp-btn').addEventListener('click', function() {
        window.open('https://wa.me/+94716531817', '_blank');
    });

    document.getElementById('messenger-btn').addEventListener('click', function() {
        window.open('https://m.me/tadashi.hamada.16940', '_blank');
    });

    // Video handling for iOS
    const video = document.getElementById('home-video');
    if (video) {
        // Check if iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        
        if (isIOS) {
            // For iOS, we need to handle autoplay differently
            video.setAttribute('playsinline', '');
            video.setAttribute('muted', '');
            
            // Try to play immediately
            video.play().catch(error => {
                // If autoplay fails, show poster and set up touch handler
                video.poster = 'media/poster.jpg';
                
                // When user interacts with page, try to play again
                document.addEventListener('touchstart', function handleFirstTouch() {
                    video.play().then(() => {
                        // Success! Remove the poster
                        video.poster = '';
                    }).catch(e => {
                        console.log('Video play failed:', e);
                    });
                    document.removeEventListener('touchstart', handleFirstTouch);
                }, { once: true });
            });
        } else {
            // For non-iOS devices, just try to play
            video.play().catch(error => {
                console.log('Autoplay prevented:', error);
            });
        }
        
        // Fallback for any errors
        video.addEventListener('error', function() {
            console.error('Video loading error');
            video.style.display = 'none';
        });
    }

    // Initialize
    displayGigs();
    displayYouTubeVideos();
});