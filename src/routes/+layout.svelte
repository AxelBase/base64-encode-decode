<script lang="ts">
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import "../app.css";

  const paypalUsername = 'AxelLab427'; // Replace with your actual username
  const donationAmounts = [1, 3, 5, 10];
  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function closeDropdown() {
    isDropdownOpen = false;
  }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  const currentYear = new Date().getFullYear();
</script>

<header class="fixed-nav">
  <div class="container nav-container">
    <div class="nav-left">
      <a href="{base}/" aria-label="Home" class="brand-link">
        <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-logo" />
        <span class="brand-text">AxelBase</span>
      </a>

      <div class="bmac-wrapper" use:clickOutside on:click_outside={closeDropdown}>
        <button class="bmac-btn" on:click={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="me-2">
            <path d="M2,21H20V19H2M20,8H18V5H20M20,3H4V13A4,4 0 0,0 8,17H14A4,4 0 0,0 18,13V10H20A2,2 0 0,0 22,8V5C22,3.89 21.1,3 20,3Z" />
          </svg>
          Buy me a coffee
        </button>

        {#if isDropdownOpen}
          <div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
            {#each donationAmounts as amount}
              <a
                href="https://paypal.me/{paypalUsername}/{amount}"
                target="_blank"
                rel="noopener noreferrer"
                on:click={closeDropdown}
                class="bmac-item"
              >
                ${amount}
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <nav class="nav-links">
      <a class="nav-item" href="{base}/">Home</a>
      <a class="nav-item" href="{base}/#about">About</a>
      <a class="nav-item" href="{base}/#how-to">How to use</a>
      <a class="nav-item" href="{base}/#faq">FAQ</a>
      <a class="nav-item" href="{base}/blog">Blog</a>
    </nav>
  </div>
</header>

<slot />

<footer class="fixed-footer">
  <div class="container footer-content">
    <span>&copy; AxelBase Base64 Encoder – Decoder – {currentYear}</span>
    <div class="footer-links">
      <a href="{base}/privacy">Privacy</a>
      <span class="separator">•</span>
      <a href="{base}/terms">Terms</a>
    </div>
  </div>
</footer>

<style>
  /* Navbar Styles */
  .fixed-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: white;
    border-bottom: 2px solid black;
    z-index: 1000;
    box-shadow: 0 4px 0 rgba(0,0,0,0.1);
  }

  .nav-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .brand-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
  }

  .navbar-logo {
    width: 32px;
    height: 32px;
  }

  .brand-text {
    font-weight: 800;
    font-size: 1.25rem;
    color: var(--fern-green);
    letter-spacing: -0.5px;
  }

  /* Navigation Links */
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  .nav-item {
    font-weight: 600;
    color: black;
    text-decoration: none;
    position: relative;
    padding: 5px 0;
  }

  .nav-item:hover {
    color: var(--fern-green);
  }

  .nav-item::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--fern-green);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .nav-item:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  /* BMAC Button & Dropdown */
  .bmac-wrapper {
    position: relative;
  }

  .bmac-btn {
    background: #FFDD00; /* Classic Coffee yellow/orange or match theme */
    color: black;
    border: 2px solid black;
    padding: 6px 12px;
    font-weight: bold;
    font-size: 0.9rem;
    border-radius: 20px; /* Pill shape */
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: all 0.2s;
    box-shadow: 2px 2px 0 black;
  }

  .bmac-btn:hover {
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0 black;
  }

  .bmac-dropdown {
    position: absolute;
    top: 120%;
    left: 0;
    background: white;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 4px 4px 0 black;
    display: flex;
    flex-direction: column;
    min-width: 100px;
    overflow: hidden;
  }

  .bmac-item {
    padding: 8px 16px;
    text-decoration: none;
    color: black;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    transition: background 0.2s;
  }

  .bmac-item:last-child {
    border-bottom: none;
  }

  .bmac-item:hover {
    background: var(--fern-green);
    color: white;
  }

  /* Footer Styles */
  .fixed-footer {
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    background: black;
    color: white;
    padding: 10px 0;
    font-size: 0.85rem;
    z-index: 1000;
    border-top: 4px solid var(--fern-green);
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-links a {
    color: white;
    text-decoration: underline;
  }

  .footer-links a:hover {
    color: #FFDD00;
  }

  .separator {
    margin: 0 8px;
  }

  /* Mobile Responsive Tweaks */
  @media (max-width: 768px) {
    .nav-links { display: none; } /* Simplified for mobile logic not requested but good practice */
    .nav-left { gap: 1rem; }
    .brand-text { display: none; } /* Hide text on very small screens if needed */
  }
</style>