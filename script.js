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

    // Smooth scroll function
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        }
    }

    // Add smooth scroll to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.style.display = 'none';
            }
            
            smoothScroll(target);
        });
    });

    // Add smooth scroll to contact button
    document.querySelector('button[onclick*="#contact"]').addEventListener('click', function(e) {
        e.preventDefault();
        smoothScroll('#contact');
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

    // Initialize
    displayGigs();
    displayYouTubeVideos();
});