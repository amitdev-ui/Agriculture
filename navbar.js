/**
 * Navbar Component - Reusable for all pages
 * Handles mobile menu toggle and logo error handling
 */

// Logo Error Handler
function handleLogoError(img) {
	if (img.src.indexOf('logo_1.png') !== -1) {
		img.src = 'img/logo_2.png';
	} else if (img.src.indexOf('logo_2.png') !== -1) {
		img.src = 'img/logo_3.png';
	} else {
		// If all logos fail, show text
		var logoLink = img.parentElement;
		logoLink.innerHTML = '<span style="font-family: \'Poppins\', sans-serif; font-size: 24px; font-weight: 700; color: #4A8B71;">AGRICOM</span>';
	}
}

// Mobile Menu Toggle Script
(function() {
	function initMobileMenu() {
		var menuToggle = document.querySelector('.mobile-menu-toggle');
		var menuClose = document.querySelector('.mobile-menu-close');
		var mobileMenu = document.querySelector('.mobile-menu');
		var mobileOverlay = document.querySelector('.mobile-menu-overlay');
		var body = document.body;
		var mobileLinks = document.querySelectorAll('.mobile-menu .nav-link, .mobile-menu .nav-cta-btn');
		
		function toggleMenu() {
			menuToggle.classList.toggle('active');
			mobileMenu.classList.toggle('active');
			mobileOverlay.classList.toggle('active');
			body.classList.toggle('menu-open');
		}
		
		function closeMenu() {
			menuToggle.classList.remove('active');
			mobileMenu.classList.remove('active');
			mobileOverlay.classList.remove('active');
			body.classList.remove('menu-open');
		}
		
		if (menuToggle) {
			menuToggle.addEventListener('click', toggleMenu);
		}
		
		if (menuClose) {
			menuClose.addEventListener('click', closeMenu);
		}
		
		if (mobileOverlay) {
			mobileOverlay.addEventListener('click', closeMenu);
		}
		
		// Close menu when clicking on mobile menu links
		mobileLinks.forEach(function(link) {
			link.addEventListener('click', function() {
				setTimeout(closeMenu, 300);
			});
		});
		
		// Close menu on window resize if it's open
		window.addEventListener('resize', function() {
			if (window.innerWidth > 768 && body.classList.contains('menu-open')) {
				closeMenu();
			}
		});
		
		// Close menu on ESC key
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && body.classList.contains('menu-open')) {
				closeMenu();
			}
		});
	}
	
	// Initialize when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initMobileMenu);
	} else {
		initMobileMenu();
	}
})();

// Set active link based on current page
function setActiveNavLink() {
	var currentPage = window.location.pathname.split('/').pop() || 'index.html';
	var navLinks = document.querySelectorAll('.navbar-menu .nav-link, .mobile-menu .nav-link');
	
	navLinks.forEach(function(link) {
		var linkHref = link.getAttribute('href');
		if (linkHref) {
			var linkPage = linkHref.split('/').pop();
			// Remove active class from all links
			link.classList.remove('active');
			// Add active class if it matches current page
			if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
				link.classList.add('active');
			}
		}
	});
}

// Initialize active link when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setActiveNavLink);
} else {
	setActiveNavLink();
}

