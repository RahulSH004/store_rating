# Store Rating Platform --- Complete UI/UX Prompt Pack

## Design Direction

This document contains the complete prompt pack for designing the
**Store Rating Platform**.

The application has three user experiences:

1.  Admin
2.  Normal User
3.  Store Owner

All screens should use one consistent design system. The application
should feel like a polished production SaaS product rather than a
generic dashboard template.

------------------------------------------------------------------------

# 1. Master UI/UX Design Prompt

Design a complete, cohesive modern SaaS web application called **Store
Rating Platform**.

The application has three user experiences:

1.  **Admin**
2.  **Normal User**
3.  **Store Owner**

Create all screens using one consistent design system. The interface
should feel like a polished production SaaS application rather than a
generic dashboard template.

## Visual Direction

Use a **warm beige + forest green** visual identity.

The overall aesthetic should feel:

-   Premium
-   Calm
-   Modern
-   Professional
-   Trustworthy
-   Minimal
-   Warm
-   Slightly organic

Avoid the typical blue/purple SaaS appearance.

## Primary Color Palette

  Purpose                Color
  ---------------------- -----------
  Main Background        `#F7F3E8`
  Card / Surface         `#FFFDF7`
  Primary Forest Green   `#315C43`
  Primary Hover          `#264B36`
  Secondary Sage Green   `#6F8F72`
  Light Sage Surface     `#E5EBDD`
  Main Text              `#243027`
  Muted Text             `#6F756D`
  Border                 `#DDD8C9`
  Rating / Star          `#C4933F`
  Success                `#477A58`
  Error                  `#B6534B`

### Color Usage Rules

Do not use green everywhere.

Follow approximately:

-   65--70% warm beige / ivory
-   20--25% neutral surfaces and typography
-   5--10% forest green accents

Green should communicate **action and importance**, not become the
entire background.

Use forest green primarily for:

-   Primary CTA buttons
-   Active navigation
-   Important links
-   Selected controls
-   Primary icons
-   Key statistics

Use light sage for subtle supporting surfaces.

Use muted gold specifically for ratings.

## Typography

Use a modern professional font such as:

-   Inter
-   Geist
-   Manrope

Typography hierarchy:

-   Page title: 28--32px, semibold
-   Section title: 18--20px, semibold
-   Body: 14--16px
-   Labels: 13--14px, medium
-   Metadata: 12--13px

Headings should use `#243027`.

## Design System

Define and consistently reuse:

-   Buttons
-   Inputs
-   Textareas
-   Select/dropdowns
-   Search fields
-   Cards
-   Tables
-   Modals
-   Badges
-   Star rating
-   Navigation sidebar
-   Top navigation
-   Pagination
-   Empty states
-   Loading states
-   Error states
-   Confirmation dialogs
-   Toast notifications

Use:

-   8px spacing system
-   10--14px border radius
-   Subtle borders
-   Minimal shadows
-   Generous whitespace
-   Clear visual hierarchy

## Surfaces

Cards should use:

-   Background: `#FFFDF7`
-   Border: `#DDD8C9`
-   Radius: 12--14px

Use extremely subtle shadows.

Avoid heavy shadows.

The beige background should remain visible around cards so the
application has depth without relying on strong shadows.

## Buttons

### Primary

-   Background: `#315C43`
-   Text: ivory
-   Hover: `#264B36`

### Secondary

-   Ivory/transparent background
-   Forest green text
-   Warm beige/green border

### Destructive

Use muted red `#B6534B`.

Avoid bright neon colors.

## Sidebar

Use an ivory or slightly warm surface.

Active navigation:

-   Light sage background `#E5EBDD`
-   Forest green icon and text

Inactive navigation:

-   Dark muted gray-green

The sidebar should feel integrated with the beige environment rather
than looking like a separate dark dashboard.

## Forms

Input:

-   Background: `#FFFDF7`
-   Border: `#DDD8C9`
-   Focus: forest green border with subtle green glow
-   Placeholder: `#8A8F86`

Inputs should have approximately 10--12px border radius.

Error:

-   `#B6534B`

## Rating System

Use muted gold `#C4933F` for stars.

Example:

**★★★★★ 4.3**

Do not use green stars because they would visually merge with the
primary UI color.

Interactive rating stars should support:

-   Empty
-   Hover
-   Selected
-   Focus
-   Disabled
-   Loading

## Navigation

Admin pages use a persistent left sidebar:

-   Dashboard
-   Users
-   Stores
-   Logout

Desktop:

-   Sidebar approximately 240--260px
-   Main content fills remaining viewport
-   Top header contains page context and user/logout controls

Mobile:

-   Sidebar becomes a drawer
-   Header contains a menu button

## UX Principles

Prioritize:

-   Clear information hierarchy
-   Obvious primary actions
-   Consistent navigation
-   Accessible form labels
-   Visible validation/error states
-   Helpful empty states
-   Clear hover/focus/active states
-   Keyboard-friendly interactions
-   Responsive layouts
-   Mobile-friendly behavior

Tables should become horizontally scrollable or transform appropriately
on smaller screens.

Modals should remain usable on mobile.

Never rely only on color to communicate state.

## Responsive Design

Design for:

-   Desktop: 1440px
-   Laptop: 1280px
-   Tablet: 768px
-   Mobile: 390px

Every page should have a deliberate responsive layout rather than simply
shrinking the desktop version.

## Overall UI Character

The product should visually resemble a combination of:

-   Premium SaaS
-   Modern productivity application
-   Boutique marketplace
-   Clean financial/productivity dashboard

Avoid:

-   Neon green
-   Bright lime
-   Strong gradients
-   Excessive glassmorphism
-   Dark-heavy dashboards
-   Excessive rounded pill components
-   Giant decorative illustrations
-   Excessive animations
-   Generic blue SaaS styling

The final interface should feel **warm, sophisticated, trustworthy, and
production-ready**.

Maintain this exact visual language across every screen.

------------------------------------------------------------------------

# 2. Login Page

Design the **Login page** for the Store Rating Platform using the
established beige and forest-green design system.

## Layout

Create a clean authentication layout with a centered login card.

Desktop:

-   Full viewport height
-   Very subtle warm beige background
-   Login card approximately 400--460px wide
-   Card centered both vertically and horizontally

Mobile:

-   Card becomes nearly full width
-   Maintain comfortable horizontal padding

## Card Structure

Top:

-   Small product logo/mark
-   Product name: **Store Rating Platform**
-   Heading: **Welcome back**
-   Supporting text: **Sign in to continue to your account**

Form:

1.  Email
2.  Password

Each input should have:

-   Visible label
-   Placeholder
-   Appropriate input icon only if it improves usability
-   Focus state
-   Error state

Password field:

-   Include show/hide password control

Primary CTA:

**Log In**

Below the button:

**Don't have an account? Sign up**

## UX States

Design:

-   Default
-   Input focus
-   Validation error
-   Incorrect credentials error
-   Loading/submitting state
-   Disabled button state

Display form errors close to the relevant field.

Do not overcrowd the page. The authentication experience should feel
calm, trustworthy, and extremely easy to understand.

------------------------------------------------------------------------

# 3. Signup Page

Design the **Signup page** using exactly the same authentication design
language as the Login page.

## Layout

Centered authentication card with a clean warm beige background.

Card width:

Approximately 440--480px on desktop.

## Header

-   Product logo/mark
-   Heading: **Create your account**
-   Supporting text: **Sign up to start using the Store Rating
    Platform**

## Form

Create a clearly structured form containing:

1.  Name
2.  Email
3.  Address
4.  Password
5.  Confirm Password

Address should use a textarea with appropriate height.

Password fields should include:

-   Show/hide control
-   Password requirement guidance
-   Validation feedback

## Primary Action

Large primary button:

**Sign Up**

## Secondary Navigation

Below the form:

**Already have an account? Log in**

## UX

Show:

-   Required field indicators
-   Inline validation
-   Password mismatch error
-   Invalid email state
-   Loading state
-   Disabled submit state
-   Successful submission feedback

Keep the form visually compact while maintaining sufficient spacing
between fields.

------------------------------------------------------------------------

# 4. Admin Dashboard

Design a professional **Admin Dashboard** for the Store Rating Platform.

Use the established design system and persistent admin navigation.

## Layout

Desktop:

-   240--260px left sidebar
-   Top header
-   Main dashboard content

Sidebar:

-   Product logo
-   Dashboard
-   Users
-   Stores
-   Logout at the bottom

Highlight **Dashboard** as the active navigation item.

## Header

Show:

-   Page title: **Dashboard**
-   Supporting text: **Overview of your platform**
-   Admin profile/avatar
-   Logout action

## Main Content

Start with three prominent statistic cards arranged horizontally.

### Total Users

-   Large number
-   User icon
-   Small descriptive label

### Total Stores

-   Large number
-   Store/building icon
-   Small descriptive label

### Total Ratings

-   Large number
-   Star/rating icon
-   Small descriptive label

Each card should:

-   Have consistent dimensions
-   Use subtle borders
-   Have a clear icon area
-   Emphasize the numerical value
-   Maintain strong visual hierarchy

Use dark green-black typography for numbers and forest green icons
inside light sage circles.

## Additional UX

Include:

-   Loading skeleton state for statistics
-   Empty/error state if statistics cannot be loaded

Do not add unnecessary charts or fake analytics data.

The dashboard should communicate the state of the platform within a few
seconds of opening it.

------------------------------------------------------------------------

# 5. Admin Users List

Design the **Admin Users management page**.

## Layout

Persistent admin sidebar on the left.

Main content header:

-   Title: **Users**
-   Supporting text: **Manage platform users**
-   Primary button: **+ Add User**

## Filter Area

Create a clean filter/search toolbar above the table.

Fields:

-   Search by Name
-   Search by Email
-   Search by Address
-   Role dropdown

Include:

-   Search icon
-   Clear filters action when filters are active

Desktop:

Arrange filters horizontally.

Mobile:

Stack filters vertically.

## Users Table

Columns:

**Name \| Email \| Address \| Role \| Actions**

Column headers should support sorting where applicable.

Use subtle sort indicators:

-   Neutral
-   Ascending
-   Descending

Role should appear as a compact badge.

Actions should use a clear action menu rather than cluttering the row.

## Table UX

Include:

-   Hover row state
-   Loading skeleton
-   Empty state
-   Error state
-   Pagination
-   Responsive horizontal scrolling on smaller screens

Empty state:

**No users found**

Supporting text explaining that the current filters returned no results.

## Add User

The **+ Add User** button opens the shared Add User modal.

Maintain strong visual hierarchy and avoid overly dense table styling.

------------------------------------------------------------------------

# 6. Admin Stores List

Design the **Admin Stores management page** using the same navigation,
spacing, typography, table patterns, and interaction states as the Users
page.

## Header

Title:

**Stores**

Supporting text:

**Manage registered stores and their ratings**

Primary CTA:

**+ Add Store**

## Filter Toolbar

Include:

-   Search by Store Name
-   Search by Address

Provide:

-   Search icons
-   Clear filters action

## Stores Table

Columns:

**Name \| Email \| Address \| Rating \| Actions**

Rating should use a compact 5-star visual with the numerical average
displayed beside it.

Example:

**★★★★★ 4.2**

Stars should remain visually secondary to the actual rating value.

## Table UX

Support:

-   Sortable columns
-   Hover states
-   Loading skeleton
-   Empty state
-   Error state
-   Pagination
-   Responsive horizontal scrolling

## Interaction

Clicking a store should allow the admin to access the store's relevant
details.

The Add Store CTA should open the shared Add Store modal.

Keep this page visually consistent with the Users management page.

------------------------------------------------------------------------

# 7. Add User / Add Store Modal

Design reusable modal components for **Add User** and **Add Store**.

## Modal Behavior

When opened:

-   Background content becomes dimmed
-   Modal appears centered
-   Background remains visible enough to preserve context
-   Prevent interaction with background content

Desktop:

-   Width approximately 500--600px

Mobile:

-   Nearly full width with comfortable margins
-   Content should scroll if necessary

## Modal Header

Show:

-   Clear title
-   Short supporting description
-   Close button

Example:

**Add User**

Create a new user account.

## Add User Form

Fields:

-   Name
-   Email
-   Address
-   Password
-   Role

## Add Store Form

Fields:

-   Store Name
-   Store Email
-   Store Address
-   Owner information, if required by the application's data model

## Footer

Left:

**Cancel**

Right:

**Submit / Create User / Create Store**

Primary action should be visually dominant.

## UX States

Design:

-   Default
-   Validation errors
-   Loading/submitting
-   Disabled submit
-   Server error
-   Successful submission

Do not close the modal automatically before the operation completes.

After successful creation, show a success notification and return the
user to the relevant list.

Use consistent modal behavior throughout the application.

------------------------------------------------------------------------

# 8. Admin User Detail Page

Design an **Admin User Detail page**.

## Header

Top-left:

**← Back to Users**

Page title:

**User Details**

## Profile Card

Create a clean profile information card containing:

-   Name
-   Email
-   Address
-   Role

Use a two-column layout on desktop and single-column layout on mobile.

Role should be represented with a badge.

## Rating Section

Only display the **Average Rating** section when the user's role is
**Store Owner**.

Create a visually distinct rating card:

**Average Rating**

Large numerical rating

**★★★★★**

Supporting text:

**Based on X ratings**

Keep this section visually prominent but not dominant over the user's
core profile information.

## UX

Include:

-   Back navigation
-   Loading skeleton
-   Not-found state
-   Error state
-   Responsive layout

Avoid unnecessary profile decoration. This is an administrative
information page, not a social profile.

------------------------------------------------------------------------

# 9. Normal User --- Store Browsing Page

Design the primary **Store Discovery and Rating page** for normal users.

The experience should feel like a modern SaaS marketplace/directory
rather than an admin dashboard.

## Header

Use a simpler user-facing navigation.

Show:

-   Product logo/name
-   Store browsing navigation
-   User profile/menu
-   Logout

## Page Header

Title:

**Discover Stores**

Supporting text:

**Find stores and share your experience.**

## Search and Filters

Create a prominent search/filter section.

Fields:

-   Search by Store Name
-   Search by Address

Use a clean search bar design with clear icons.

## Store Grid

Display stores as responsive cards.

Desktop:

3 cards per row

Tablet:

2 cards per row

Mobile:

1 card per row

## Store Card

Each card should contain:

**Store Name**

Muted address

Overall rating:

**★★★★★ 4.3**

Divider

**Your Rating**

If the user has not rated:

**Rate this store**

Interactive 5-star selector.

If the user already rated:

**Your rating**

**★★★★★**

Allow the user to change/update their rating.

## Rating Interaction

Stars should have:

-   Empty state
-   Hover state
-   Selected state
-   Keyboard focus state
-   Disabled/submitting state

After submitting:

-   Show immediate visual feedback
-   Update the displayed user rating
-   Show a subtle success notification

## Empty State

If no stores match the filters:

**No stores found**

Supporting text:

**Try changing your search or clearing your filters.**

## Overall UX

Cards should feel interactive but not overly animated.

Use subtle hover elevation/border changes.

The store name and rating should have the strongest visual hierarchy.

Do not overload cards with unnecessary information.

### Recommended Store Card Hierarchy

**Store Name**

Muted address

**★★★★★ 4.3**

------------------------------------------------------------------------

**Your Rating**

**☆ ☆ ☆ ☆ ☆** interactive gold stars

**Rate Store**

Use forest green for the primary action and muted gold for rating stars.

------------------------------------------------------------------------

# 10. Store Owner Dashboard

Design the **Store Owner Dashboard**.

The dashboard should focus on one primary question:

**How is my store being rated?**

## Header

Title:

**Store Dashboard**

Supporting text:

**Monitor your store's customer ratings.**

## Primary Rating Card

Create a large prominent card at the top.

Display:

**Average Rating**

Large:

**4.3**

Below:

**★★★★★**

Supporting text:

**Based on 128 ratings**

The rating should be the strongest visual element on the page.

Use muted gold stars and dark green-black typography.

## Ratings Table

Below the rating card:

Heading:

**Recent Ratings**

Table columns:

**Name \| Email \| Rating**

Rating should display:

**★★★★★ 5**

Use compact star visuals.

## Table UX

Include:

-   Loading state
-   Empty state
-   Error state
-   Pagination if the dataset is large
-   Responsive behavior

Empty state:

**No ratings yet**

Supporting text:

**Customer ratings will appear here once users rate your store.**

## Design Direction

This should feel simpler than the Admin Dashboard.

Avoid unnecessary analytics charts.

The store owner's primary information should be immediately visible
without scrolling.

------------------------------------------------------------------------

# 11. Update Password

Design a secure and simple **Update Password** settings page shared
across authenticated users.

## Layout

Use the application's standard navigation.

Place a centered settings card in the main content area.

Card width:

Approximately 500px.

## Header

Title:

**Update Password**

Supporting text:

**Choose a strong password to keep your account secure.**

## Form

Fields:

-   Current Password
-   New Password
-   Confirm New Password

Each password field should include:

-   Show/hide password control
-   Label
-   Focus state
-   Validation state

## Password Requirements

Show a compact password requirement section below the new password
field.

Requirements should visually transition between:

-   Not satisfied
-   Satisfied

## CTA

Primary button:

**Update Password**

## UX States

Design:

-   Default
-   Invalid current password
-   Password requirement failure
-   Password mismatch
-   Loading
-   Success
-   Server error

On success, display a clear confirmation message.

Do not unnecessarily expose password information or use overly
decorative security graphics.

------------------------------------------------------------------------

# 12. Final UI Consistency Review

Review the entire Store Rating Platform design as a senior product
designer.

Do not redesign the product unnecessarily. Instead, identify and fix
inconsistencies across all screens.

## 1. Design System

Review:

-   Typography
-   Font weights
-   Font sizes
-   Colors
-   Border colors
-   Border radius
-   Shadows
-   Icon style
-   Spacing
-   Button heights

Ensure the beige and green palette remains consistent.

## 2. Navigation

Ensure Admin pages share identical:

-   Sidebar width
-   Navigation structure
-   Active states
-   Header behavior

Ensure normal-user and store-owner navigation are intentionally simpler
but still belong to the same product.

## 3. Components

Ensure the same components behave consistently:

-   Buttons
-   Inputs
-   Selects
-   Tables
-   Modals
-   Cards
-   Badges
-   Star ratings
-   Pagination
-   Toasts

## 4. UX States

Verify every interactive component has:

-   Default
-   Hover
-   Focus
-   Active
-   Disabled
-   Loading
-   Error
-   Empty

states where appropriate.

## 5. Responsive Design

Review every screen at:

-   1440px
-   1280px
-   768px
-   390px

Fix:

-   Overflow
-   Broken tables
-   Excessive whitespace
-   Small touch targets
-   Navigation problems
-   Modal sizing
-   Form usability

## 6. Accessibility

Check:

-   Color contrast
-   Form labels
-   Keyboard navigation
-   Focus indicators
-   Button clarity
-   Error messaging
-   Touch target sizes

Do not rely on color alone to communicate status.

## 7. Information Hierarchy

For every page, ask:

> What is the most important thing the user needs to understand or
> accomplish here?

Make that element visually dominant.

## 8. Final Visual Character

The final result should feel like one deliberately designed SaaS
product, not a collection of individually generated screens.

The visual identity should consistently communicate:

**Warm beige + forest green + ivory surfaces + muted gold ratings +
clean typography + subtle borders + generous whitespace.**

Avoid:

-   Neon green
-   Bright lime
-   Strong gradients
-   Excessive glassmorphism
-   Dark-heavy dashboards
-   Excessive pill components
-   Generic blue/purple SaaS styling
-   Excessive animations
-   Decorative elements without a UX purpose
