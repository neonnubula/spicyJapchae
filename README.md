# FocusOne Landing Page

A beautiful, high-converting landing page for your goal-setting app with Apple-inspired design, smooth animations, and lifted card aesthetics.

## Features

- 🎨 **Apple-inspired Design** - Clean, modern aesthetics with beautiful gradients
- 📱 **Fully Responsive** - Perfect on all devices from mobile to desktop
- ✨ **Smooth Animations** - Scroll-triggered animations and micro-interactions
- 🚀 **Performance Optimized** - Fast loading with efficient code
- 💳 **Conversion Focused** - Strategic placement of CTAs and social proof
- ♿ **Accessible** - WCAG 2.1 AA compliant with reduced motion support

## File Structure

```
landing-page/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css            # Core styles and design system
│   ├── components.css      # Section-specific styles
│   └── animations.css      # Animation definitions
├── scripts/
│   ├── main.js            # Core functionality
│   └── animations.js      # Advanced animations
├── images/                # Your app screenshots and assets
└── README.md             # This file
```

## Quick Start

1. **Download the files** to your web server or local development environment

2. **Test locally** by opening `index.html` in your browser or running a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   npx live-server
   ```

3. **Customize the content** by editing `index.html`:
   - Replace "FocusOne" with your app name
   - Update the hero section copy
   - Add your app screenshots to the `/images` folder
   - Modify the testimonial with your real data

## Customization Guide

### 1. Branding & Colors

Edit the CSS custom properties in `styles/main.css`:

```css
:root {
    /* Change these gradients to match your brand */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-accent: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    
    /* Update text colors */
    --text-accent: #007aff;
}
```

### 2. Content Updates

**Hero Section:**
- Update the main headline and subheadline
- Replace the call-to-action button text
- Modify the social proof numbers

**App Name:**
- Find and replace "FocusOne" throughout the HTML
- Update the navigation logo
- Change the page title and meta descriptions

**Testimonial:**
- Update the founder testimonial with your real story
- Change the metrics (days, achievements)
- Add your photo to the author avatar

### 3. Adding Images

Create an `images/` folder and add:
- `hero-mockup.png` - App screenshot for hero section
- `app-screenshot-1.png`, `app-screenshot-2.png`, etc.
- `founder-photo.jpg` - Your photo for testimonial
- `og-image.jpg` - Social sharing image (1200x630px)

Update the HTML to reference these images:
```html
<!-- Replace the emoji in author avatar -->
<div class="author-avatar">
    <img src="images/founder-photo.jpg" alt="Founder">
</div>
```

### 4. App Store Links

When your app is ready, update the CTA buttons:
```html
<!-- iOS -->
<a href="https://apps.apple.com/app/your-app" class="btn-primary btn-large">
    Download for iPhone - $1
</a>

<!-- Android -->
<a href="https://play.google.com/store/apps/details?id=your.app" class="btn-primary btn-large">
    Get it on Google Play - $1
</a>
```

## Analytics Integration

### Google Analytics 4

Add to the `<head>` section of `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Update the `trackEvent` function in `scripts/main.js`:
```javascript
function trackEvent(eventName, properties = {}) {
    gtag('event', eventName, properties);
}
```

### Facebook Pixel

Add to `<head>`:
```html
<!-- Facebook Pixel Code -->
<script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
</script>
```

## SEO Optimization

### Meta Tags

Update in `<head>`:
```html
<title>Transform Your Life One Day at a Time | YourAppName</title>
<meta name="description" content="Focus on what truly matters. Achieve your most important daily goal and watch your dreams become reality.">

<!-- Open Graph -->
<meta property="og:title" content="Transform Your Life One Day at a Time">
<meta property="og:description" content="The #1 app for achieving your most important daily goals.">
<meta property="og:image" content="https://yoursite.com/images/og-image.jpg">
<meta property="og:url" content="https://yoursite.com">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Transform Your Life One Day at a Time">
<meta name="twitter:description" content="Focus on what truly matters. The #1 app for achieving your most important daily goals.">
<meta name="twitter:image" content="https://yoursite.com/images/og-image.jpg">
```

### Schema Markup

Add structured data for better search results:
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YourAppName",
    "description": "Goal-setting app that helps you focus on what matters most",
    "applicationCategory": "Productivity",
    "operatingSystem": "iOS, Android",
    "offers": {
        "@type": "Offer",
        "price": "1.00",
        "priceCurrency": "USD"
    }
}
</script>
```

## Deployment Options

### 1. Static Hosting (Recommended)
- **Netlify**: Drag and drop the folder to netlify.com
- **Vercel**: Connect your GitHub repo to vercel.com
- **GitHub Pages**: Upload to a GitHub repo and enable Pages
- **AWS S3**: Upload to an S3 bucket with static website hosting

### 2. Traditional Web Hosting
- Upload all files to your web server's public folder
- Ensure your server supports HTTPS
- Set up proper MIME types for CSS and JS files

### 3. CDN Configuration
For better performance, use a CDN like Cloudflare:
- Enable minification for CSS, JS, and HTML
- Set up caching rules
- Enable Brotli compression

## Performance Optimization

### 1. Image Optimization
- Use WebP format for better compression
- Implement responsive images with `srcset`
- Add lazy loading for images below the fold

### 2. Code Minification
Before deployment, minify your files:
```bash
# Using online tools or build tools
npx terser scripts/main.js -o scripts/main.min.js
npx csso styles/main.css -o styles/main.min.css
```

### 3. Preloading Critical Resources
Add to `<head>`:
```html
<link rel="preload" href="styles/main.css" as="style">
<link rel="preload" href="scripts/main.js" as="script">
<link rel="preconnect" href="https://fonts.googleapis.com">
```

## Testing Checklist

Before going live, test:

- [ ] **Mobile Responsiveness** - Test on various screen sizes
- [ ] **Page Speed** - Use Google PageSpeed Insights
- [ ] **Accessibility** - Test with screen readers
- [ ] **Cross-browser** - Chrome, Safari, Firefox, Edge
- [ ] **Analytics** - Verify tracking events work
- [ ] **Forms** - Test all interactive elements
- [ ] **SEO** - Check meta tags and structured data

## Browser Support

- Chrome 60+
- Safari 12+
- Firefox 60+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## License

This landing page template is provided as-is for your app marketing needs. Customize freely to match your brand and requirements.

## Support

For questions about customization or implementation, refer to the code comments or reach out for additional support.

---

**Ready to launch?** Remember to:
1. Update all placeholder content
2. Add your real app screenshots
3. Set up analytics tracking
4. Test thoroughly across devices
5. Deploy to your hosting platform

Good luck with your app launch! 🚀 