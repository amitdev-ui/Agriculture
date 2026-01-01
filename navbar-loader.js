/**
 * Navbar Loader - Dynamically loads navbar component into all pages
 * This ensures the navbar is reusable and not duplicated
 */

(function() {
	// Navbar HTML structure
	var navbarHTML = `
		<!-- start navbar -->
		<nav class="main-navbar">
			<div class="navbar-container">
				<!-- Logo on left -->
				<div class="navbar-logo">
					<a href="index.html" class="logo-link" style="display: flex !important; align-items: center !important; height: 40px !important; min-width: 100px !important;">
						<img src="img/logo_2.png" alt="Agricom Logo" class="logo-img" style="display: block !important; height: 40px !important; width: auto !important; opacity: 1 !important; visibility: visible !important; min-width: 80px !important; max-width: 200px !important;" onerror="if(typeof window.handleLogoError === 'function') { window.handleLogoError(this); } else { this.style.display='none'; var fallback = this.nextElementSibling; if(fallback) { fallback.style.display='block'; fallback.style.visibility='visible'; } }">
						<span class="logo-text-fallback" style="display: none; font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 700; color: #4A8B71; line-height: 40px;">AGRICOM</span>
					</a>
				</div>
				
				<!-- Menu items in center -->
				<ul class="navbar-menu">
					<li><a href="index.html" class="nav-link">HOME</a></li>
					<li><a href="about.html" class="nav-link">PAGES</a></li>
					<li><a href="gallery_1.html" class="nav-link">GALLERY</a></li>
					<li><a href="blog.html" class="nav-link">BLOG</a></li>
					<li><a href="contacts.html" class="nav-link">CONTACTS</a></li>
				</ul>
				
				<!-- Get in Touch button on right -->
				<div class="navbar-cta">
					<a href="contacts.html" class="nav-cta-btn">GET IN TOUCH</a>
				</div>
				
				<!-- Mobile Menu Toggle -->
				<button class="mobile-menu-toggle" aria-label="Toggle menu">
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
			
			<!-- Mobile Menu Overlay -->
			<div class="mobile-menu-overlay"></div>
			
			<!-- Mobile Menu -->
			<div class="mobile-menu">
				<button class="mobile-menu-close" aria-label="Close menu"></button>
				<ul>
					<li><a href="index.html" class="nav-link">Home</a></li>
					<li><a href="about.html" class="nav-link">Pages</a></li>
					<li><a href="gallery_1.html" class="nav-link">Gallery</a></li>
					<li><a href="blog.html" class="nav-link">Blog</a></li>
					<li><a href="contacts.html" class="nav-link">Contacts</a></li>
					<li><a href="contacts.html" class="nav-cta-btn">Get In Touch</a></li>
				</ul>
			</div>
		</nav>
		<!-- end navbar -->
	`;
	
	function loadNavbar() {
		// Check if navbar already exists
		if (document.querySelector('.main-navbar')) {
			return;
		}
		
		// Find the body tag and insert navbar at the beginning
		var body = document.body;
		if (body) {
			// Create a temporary container
			var tempDiv = document.createElement('div');
			tempDiv.innerHTML = navbarHTML;
			
			// Insert navbar at the beginning of body
			var navbarElement = tempDiv.firstElementChild;
			body.insertBefore(navbarElement, body.firstChild);
			
			// Force logo to be visible after insertion
			setTimeout(function() {
				var logoImg = navbarElement.querySelector('.logo-img');
				if (logoImg) {
					// Force visibility with inline styles (highest priority)
					logoImg.style.cssText = 'display: block !important; opacity: 1 !important; visibility: visible !important; height: 40px !important; width: auto !important; min-width: 80px !important; max-width: 200px !important;';
					
					// Add load event to ensure visibility
					logoImg.onload = function() {
						this.style.cssText = 'display: block !important; opacity: 1 !important; visibility: visible !important; height: 40px !important; width: auto !important;';
					};
					
					// Check if image actually loaded after a delay
					setTimeout(function() {
						if (logoImg) {
							var isLoaded = logoImg.complete && logoImg.naturalHeight > 0;
							if (!isLoaded) {
								// Image didn't load, try fallback
								if (typeof window.handleLogoError === 'function') {
									window.handleLogoError(logoImg);
								} else {
									// Show text fallback
									var fallback = logoImg.nextElementSibling;
									if (fallback && fallback.classList.contains('logo-text-fallback')) {
										logoImg.style.display = 'none';
										fallback.style.display = 'block';
									}
								}
							}
						}
					}, 500);
				}
			}, 100);
			
			// Initialize mobile menu after navbar is loaded
			setTimeout(function() {
				// Trigger mobile menu initialization - try multiple times to ensure it works
				var initAttempts = 0;
				var maxAttempts = 10;
				
				function tryInit() {
					var menuToggle = document.querySelector('.mobile-menu-toggle');
					if (menuToggle && typeof window.initMobileMenu === 'function') {
						window.initMobileMenu();
					} else if (initAttempts < maxAttempts) {
						initAttempts++;
						setTimeout(tryInit, 100);
					}
				}
				
				tryInit();
				
				// Set active link based on current page
				setTimeout(function() {
					if (typeof setActiveNavLink === 'function') {
						setActiveNavLink();
					}
				}, 200);
			}, 200);
		}
	}
	
	// Load navbar when DOM is ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', loadNavbar);
	} else {
		loadNavbar();
	}
})();

