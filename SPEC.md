# CarbonWise - Carbon Footprint Awareness Platform

## Concept & Vision
CarbonWise is an engaging, educational platform that empowers users to understand and reduce their carbon footprint through interactive calculations, visual insights, and actionable pledges. The experience feels like a trusted environmental companion—hopeful, empowering, and backed by real science. The design evokes nature through organic shapes, lush greens, and gentle animations that mirror the fluidity of natural systems.

## Design Language

### Aesthetic Direction
Organic modernism meets environmental activism. Think: a blend of Bloomberg's data visualization sophistication with the warmth of a sustainability-focused startup. Clean lines, generous whitespace, but with subtle leaf motifs and gradient transitions that feel alive.

### Color Palette
- **Primary Green**: #10B981 (emerald-500)
- **Dark Green**: #059669 (emerald-600)
- **Darker Accent**: #047857 (emerald-700)
- **Light Green**: #D1FAE5 (emerald-100)
- **Pale Green**: #ECFDF5 (emerald-50)
- **Background**: #F9FAFB (gray-50)
- **Text Primary**: #111827 (gray-900)
- **Text Secondary**: #6B7280 (gray-500)
- **Warning**: #F59E0B (amber-500)
- **Critical**: #EF4444 (red-500)
- **White**: #FFFFFF

### Typography
- **Headings**: Inter (Google Font) - Bold/Semibold
- **Body**: Inter - Regular/Medium
- **Fallback**: system-ui, -apple-system, sans-serif

### Spatial System
- Base unit: 4px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Card padding: 24px
- Component gaps: 16px-32px
- Border radius: 12px (cards), 8px (buttons), 9999px (pills)

### Motion Philosophy
- Micro-interactions: 150-200ms ease-out for hovers
- Section reveals: 400ms ease-out with subtle upward translation
- Counter animations: 2s duration with easing for impact
- Chart animations: 800ms with Chart.js defaults
- Transitions feel organic, like leaves settling

### Visual Assets
- Icons: Heroicons (outline style)
- Charts: Chart.js with custom green theme
- Decorative: CSS gradients, subtle leaf patterns, animated floating elements

## Layout & Structure

### Page Structure
1. **Sticky Navigation** - Logo, nav links, CTA button
2. **Hero Section** - Animated headline, floating stats, scroll indicator
3. **Calculator Section** - Tabbed interface with 4 categories
4. **Dashboard Section** - Visual charts and progress indicators
5. **Awareness Section** - Tips carousel, facts cards, statistics
6. **Pledge Section** - Interactive pledge with counter and certificate
7. **Offset Section** - Tree calculator and program links
8. **Footer** - Links, social icons, newsletter

### Responsive Strategy
- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Stack cards vertically on mobile
- Collapsible navigation on mobile
- Touch-friendly inputs and buttons (min 44px tap targets)

## Features & Interactions

### Carbon Calculator
**Transport Tab:**
- Car: distance (km/week), fuel type (petrol/diesel/electric), fuel efficiency
- Bike: distance (km/week)
- Public Transport: distance (km/week)
- Flights: short-haul (<3h), medium (3-6h), long-haul (>6h) flights/year
- Real-time emission calculation as user types

**Home Energy Tab:**
- Electricity: monthly usage (kWh), renewable percentage
- Gas: monthly usage (m³)
- LPG: monthly usage (kg)
- Household size slider (1-8 people)

**Food Habits Tab:**
- Diet type: Vegan, Vegetarian, Pescatarian, Omnivore
- Food waste: Low/Medium/High
- Local food percentage slider

**Shopping Tab:**
- Clothing purchases: items/month
- Electronics: items/year
- Furniture: items/year
- Packaging preference: minimal/moderate/excessive

**Calculation Logic:**
- Uses scientifically accurate emission factors
- Results displayed in kg CO2/year
- Comparison to global average (4.8 tonnes)

### Interactive Dashboard
- **Pie Chart**: Category breakdown with legend
- **Bar Chart**: User vs national average comparison
- **Progress Meter**: 0-20 tonnes scale with color zones
- **Animated Counters**: Number animation on value changes
- **Export Results**: Copy/share functionality

### Awareness Section
- Expandable tip cards with icons
- Random "Did You Know" rotating fact
- Global statistics with source citations
- Interactive timeline of climate milestones

### Pledge System
- Grid of pledge options (icons + descriptions)
- Select up to 5 pledges
- Animated counter showing total pledges taken
- Generate downloadable certificate (canvas-based)
- Share to social media buttons

### Offset Calculator
- Trees needed to offset annual footprint
- Cost estimate for offset programs
- List of verified programs with links

## Component Inventory

### Navigation
- States: default, scrolled (shadow + smaller), mobile-open
- Logo with hover animation
- Links with underline animation on hover
- CTA button with gradient background

### Calculator Input Card
- Label, input field, unit indicator
- States: default, focused (green border), filled, error
- Slider variant for percentage inputs

### Category Tab
- Icon + label
- States: inactive (gray), active (green with indicator), hover

### Result Card
- Large number display with unit
- Comparison badge (above/below average)
- Subtle background gradient

### Chart Container
- Title, chart area, legend below
- Loading skeleton state
- Empty state with icon

### Pledge Card
- Icon, title, description
- States: default, selected (green border + checkmark), hover

### Certificate
- Elegant border design
- Dynamic name and pledges
- Carbon footprint summary
- Download button

## Technical Approach

### Stack
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Chart.js for visualizations
- Canvas API for certificate generation

### State Management
- React useState for form data and results
- useReducer for complex calculator state
- localStorage for persisting user data

### Key Implementation Details
- Debounced calculation updates (300ms)
- Form validation with helpful error messages
- Responsive chart sizing with ResizeObserver
- Print-optimized certificate styles