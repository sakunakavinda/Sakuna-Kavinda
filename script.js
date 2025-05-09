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

    // Display gigs with animation attributes
    function displayGigs() {
        const gigsContainer = document.getElementById("gigs-container");
        gigsData.forEach((gig, index) => {
            const gigCard = document.createElement("div");
            gigCard.className = "gig-card";
            gigCard.setAttribute('data-animate', 'slide-up');
            gigCard.style.transitionDelay = `${index * 0.1}s`;
            gigCard.innerHTML = `
                <h3>${gig.info}</h3>
                <p>${gig.date}</p>
                <p>${gig.venue}</p>
            `;
            gigsContainer.appendChild(gigCard);
        });
    }

    // Display YouTube videos with animation attributes
    function displayYouTubeVideos() {
        const container = document.getElementById("youtube-videos");
        youtubeVideos.forEach((video, index) => {
            const videoDiv = document.createElement("div");
            videoDiv.className = "youtube-video";
            videoDiv.setAttribute('data-animate', 'slide-up');
            videoDiv.style.transitionDelay = `${index * 0.1}s`;
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

    // Initialize scroll animations
    function initScrollAnimations() {
        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate section heading
                    const heading = entry.target.querySelector('h2');
                    if (heading && !heading.classList.contains('animate-in')) {
                        heading.classList.add('animate-in');
                    }
                    
                    // Animate all elements with data-animate attribute
                    const animatables = entry.target.querySelectorAll('[data-animate]');
                    animatables.forEach(el => {
                        if (!el.classList.contains('animate-in')) {
                            el.classList.add('animate-in');
                        }
                    });
                } else {
                    // Reset animations when element leaves view
                    const heading = entry.target.querySelector('h2');
                    if (heading) heading.classList.remove('animate-in');
                    
                    const animatables = entry.target.querySelectorAll('[data-animate]');
                    animatables.forEach(el => {
                        el.classList.remove('animate-in');
                    });
                }
            });
        };

        // Set up intersection observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver(animateOnScroll, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
            
            // Observe individual animated elements within sections
            section.querySelectorAll('[data-animate]').forEach(el => {
                observer.observe(el);
            });
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
                top: element.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    }

    // Add smooth scroll to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            if (mobileMenu) {
                mobileMenu.style.display = 'none';
            }
            
            smoothScroll(target);
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

    // Initialize everything
    displayGigs();
    displayYouTubeVideos();
    initScrollAnimations();

    // Animate home content after a slight delay
    setTimeout(() => {
        const homeContent = document.getElementById('home-content');
        if (homeContent) {
            homeContent.style.animation = 'slideUp 1s ease 0.3s forwards';
        }
    }, 300);
});