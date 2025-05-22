document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger-menu');
    const dropdown = document.getElementById('hamburger-dropdown');
    hamburger.addEventListener('click', () => {
        dropdown.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    // Set up planet links and labels
    const planets = document.querySelectorAll('.planet');
    const planetLinks = [
        '#', // Replace with your service 1 URL
        '#', // Replace with your service 2 URL
        '#', // Replace with your service 3 URL
        '#'  // Replace with your service 4 URL
    ];
    const planetNames = [
        'Web Development',
        'UI/UX Design',
        'Mobile Apps',
        'Digital Marketing'
    ];
    let planetLabelDiv = null;
    let followingPlanet = null;
    let followingIndex = null;
    function updateLabelPosition() {
        if (planetLabelDiv && followingPlanet) {
            const rect = followingPlanet.getBoundingClientRect();
            planetLabelDiv.style.left = `${rect.left + rect.width / 2}px`;
            planetLabelDiv.style.top = `${rect.top - 30}px`;
        }
        requestAnimationFrame(updateLabelPosition);
    }
    planets.forEach((planet, index) => {
        const link = planet.querySelector('.planet-link');
        link.href = planetLinks[index];
        planet.addEventListener('mouseenter', (e) => {
            if (!planetLabelDiv) {
                planetLabelDiv = document.createElement('div');
                planetLabelDiv.className = 'planet-label';
                document.body.appendChild(planetLabelDiv);
            }
            planetLabelDiv.textContent = planetNames[index];
            planetLabelDiv.style.opacity = 1;
            planetLabelDiv.style.position = 'fixed';
            planetLabelDiv.style.pointerEvents = 'none';
            planetLabelDiv.style.zIndex = 9999;
            followingPlanet = planet;
            followingIndex = index;
        });
        planet.addEventListener('mouseleave', () => {
            if (planetLabelDiv) {
                planetLabelDiv.style.opacity = 0;
            }
            followingPlanet = null;
            followingIndex = null;
        });
    });
    updateLabelPosition();

    // Add smooth rotation to planets
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach((orbit, index) => {
        const planet = orbit.querySelector('.planet');
        const speed = 30 + (index * 10); // Different speeds for each planet
        orbit.style.animationDuration = `${speed}s`;
    });

    // Animated stars with color cycling
    const starsContainer = document.getElementById('background-stars');
    const numStars = 100; // Increased number of stars
    const starColors = ['#cee4ec', '#fff', '#f8b22d'];
    let colorPhase = 0;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        star.style.opacity = Math.random() * 0.5 + 0.5;
        starsContainer.appendChild(star);
        stars.push(star);
    }
    function cycleStarColors() {
        colorPhase = (colorPhase + 1) % starColors.length;
        stars.forEach((star, i) => {
            // Alternate color for a more dynamic effect
            const colorIndex = (colorPhase + i) % starColors.length;
            star.style.background = starColors[colorIndex];
            star.style.boxShadow = `0 0 6px 2px ${starColors[colorIndex]}88`;
        });
        setTimeout(cycleStarColors, 6000)
    }
    cycleStarColors();

    // Spaceship animation alternates between rocket and battleship
    const spaceship = document.getElementById('spaceship');
    const spaceshipImages = ['Rocket.png', 'Battleship.png'];
    let spaceshipIndex = 0;
    function launchSpaceship() {
        spaceship.style.backgroundImage = `url('${spaceshipImages[spaceshipIndex]}')`;
        spaceshipIndex = (spaceshipIndex + 1) % spaceshipImages.length;
        spaceship.style.display = 'block';
        spaceship.style.left = '-120px';
        spaceship.style.top = (Math.random() * 60 + 10) + 'vh';
        spaceship.style.transition = 'none';
        setTimeout(() => {
            spaceship.style.transition = 'left 4s linear';
            spaceship.style.left = '110vw';
        }, 50);
        setTimeout(() => {
            spaceship.style.display = 'none';
        }, 4200);
    }
    setInterval(launchSpaceship, 12000);
}); 