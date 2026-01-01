/**
 * Global Animation System - Premium Motion Design
 * Vanilla JavaScript animation system using IntersectionObserver
 * No dependencies - Pure HTML/CSS/JS
 */

(function() {
	'use strict';

	// ==========================================================================
	// Configuration
	// ==========================================================================
	const config = {
		// IntersectionObserver options
		observerOptions: {
			root: null,
			rootMargin: '0px 0px -5% 0px', // Trigger earlier for smoother feel
			threshold: [0, 0.1, 0.2, 0.3] // Multiple thresholds for smoother progression
		},
		
		// Animation delays
		staggerDelay: 80, // milliseconds between stagger items (premium timing)
		
		// Animation timing
		revealDelay: 50, // Delay before revealing elements
		
		// Enable/disable features
		enableScrollProgress: true,
		enablePageTransition: true,
		
		// Scroll progress selector
		scrollProgressSelector: '#scroll-progress',
		
		// Page transition selector
		pageTransitionSelector: '#page-transition'
	};

	// ==========================================================================
	// IntersectionObserver for Scroll Reveals
	// ==========================================================================
	
	let observer;

	/**
	 * Initialize IntersectionObserver for reveal animations
	 */
	function initScrollReveal() {
		// Create observer instance with premium smoothness
		observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					// Add delay for smoother feel
					setTimeout(function() {
						entry.target.classList.add('revealed');
						
						// For stagger containers, trigger stagger animation
						if (entry.target.classList.contains('stagger')) {
							animateStaggerItems(entry.target);
						}
					}, config.revealDelay);
					
					// Unobserve after animation (performance optimization)
					observer.unobserve(entry.target);
				}
			});
		}, config.observerOptions);

		// Observe all reveal elements
		const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .section, .stagger');
		revealElements.forEach(function(element) {
			observer.observe(element);
		});
		
		// Also observe individual stagger-items that are not in a stagger container
		const standaloneStaggerItems = document.querySelectorAll('.stagger-item:not(.stagger .stagger-item)');
		standaloneStaggerItems.forEach(function(element) {
			observer.observe(element);
		});
	}

	/**
	 * Animate stagger items with delay
	 * @param {HTMLElement} container - The stagger container
	 */
	function animateStaggerItems(container) {
		const items = container.querySelectorAll('.stagger-item');
		
		items.forEach(function(item, index) {
			setTimeout(function() {
				item.classList.add('revealed');
			}, index * config.staggerDelay);
		});
	}

	// ==========================================================================
	// Page Load Animations
	// ==========================================================================
	
	/**
	 * Animate elements on page load
	 */
	function initPageLoadAnimations() {
		const animateElements = document.querySelectorAll('.animate-on-load');
		
		animateElements.forEach(function(element, index) {
			setTimeout(function() {
				element.style.opacity = '1';
				element.style.animationPlayState = 'running';
			}, index * 50); // Small delay between elements
		});
	}

	// ==========================================================================
	// Scroll Progress Indicator
	// ==========================================================================
	
	/**
	 * Initialize scroll progress indicator - Premium with smooth animation
	 */
	function initScrollProgress() {
		if (!config.enableScrollProgress) return;
		
		// Create scroll progress element if it doesn't exist
		let progressBar = document.querySelector(config.scrollProgressSelector);
		if (!progressBar) {
			progressBar = document.createElement('div');
			progressBar.id = 'scroll-progress';
			document.body.appendChild(progressBar);
		}

		// Update progress on scroll with smooth easing
		let rafId = null;
		let currentProgress = 0;
		
		function updateScrollProgress() {
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			
			const scrollPercent = Math.min(100, (scrollTop / (documentHeight - windowHeight)) * 100);
			
			// Smooth interpolation for premium feel
			currentProgress += (scrollPercent - currentProgress) * 0.15;
			progressBar.style.width = currentProgress + '%';
			
			if (Math.abs(scrollPercent - currentProgress) > 0.1) {
				rafId = requestAnimationFrame(updateScrollProgress);
			}
		}

		// Throttle scroll event for performance
		let ticking = false;
		window.addEventListener('scroll', function() {
			if (!ticking) {
				if (rafId) cancelAnimationFrame(rafId);
				rafId = requestAnimationFrame(function() {
					updateScrollProgress();
					ticking = false;
				});
				ticking = true;
			}
		}, { passive: true });

		// Initial update
		updateScrollProgress();
	}

	// ==========================================================================
	// Page Transition Overlay
	// ==========================================================================
	
	/**
	 * Initialize page transition overlay
	 */
	function initPageTransition() {
		if (!config.enablePageTransition) return;
		
		// Create page transition element if it doesn't exist
		let transitionOverlay = document.querySelector(config.pageTransitionSelector);
		if (!transitionOverlay) {
			transitionOverlay = document.createElement('div');
			transitionOverlay.id = 'page-transition';
			document.body.appendChild(transitionOverlay);
		}

		// Handle page transitions on link clicks
		const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="javascript:"]):not([target="_blank"])');
		
		links.forEach(function(link) {
			link.addEventListener('click', function(e) {
				// Skip if modifier keys are pressed
				if (e.ctrlKey || e.metaKey || e.shiftKey) return;
				
				const href = this.getAttribute('href');
				
				// Only handle internal links
				if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
					e.preventDefault();
					
					// Show transition overlay
					transitionOverlay.classList.add('active');
					
					// Navigate after short delay
					setTimeout(function() {
						window.location.href = href;
					}, 300);
				}
			});
		});

		// Hide transition overlay on page load
		window.addEventListener('load', function() {
			setTimeout(function() {
				transitionOverlay.classList.remove('active');
			}, 100);
		});
	}

	// ==========================================================================
	// Stagger Text Animation (Advanced)
	// ==========================================================================
	
	/**
	 * Animate text with letter-by-letter stagger (for special headings)
	 */
	function initStaggerText() {
		const staggerTextElements = document.querySelectorAll('.stagger-text');
		
		staggerTextElements.forEach(function(element) {
			const text = element.textContent;
			const words = text.split(' ');
			
			// Clear element
			element.textContent = '';
			
			// Create span for each word
			words.forEach(function(word, wordIndex) {
				const wordSpan = document.createElement('span');
				wordSpan.style.display = 'inline-block';
				wordSpan.style.opacity = '0';
				wordSpan.style.transform = 'translateY(20px)';
				wordSpan.style.transition = 'opacity 0.6s cubic-bezier(0.66, 0.01, 0.31, 1), transform 0.6s cubic-bezier(0.66, 0.01, 0.31, 1)';
				wordSpan.textContent = word + ' ';
				
				element.appendChild(wordSpan);
				
				// Animate on reveal
				const observer = new IntersectionObserver(function(entries) {
					entries.forEach(function(entry) {
						if (entry.isIntersecting) {
							setTimeout(function() {
								wordSpan.style.opacity = '1';
								wordSpan.style.transform = 'translateY(0)';
							}, wordIndex * 50);
							observer.unobserve(entry.target);
						}
					});
				}, config.observerOptions);
				
				observer.observe(element);
			});
		});
	}

	// ==========================================================================
	// Smooth Scroll Enhancement
	// ==========================================================================
	
	/**
	 * Enhance smooth scroll behavior
	 */
	function initSmoothScroll() {
		// Only enhance if browser supports smooth scroll
		if ('scrollBehavior' in document.documentElement.style) {
			document.documentElement.style.scrollBehavior = 'smooth';
		} else {
			// Polyfill for browsers that don't support smooth scroll
			const links = document.querySelectorAll('a[href^="#"]');
			
			links.forEach(function(link) {
				link.addEventListener('click', function(e) {
					const targetId = this.getAttribute('href');
					if (targetId === '#') return;
					
					const target = document.querySelector(targetId);
					if (target) {
						e.preventDefault();
						
						const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
						
						window.scrollTo({
							top: targetPosition,
							behavior: 'smooth'
						});
					}
				});
			});
		}
	}

	// ==========================================================================
	// Performance Optimizations
	// ==========================================================================
	
	/**
	 * Lazy load images with fade-in animation
	 */
	function initLazyImages() {
		if ('IntersectionObserver' in window) {
			const imageObserver = new IntersectionObserver(function(entries) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						const img = entry.target;
						if (img.dataset.src) {
							img.src = img.dataset.src;
							img.classList.add('revealed');
							imageObserver.unobserve(img);
						}
					}
				});
			});

			const lazyImages = document.querySelectorAll('img[data-src]');
			lazyImages.forEach(function(img) {
				imageObserver.observe(img);
			});
		}
	}

	// ==========================================================================
	// Parallax Scroll Effect (Premium)
	// ==========================================================================
	
	/**
	 * Initialize parallax scroll effect for elements with parallax classes
	 */
	function initParallaxEffect() {
		const parallaxElements = document.querySelectorAll('.parallax-slow, .parallax-medium, .parallax-fast');
		
		if (parallaxElements.length === 0) return;
		
		function updateParallax() {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			
			parallaxElements.forEach(function(element) {
				const rect = element.getBoundingClientRect();
				const speed = element.classList.contains('parallax-slow') ? 0.3 :
							  element.classList.contains('parallax-medium') ? 0.5 : 0.7;
				
				if (rect.top < window.innerHeight && rect.bottom > 0) {
					const yPos = -(scrollTop * speed);
					element.style.transform = 'translate3d(0, ' + yPos + 'px, 0)';
				}
			});
		}
		
		let ticking = false;
		window.addEventListener('scroll', function() {
			if (!ticking) {
				window.requestAnimationFrame(function() {
					updateParallax();
					ticking = false;
				});
				ticking = true;
			}
		}, { passive: true });
		
		updateParallax();
	}
	
	// ==========================================================================
	// Initialization
	// ==========================================================================
	
	/**
	 * Initialize all animation systems
	 */
	function init() {
		// Wait for DOM to be ready
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', initialize);
		} else {
			initialize();
		}
	}

	function initialize() {
		// Initialize all systems
		initScrollReveal();
		initPageLoadAnimations();
		initScrollProgress();
		initPageTransition();
		initStaggerText();
		initSmoothScroll();
		initLazyImages();
		
		// Trigger initial animations for elements already in viewport
		setTimeout(function() {
			const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .section');
			revealElements.forEach(function(element) {
				const rect = element.getBoundingClientRect();
				const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
				if (isInViewport) {
					element.classList.add('revealed');
				}
			});
		}, 100);
	}

	// Start initialization
	init();

	// ==========================================================================
	// Public API (Optional - for programmatic control)
	// ==========================================================================
	
	window.AnimationSystem = {
		// Manually trigger reveal on element
		reveal: function(selector) {
			const elements = document.querySelectorAll(selector);
			elements.forEach(function(element) {
				element.classList.add('revealed');
			});
		},
		
		// Reset element animation
		reset: function(selector) {
			const elements = document.querySelectorAll(selector);
			elements.forEach(function(element) {
				element.classList.remove('revealed');
				if (observer) {
					observer.observe(element);
				}
			});
		},
		
		// Reinitialize observers (useful for dynamically added content)
		refresh: function() {
			if (observer) {
				const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .section, .stagger');
				revealElements.forEach(function(element) {
					if (!element.classList.contains('revealed')) {
						observer.observe(element);
					}
				});
			}
		}
	};

})();

