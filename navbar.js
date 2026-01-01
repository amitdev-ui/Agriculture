/**
 * Navbar Component - Reusable for all pages
 * Handles mobile menu toggle and logo error handling
 */

// Logo Error Handler - Make it globally accessible
window.handleLogoError = function(img) {
	if (!img) return;
	
	var currentSrc = img.src || img.getAttribute('src') || '';
	
	if (currentSrc.indexOf('logo_2.png') !== -1) {
		img.src = 'img/logo_3.png';
		img.onerror = function() {
			window.handleLogoError(this);
		};
	} else if (currentSrc.indexOf('logo_3.png') !== -1) {
		img.src = 'img/logo_1.png';
		img.onerror = function() {
			window.handleLogoError(this);
		};
	} else {
		// If all logos fail, show text fallback
		var logoLink = img.parentElement;
		var fallback = logoLink.querySelector('.logo-text-fallback');
		if (fallback) {
			img.style.display = 'none';
			fallback.style.display = 'block';
		} else {
			logoLink.innerHTML = '<span style="font-family: \'Poppins\', sans-serif; font-size: 24px; font-weight: 700; color: #4A8B71; line-height: 40px;">AGRICOM</span>';
		}
	}
};

// Also make it available as handleLogoError for backward compatibility
var handleLogoError = window.handleLogoError;

// Mobile Menu Toggle Script
(function() {
	// Make initMobileMenu globally accessible
	window.initMobileMenu = function() {
		var menuToggle = document.querySelector('.mobile-menu-toggle');
		var menuClose = document.querySelector('.mobile-menu-close');
		var mobileMenu = document.querySelector('.mobile-menu');
		var mobileOverlay = document.querySelector('.mobile-menu-overlay');
		var body = document.body;
		
		// Check if already initialized
		if (menuToggle && menuToggle.hasAttribute('data-initialized')) {
			return;
		}
		
		if (menuToggle) {
			menuToggle.setAttribute('data-initialized', 'true');
		}
		
		var mobileLinks = document.querySelectorAll('.mobile-menu .nav-link, .mobile-menu .nav-cta-btn');
		
		function toggleMenu() {
			if (menuToggle) menuToggle.classList.toggle('active');
			if (mobileMenu) mobileMenu.classList.toggle('active');
			if (mobileOverlay) mobileOverlay.classList.toggle('active');
			body.classList.toggle('menu-open');
		}
		
		function closeMenu() {
			if (menuToggle) menuToggle.classList.remove('active');
			if (mobileMenu) mobileMenu.classList.remove('active');
			if (mobileOverlay) mobileOverlay.classList.remove('active');
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
	};
	
	// Try to initialize when DOM is ready (for pages where navbar is already in HTML)
	function tryInitOnReady() {
		if (document.querySelector('.mobile-menu-toggle')) {
			window.initMobileMenu();
		} else {
			// If navbar not found, wait a bit and try again (for dynamically loaded navbars)
			setTimeout(function() {
				if (document.querySelector('.mobile-menu-toggle')) {
					window.initMobileMenu();
				}
			}, 300);
		}
	}
	
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function() {
			setTimeout(tryInitOnReady, 100);
		});
	} else {
		setTimeout(tryInitOnReady, 100);
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

