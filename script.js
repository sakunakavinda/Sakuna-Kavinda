document.addEventListener('DOMContentLoaded', function() {

    const video = document.getElementById('home-video');
    if (video) {
        // Create fallback image element
        const fallbackImg = document.createElement('img');
        fallbackImg.src = video.poster;
        fallbackImg.className = 'video-fallback';
        fallbackImg.alt = 'Background image';
        video.parentNode.insertBefore(fallbackImg, video.nextSibling);
        
        // Check if video can play
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Video failed to play - show fallback image
                video.style.display = 'none';
                fallbackImg.style.display = 'block';
            });
        }
        
        // Handle when video ends (for the loop)
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play();
        });
    }


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
        const section = document.getElementById("youtube");
        const showMoreBtn = document.createElement('button');
        showMoreBtn.id = 'show-more-btn';
        showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
        showMoreBtn.className = 'show-more-btn';
        
        // Initially show only 2 videos
        const initialVideosToShow = 2;
        let showingAll = false;
    
        youtubeVideos.forEach((video, index) => {
            const videoDiv = document.createElement("div");
            videoDiv.className = "youtube-video";
            videoDiv.setAttribute('data-animate', 'slide-up');
            videoDiv.style.transitionDelay = `${index * 0.1}s`;
            
            // Hide videos beyond the initial count
            if (index >= initialVideosToShow) {
                videoDiv.style.opacity = '0';
                videoDiv.style.maxHeight = '0';
                videoDiv.style.overflow = 'hidden';
                videoDiv.style.margin = '0';
                videoDiv.style.padding = '0';
            }
            
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
    
        // Add show more button functionality
        showMoreBtn.addEventListener('click', function() {
            const allVideos = container.querySelectorAll('.youtube-video');
            
            if (showingAll) {
                // Animate hiding videos
                allVideos.forEach((video, index) => {
                    if (index >= initialVideosToShow) {
                        video.style.opacity = '0';
                        video.style.maxHeight = '0';
                        video.style.margin = '0';
                        video.style.padding = '0';
                    }
                });
                
                // Button animation
                showMoreBtn.classList.add('btn-animate');
                setTimeout(() => {
                    showMoreBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
                    showMoreBtn.classList.remove('btn-animate');
                    
                    // Scroll to section after animation
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 200);
                }, 300);
            } else {
                // Animate showing videos
                allVideos.forEach((video, index) => {
                    if (index >= initialVideosToShow) {
                        video.style.opacity = '1';
                        video.style.maxHeight = '500px';
                        video.style.margin = '';
                        video.style.padding = '';
                    }
                });
                
                // Button animation
                showMoreBtn.classList.add('btn-animate');
                setTimeout(() => {
                    showMoreBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
                    showMoreBtn.classList.remove('btn-animate');
                }, 300);
            }
            
            showingAll = !showingAll;
        });
    
        // Only add show more button if there are more videos than initial count
        if (youtubeVideos.length > initialVideosToShow) {
            container.parentNode.insertBefore(showMoreBtn, container.nextSibling);
        }
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