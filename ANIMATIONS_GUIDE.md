# Professional Animation System - Usage Guide

This guide explains how to use the premium animation system across your website.

## Files Included

- **animations.css** - All animation styles and keyframes
- **animations.js** - IntersectionObserver logic and initialization
- Both files are already included in all HTML pages

## Quick Start

The animation system is **already active** on all pages. Just add the appropriate classes to your HTML elements.

## Available Animation Classes

### 1. Scroll Reveal Animations

#### Basic Reveal (fade + translate up)
```html
<div class="reveal">
  Content that animates when scrolled into view
</div>
```

#### Reveal from Left
```html
<div class="reveal-left">
  Slides in from left when scrolled into view
</div>
```

#### Reveal from Right
```html
<div class="reveal-right">
  Slides in from right when scrolled into view
</div>
```

#### Reveal with Scale
```html
<div class="reveal-scale">
  Scales up while fading in
</div>
```

#### Fade Only (subtle)
```html
<div class="reveal-fade">
  Simple fade in effect
</div>
```

### 2. Section Animations

Sections with the `.section` class automatically animate when scrolled into view:

```html
<section class="section">
  <!-- This section will automatically animate -->
</section>
```

### 3. Staggered Animations

Perfect for lists, feature items, or multiple items that should animate one after another:

```html
<div class="stagger">
  <div class="stagger-item">First item</div>
  <div class="stagger-item">Second item</div>
  <div class="stagger-item">Third item</div>
</div>
```

With custom delays:
```html
<div class="stagger">
  <div class="stagger-item stagger-delay-1">Item 1</div>
  <div class="stagger-item stagger-delay-2">Item 2</div>
  <div class="stagger-item stagger-delay-3">Item 3</div>
</div>
```

### 4. Page Load Animations

For elements that should animate immediately on page load:

```html
<div class="animate-on-load">
  Animates when page loads
</div>
```

### 5. Staggered Text (Advanced)

For word-by-word text animations:

```html
<h1 class="stagger-text">Your Heading Text Here</h1>
```

Words will animate in one by one when scrolled into view.

## Automatic Features

### ✅ Hover Micro-interactions
The following elements automatically have smooth hover effects:
- **Buttons** (`.custom-btn`, `button`, `.btn`) - Lift on hover
- **Cards** (`.gallery__item`, `.feature__item`, `.timeline__item`) - Lift and shadow
- **Links** - Smooth color transitions
- **Images** - Scale on hover (when inside gallery/feature items)
- **Input fields** - Lift on focus

### ✅ Scroll Progress Indicator
A progress bar automatically appears at the top of the page showing scroll progress.

### ✅ Page Transitions (Optional)
Smooth page-to-page transitions are enabled by default for internal links.

### ✅ Smooth Scrolling
All anchor links (#links) have smooth scrolling enabled.

## Examples for Your Website

### Example 1: Hero Section
```html
<section class="section">
  <div class="container">
    <h1 class="reveal">Welcome to Agricom</h1>
    <p class="reveal delay-200">Premium agricultural products</p>
    <a href="#" class="custom-btn primary reveal delay-300">Get Started</a>
  </div>
</section>
```

### Example 2: Feature Grid
```html
<div class="stagger">
  <div class="feature__item stagger-item">
    <h3>Feature 1</h3>
  </div>
  <div class="feature__item stagger-item">
    <h3>Feature 2</h3>
  </div>
  <div class="feature__item stagger-item">
    <h3>Feature 3</h3>
  </div>
</div>
```

### Example 3: Gallery Items
```html
<div class="gallery">
  <div class="gallery__item reveal-scale">
    <img src="image1.jpg" alt="">
  </div>
  <div class="gallery__item reveal-scale">
    <img src="image2.jpg" alt="">
  </div>
</div>
```

### Example 4: Timeline
```html
<div class="timeline">
  <div class="timeline__item reveal-left">Event 1</div>
  <div class="timeline__item reveal-right">Event 2</div>
  <div class="timeline__item reveal-left">Event 3</div>
</div>
```

## Utility Classes

### Delay Classes
Add delays to animations:
```html
<div class="reveal delay-100">0.1s delay</div>
<div class="reveal delay-200">0.2s delay</div>
<div class="reveal delay-300">0.3s delay</div>
<div class="reveal delay-400">0.4s delay</div>
<div class="reveal delay-500">0.5s delay</div>
```

### Duration Classes
Override animation duration:
```html
<div class="reveal duration-fast">Fast (0.4s)</div>
<div class="reveal duration-normal">Normal (0.6s)</div>
<div class="reveal duration-slow">Slow (0.8s)</div>
```

## Configuration

To customize the animation system, edit `animations.js`:

```javascript
const config = {
  observerOptions: {
    rootMargin: '0px 0px -10% 0px', // Trigger 10% before viewport
    threshold: 0.1
  },
  staggerDelay: 100, // Delay between stagger items (ms)
  enableScrollProgress: true, // Show scroll progress bar
  enablePageTransition: true  // Enable page transitions
};
```

## Performance

- All animations use GPU-accelerated properties (transform, opacity)
- IntersectionObserver for efficient scroll detection
- Automatic cleanup after animations complete
- Respects `prefers-reduced-motion` for accessibility

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IntersectionObserver polyfill recommended for IE11 (if needed)
- Gracefully degrades in older browsers

## Tips

1. **Don't overuse** - Use animations sparingly for maximum impact
2. **Consistency** - Use the same animation type for similar elements
3. **Performance** - Avoid animating too many elements at once
4. **Accessibility** - System respects `prefers-reduced-motion` automatically

## Need Help?

The animation system is designed to work out of the box. Just add classes to your HTML elements and the animations will trigger automatically when elements scroll into view.

For programmatic control, use the global `AnimationSystem` object:

```javascript
// Manually reveal elements
AnimationSystem.reveal('.my-element');

// Reset and re-animate
AnimationSystem.reset('.my-element');

// Refresh observers (for dynamically added content)
AnimationSystem.refresh();
```

