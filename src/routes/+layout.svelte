<script lang="ts">
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import "../app.css";

  const currentYear = new Date().getFullYear();

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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
          </svg>
          <span class="btn-text">Buy me a coffee</span>
        </button>

        {#if isDropdownOpen}
          <div class="bmac-dropdown" transition:fly={{ y: -10, duration: 250 }}>
            <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
              <span class="amount">$3</span> One Coffee
            </a>
            <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
              <span class="amount">$5</span> Two Coffees
            </a>
            <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown}>
              <span class="amount">$10</span> Three Coffees
            </a>

            <a href="https://buymeacoffee.com/axelbase" target="_blank" rel="noopener" on:click={closeDropdown} class="custom-amount">
              Custom Amount
            </a>

            <a
              href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
              on:click={closeDropdown}
              class="custom-amount"
            >
              Buy via Crypto (Bitcoin)
            </a>
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

  /* BMAC Button & Dropdown - Adapted from File 1 to fit File 2's overall aesthetic */
  .bmac-wrapper {
    position: relative;
  }

  .bmac-btn {
    background: var(--fern-green);
    color: white;
    border: 2px solid black;
    padding: 8px 16px;
    font-weight: bold;
    font-size: 0.95rem;
    border-radius: 999px; /* pill shape */
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    box-shadow: 3px 3px 0 black;
  }

  .bmac-btn:hover {
    background: var(--fern-light);
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0 black;
  }

  .btn-text {
    font-weight: 600;
  }

  .bmac-dropdown {
    position: absolute;
    top: 120%;
    left: 0;
    width: 240px;
    background: white;
    border: 2px solid black;
    border-radius: 16px;
    box-shadow: 4px 4px 0 black;
    overflow: hidden;
    z-index: 1000;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: #333;
    text-decoration: none;
    font-size: 0.98rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: var(--fern-green);
    color: white;
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 700;
    color: var(--fern-green);
    font-size: 1.1rem;
  }

  .bmac-dropdown a:hover .amount {
    color: white;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 600;
    color: var(--fern-green);
    border-top: 1px solid #eee;
    justify-content: center !important;
  }

  .bmac-dropdown .custom-amount:hover {
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
    .nav-links { display: none; }
    .nav-left { gap: 1rem; }
    .brand-text { font-size: 1.1rem; }
    .bmac-btn .btn-text { display: none; }
  }
</style>