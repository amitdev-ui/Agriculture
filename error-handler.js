/**
 * Error Handler - Suppresses non-critical console errors
 * Handles favicon and Google Maps API errors gracefully
 */

(function() {
	// Suppress favicon 404 errors
	var originalError = console.error;
	console.error = function() {
		var args = Array.prototype.slice.call(arguments);
		var message = args.join(' ');
		
		// Suppress favicon errors
		if (message.indexOf('favicon.ico') !== -1) {
			return;
		}
		
		// Suppress Google Maps API key warnings (but not actual errors)
		if (message.indexOf('NoApiKeys') !== -1 || 
			message.indexOf('ApiProjectMapError') !== -1 ||
			message.indexOf('google.maps.Marker is deprecated') !== -1) {
			// These are warnings, not critical errors
			return;
		}
		
		// Call original error for other errors
		originalError.apply(console, arguments);
	};
	
	// Suppress Google Maps loading warnings
	window.addEventListener('error', function(e) {
		if (e.message && (
			e.message.indexOf('favicon.ico') !== -1 ||
			e.message.indexOf('NoApiKeys') !== -1 ||
			e.message.indexOf('ApiProjectMapError') !== -1
		)) {
			e.preventDefault();
			return false;
		}
	}, true);
	
	// Handle Google Maps API errors gracefully
	if (typeof google !== 'undefined' && google.maps) {
		google.maps.event.addDomListener(window, 'error', function(e) {
			if (e.message && e.message.indexOf('ApiProjectMapError') !== -1) {
				console.log('Google Maps API: API key not configured. Map will not display.');
				return false;
			}
		});
	}
})();

