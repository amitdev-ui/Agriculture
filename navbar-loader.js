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
					<a href="index.html" class="logo-link">
						<img src="img/logo_1.png" alt="Agricom Logo" class="logo-img" onerror="if(typeof handleLogoError === 'function') { handleLogoError(this); } else { this.style.display='none'; this.nextElementSibling.style.display='block'; }">
						<span class="logo-text-fallback" style="display:none; font-family: 'Poppins', sans-serif; font-size: 24px; font-weight: 700; color: #4A8B71; line-height: 40px;">AGRICOM</span>
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
			body.insertBefore(tempDiv.firstElementChild, body.firstChild);
			
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

